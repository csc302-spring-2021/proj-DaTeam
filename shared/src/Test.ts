import * as Mocks from "./MockData"
import { GenericClassValidator } from "./ClassValidator"

const log = console.log

// TODO: this is not the proper way to run tests
// Need to write using proper testing framework

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
