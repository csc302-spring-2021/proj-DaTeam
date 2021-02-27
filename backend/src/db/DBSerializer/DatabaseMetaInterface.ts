import { ITask, as } from "pg-promise";

export abstract class IClassDatabaseSerializer {
  tx: ITask<{}>;

  constructor(task: ITask<{}>) {
    this.tx = task;
  }

  async create(obj: any, parent?: any, className?: string): Promise<any> {}

  async read() {}

  async delete() {}
}

export class ClassDatabaseMetaType {
  table: string;
  fields: { [id: string]: FieldDatabaseMetaType };
  serializer?: new (tx: ITask<{}>) => IClassDatabaseSerializer;
  pk?: string;
  classColumn?: string;
  classMapper?: { [id: string]: new () => any };
}

export abstract class FieldDatabaseMetaType {
  toSQL(id: string, from: any, to: any) {}
  fromSQL(id: string, from: any, to: any) {}
}

export class Nothing extends FieldDatabaseMetaType{}
export const nothing = new Nothing()

export class Just extends FieldDatabaseMetaType {
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[id] = from[id];
  }
  fromSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[id] = from[id];
  }
}
export const just = new Just();

export class Remap extends FieldDatabaseMetaType {
  ref: string;
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[this.ref] = from[id];
  }
  fromSQL(id: string, from: any, to: any) {
    if (from && from[this.ref] != null) to[id] = from[this.ref];
  }
  constructor(column: string) {
    super();
    this.ref = column;
  }
}
export function remap(ref: string): Remap {
  return new Remap(ref);
}

export abstract class Ref extends FieldDatabaseMetaType {
  genCondition(id: string, parent: any): string {
    return "1 = 1"
  }
}

// select * from child where child.uid = parent.childId
// Parent references child
export class ChildRef extends Ref {
  ref: string;
  genCondition(id: string, parent: any): string {
    return as.format(`${this.ref} = $(${id})`, parent);
  }
  toSQL(id: string, from: any, to: any) {
    if (from && from[this.ref] != null) to[id] = from[this.ref];
  }
  fromSQL(id: string, from: any, to: any) {}
  constructor(column: string) {
    super();
    this.ref = column;
  }
}
export function childRef(ref: string): ChildRef {
  return new ChildRef(ref);
}

// select * from child where child.parentid = parent.uid
// Child references parent
export class RefToChild extends Ref {
  from: string;
  to: string;
  genCondition(id: string, parent: any): string {
    return as.format(`${this.to} = $(${this.from})`, parent);
  }
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) {
      [from[id]].flat(1).map((o) => {
        o[this.to] = from[this.from];
      });
    }
  }
  fromSQL(id: string, from: any, to: any) {}
  constructor(from: string, to: string) {
    super();
    this.from = from;
    this.to = to;
  }
}
export function refToChild(from: string, to: string): RefToChild {
  return new RefToChild(from, to);
}
