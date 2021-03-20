import * as Model from "./ClassDef";

/** Offers call stack support for error */
export class StackUtil {
  /** Keep track of where the parser is parsing */
  private callStack: string[] = [];

  /** Error type to generate */
  private errorType: new (message: string) => Error = Error;

  constructor(rootName?: string, errorType?: new () => Error) {
    if (rootName) this.callStack.push(rootName);
    if (errorType) this.errorType = errorType;
  }

  /** Throw error with the stack info */
  genError(message: string): Error {
    return new this.errorType(message + " at " + this.callStack.join("."));
  }

  /** append level to call stack */
  enter(level: string) {
    this.callStack.push(level);
  }

  /** append level to call stack */
  leave() {
    this.callStack.pop();
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
  "function",
];

export class ValidationError extends Error {}
export class ParsingError extends Error {}

export class AnswerValidationError extends ValidationError {
  question: Model.SDCQuestion;
  debugMessage: string;

  constructor(
    question: Model.SDCQuestion,
    message: string,
    debugMessage?: string
  ) {
    super();
    this.question = question;
    this.message = message;
    this.debugMessage = debugMessage || "";
  }
}

/**
 * A helper function to print the form in abbreviated formate
 * @param node The form to print
 * @param response A response to the form to be printed along size
 */
export function printNode(
  node: Model.SDCNode,
  response?: Model.SDCFormResponse,
  curIndent: string = "",
  indent: string = "    "
) {
  const print = (o: any) => {
    console.log(curIndent + o);
  };
  let header = `<${node.constructor.name}> ${node.id} [${node.title}]`;
  let answer = response?.answers.find((a) => a.questionID === node.id);
  let printBody = () => {};

  if (node instanceof Model.SDCListField) {
    header += ` min: ${node.minSelections}, max: ${node.maxSelections}`;
    printBody = () => {
      print("options: ");
      node.options.forEach((o) => printNode(o, response, curIndent + indent));
      print("children: ");
      curIndent += indent;
    };
  } else if (node instanceof Model.SDCListFieldItem) {
    header += ` deSiblings: ${node.selectionDeselectsSiblings}, deChildren: ${node.selectionDisablesChildren}`;
    printBody = () => {
      if (node.textResponse) {
        print("textResponse: ");
        printNode(node.textResponse, response, curIndent + indent);
      }
    };
  } else if (node instanceof Model.SDCTextField) {
    header += ` type: ${node.type}, textAfter: ${node.textAfterResponse}`;
  }

  print(header);
  curIndent += indent;
  if (answer) print(`answer: ${answer.responses}`);
  printBody();

  node.children.forEach((o) => printNode(o, response, curIndent));
}

/** A helper function to access a sub node by id */
export function findNode(node: Model.SDCNode, id: string): any {
  function findNodes(node: Model.SDCNode, id: string): Model.SDCNode[] {
    if (node.id === id) return [node];

    let children = node.children.concat([]); // copy
    if (node instanceof Model.SDCListField) {
      children = children.concat(node.options);
    } else if (node instanceof Model.SDCListFieldItem) {
      if (node.textResponse) children.push(node.textResponse);
    }

    return children.flatMap((o) => findNodes(o, id));
  }
  const matches = findNodes(node, id);
  if (matches.length === 0) throw new Error("id not found for " + id);
  if (matches.length > 1) throw new Error("duplicates found for id " + id);
  return matches[0];
}

/** A helper function to access an answer by question id */
export function findAnswer(
  response: Model.SDCFormResponse,
  id: string
): Model.SDCAnswer {
  const matches = response.answers.filter((o) => o.questionID === id);
  if (matches.length === 0) throw new Error("id not found for " + id);
  if (matches.length > 1) throw new Error("duplicates found for id " + id);
  return matches[0];
}
