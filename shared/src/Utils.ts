import * as Model from "./ClassDef"

/** Offers call stack support for error */
export class StackUtil {

     /** Keep track of where the parser is parsing */
     private callStack: string[] = []

     /** Error type to generate */
     private errorType: new(message: string) => Error = Error

     constructor(rootName?: string, errorType?: new() => Error){
          if (rootName) this.callStack.push(rootName)
          if (errorType) this.errorType = errorType
     }

     /** Throw error with the stack info */
     genError(message: string): Error{
          return new this.errorType(message + " at " + this.callStack.join("."))
     }

     /** append level to call stack */
     enter(level: string){
          this.callStack.push(level)
     }

     /** append level to call stack */
     leave(){
          this.callStack.pop()
     }
}

export const nativeTypes = [
     "string",
     "number",
     "bigint",
     "boolean",
     "symbol",
     "undefined",
     "object",
     "function"
]

export class ValidationError extends Error {}
export class ParsingError extends Error {}

export class AnswerValidationError extends ValidationError {

     question: Model.SDCQuestion
     debugMessage: string
     
     constructor(question: Model.SDCQuestion, message: string , debugMessage?: string){
          super()
          this.question = question
          this.message = message
          this.debugMessage = debugMessage || ""
     }
}
