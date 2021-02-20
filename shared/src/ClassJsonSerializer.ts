/**
 * Contains SDC object parsers
 */

import { classMeta } from "./ClassMeta"
import { GenericClassValidator } from "./ClassValidator"
import { ParsingError, ValidationError } from "./Utils"

export class GenericJsonSerializer {

     protected static readonly classKey = "__class"

     /**
      * Encode a domain object to pure json with class info
      * Throw ParsingError if the input object is invalid
      * @param obj input object
      * @param fromClass the class of the input object for runtime validation
      */
     static encode(obj: any, fromClass: Function): any{
          this.validate(obj, fromClass)
          return this.deepCopy( 
               o => o.constructor.name, 
               name => {
                    const template: any = {}
                    template[this.classKey] = name
                    return template
               }, null, obj
          )
     }

     /**
      * Decode a json object with class info to domain object
      * Throw ParsingError if the output object is invalid
      * @param obj input object
      * @param toClass the class of the output object for runtime validation
      */
     static decode(obj: any, toClass: Function): any{
          const result = this.deepCopy(
               o => o[this.classKey],
               name => {
                    const targetClass = classMeta[name]
                    if (targetClass && targetClass.construct) return new targetClass.construct()
                    return {}
               }, null, obj
          )
          this.validate(result, toClass)
          return result
     }

     /**
      * Validate an object and check its class
      * @param obj 
      * @param asClass 
      */
     protected static validate(obj: any, asClass: Function){
          try{
               if (!(obj instanceof asClass)) throw new ParsingError(
                    `Expecting serialized objectto be ${asClass.name} but got ${obj.constructor.name}`
               )
               GenericClassValidator.validate(obj)
          } catch(e){
               if (e instanceof ValidationError){
                    throw new ParsingError(e.message)
               } else {
                    throw e
               }
          }
     }

     /**
      * Recursively and selectively copy an object based on classMeta
      * @param classFinder Returns the class name given an object
      * @param construct Creates a new object given the class name
      * @param template A template to copy to, can be null
      * @param obj Object to copy from
      * @param targetClassName Copy attributes based on this class
      */
     protected static deepCopy(classFinder: (obj: any) => string, 
               construct: (name: string) => any,
               template: any, obj: any, targetClassName?: string): any{

          if (targetClassName == null) targetClassName = classFinder(obj)
          if (targetClassName == null || classMeta[targetClassName] == null){
               return JSON.parse(JSON.stringify(obj)) // deep copy
          }
          const targetClass = classMeta[targetClassName]

          if (template == null) template = construct(targetClassName)

          if (targetClass.super) this.deepCopy(
               classFinder, construct, template, obj, targetClass.super.name)

          // The validator did all the checking
          for (let [id, targetField] of Object.entries(targetClass.fields)){
               const field = obj[id]
               if (field == null) continue
               if (targetField.generic) {
                    if (targetField.type === Array) {
                         template[id] = (field as Array<any>).map(
                              o => { return this.deepCopy(classFinder, construct, null, o) }
                         )
                    } else if (targetField.type === Object) {
                         template[id] = this.deepCopy(classFinder, construct, null, field)
                    }
               } else {
                    template[id] = field
               }
          }
          return template
     }
}
