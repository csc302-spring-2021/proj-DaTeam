/**
 * Contains SDC object parsers
 */


import { classMeta } from "./ClassMeta"
import * as Model from "./ClassDef";
import { StackUtil } from "./Utils"

class ParsingError extends Error {}

abstract class JsonSerializer {

     /* childClassFinder: provide the class of a child given current class name and child object */
     protected childClassFinder: (className: string, fieldName: string, child: any) => string

     protected stackUtil: StackUtil = new StackUtil("Root", ParsingError)

     protected constructor(){}

     /** 
      * Generic parse for any class in classMeta
      * 
      * should gurantee the return object is valid
      * 
      * @param template an empty base object to populate, can be null
      * @param obj source json
      * @param targetClassName name of the class to build
     */
     protected templateBuilder(template: any, obj: any, targetClassName: string): any {
          
          const targetClass = classMeta[targetClassName]

          if (targetClass == null) {
               throw this.stackUtil.genError("Class not found in meta: " + targetClassName)
          }
          if (template == null){
               if (targetClass.construct == null) {
                    throw this.stackUtil.genError("No constructor for class: " + targetClassName)
               }
               template = new targetClass.construct()
          }

          if (targetClass.super) this.templateBuilder(template, obj, targetClass.super)

          for (let [id, targetField] of Object.entries(targetClass.fields)){
               const field = obj[id]
               if (field == null){
                    if (targetField.nullable) {
                         continue
                    } else {
                         throw this.stackUtil.genError("Missing attribute: " + id)
                    }
               }
               if (targetField.type !== field.constructor.name) {
                    throw this.stackUtil.genError("Attribute type error: " + id)
               }
               if (targetField.validator && !targetField.validator(obj)) {
                    throw this.stackUtil.genError("Attribute invalid: " + id)
               }
               if (targetField.generic) {
                    this.stackUtil.enter(id)
                    if (targetField.type === "Array") {
                         template[id] = (field as Array<any>).map(
                              o => this.templateBuilder(null, o, this.childClassFinder(targetClassName, id, o))
                              )
                    } else {
                         template[id] = this.templateBuilder(null, field, this.childClassFinder(targetClassName, id, field))
                    }
                    this.stackUtil.leave(id)
               } else {
                    template[id] = obj[id]
               }
          }

          return template
     }

}

export class SDCFormJsonSerializer extends JsonSerializer {

     protected childClassFinder: (className: string, fieldName: string, child: any) => string
          = (_, __, child) => {
               if (child.class == null) throw this.stackUtil.genError("Missing attribute: class")
               return child.class
          }

     private flatMap: {[uid: string]: Model.SDCQuestion} = {}

     protected constructor(){ super() }

     static encode(form: Model.SDCForm): string{
          return new this()._encode(form)
     }

     _encode(form: Model.SDCForm): string {
          return JSON.stringify(form)
     }

     static decode(json: string): { model: Model.SDCForm, flatMap: {[uid: string]: Model.SDCQuestion} }{
          return new this()._decode(json)
     }

     /**
      * Decode the json as SDCForm
      * Return the decoded form and a flat map of all the questions
      */
     _decode(json: string): { model: Model.SDCForm, flatMap: {[uid: string]: Model.SDCQuestion} } {
          let obj: any = JSON.parse(json)
          if (this.childClassFinder("", "", obj) !== "SDCForm") {
               throw this.stackUtil.genError("Root object is not SDCForm")
          }
          return { model: this.templateBuilder(null, obj, "SDCForm"), flatMap: this.flatMap }
     }

     /**
      * Overrides the super class one to build flatMap
      */
     protected templateBuilder(template: any, obj: any, targetClassName: string): any {
          const result = super.templateBuilder(template, obj, targetClassName)
          if (result.uid) this.flatMap[result.uid] = result
          return result
     }
}

export class SDCFormResponseJsonSerializer extends JsonSerializer {

     protected childClassFinder: (className: string, fieldName: string, child: any) => string
          = () => { return "SDCAnswer" }

     protected constructor(){ super() }

     static encode(response: Model.SDCFormResponse): string{
          return new this()._encode(response)
     }

     static decode(json: string): Model.SDCFormResponse{
          return new this()._decode(json)
     }

     protected _encode(response: Model.SDCFormResponse): string {
          return JSON.stringify(response)
     }

     protected _decode(json: string): Model.SDCFormResponse {
          return this.templateBuilder(null, JSON.parse(json), "SDCFormResponse")
     }
}