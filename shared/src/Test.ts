import * as Mocks from "./MockData"
import { GenericClassValidator } from "./ClassValidator"
import util from "util"
import { GenericJsonSerializer } from "./ClassJsonSerializer"
import * as Model from "./ClassDef"

const log = console.log
const inspect = (o: any) => { log(util.inspect(o, false, null, true)) }

// TODO: this is not the proper way to run tests
// Need to write using proper testing framework


// *** Testing for the validator ***

log("----Validator test----")
log("----expecting no output----")
for (let [name, func] of Object.entries(Mocks)){
     log(`Test validation for ${name}`)
     GenericClassValidator.validate(func())
}

log("----expecting reasonable error message----")

try{
     log("Root level property invalid:")
     const form = Mocks.buildFormComplete()
     form.formProperties = 1 as any
     GenericClassValidator.validate(form)
}catch(e){
     log(e.message)
}

try{
     log("Super class property invalid:")
     const form = Mocks.buildFormComplete()
     form.uid = 1 as any
     GenericClassValidator.validate(form)
}catch(e){
     log(e.message)
}

try{
     log("Sub level missing attribute")
     const form = Mocks.buildFormComplete()
     form.children[0].id = null as any
     GenericClassValidator.validate(form)
}catch(e){
     log(e.message)
}

try{
     log("Child of child is invalid")
     const form = Mocks.buildFormComplete()
     form.children[0].children.push({} as any)
     GenericClassValidator.validate(form)
}catch(e){
     log(e.message)
}

try{
     log("Attribute validator failed")
     const form = Mocks.buildFormComplete()
     form.order = -1
     GenericClassValidator.validate(form)
}catch(e){
     log(e.message)
}

// *** Testing for the serializer ***

const obj = Mocks.buildFormComplete()
const encoded = GenericJsonSerializer.encode(obj, Model.SDCForm)
const decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm)

log("----Serializer test----")
log("----the object printed below should be the same----")

inspect(obj)
inspect(decoded)

log("----expecting reasonable error message----")

try{
     log("Encoding object is unexpected")
     GenericJsonSerializer.encode(obj, Model.SDCFormResponse)
}catch(e){
     log(e.message)
}

try{
     log("Decoding object is unexpected")
     GenericJsonSerializer.decode(encoded, Model.SDCFormResponse)
}catch(e){
     log(e.message)
}

// Since the serializer calls the validator directly
// No other testing needed
