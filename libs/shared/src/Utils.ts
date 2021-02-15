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
     leave(level: string){
          this.callStack.pop()
     }
}
