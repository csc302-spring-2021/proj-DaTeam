/**
 * Class validator for domain objects
 */

import { classMeta } from "./ClassMeta";
import { StackUtil, nativeTypes, ValidationError } from "./Utils";

/** This validator can only validate object integrity based on classMeta */
export class GenericClassValidator {
  protected stackUtil: StackUtil = new StackUtil("Root", ValidationError);

  protected constructor() {}

  /**
   * Validate an object
   *
   * @param obj object to validate
   * @param className use the validation logic of this class
   */
  static validate(obj: any) {
    return new this()._validate(obj);
  }

  /**
   * Validate an object
   *
   * @param obj object to validate
   * @param className use the validation logic of this class
   */
  protected _validate(obj: any, className?: string) {
    if (className == null) className = obj.constructor.name;
    if (className == null) {
      throw this.stackUtil.genError("Unable to determine class");
    }

    const targetClass = classMeta[className];
    if (targetClass == null) {
      throw this.stackUtil.genError("Unsupported class: " + className);
    }

    if (targetClass.super) this._validate(obj, targetClass.super.name);

    for (let [id, targetField] of Object.entries(targetClass.fields)) {
      const field = obj[id];
      if (field == null) {
        if (targetField.nullable) {
          continue;
        } else {
          throw this.stackUtil.genError("Missing attribute: " + id);
        }
      }
      if (
        targetField.type !== field.constructor &&
        !(field instanceof targetField.type)
      ) {
        throw this.stackUtil.genError(
          `Attribute type error: ${id}, expecting ${targetField.type.name} ` +
            `but got ${field.constructor.name}`
        );
      }
      if (targetField.validator) {
        try {
          targetField.validator(obj);
        } catch (e) {
          throw this.stackUtil.genError(
            `Attribute invalid: ${id}, ${e.message}`
          );
        }
      }
      if (!targetField.generic) continue;
      this.stackUtil.enter(id);
      if (targetField.type === Array) {
        const array = field as Array<any>;
        for (let i in array) {
          const child = array[i];
          if (
            child.constructor !== targetField.generic &&
            !(child instanceof targetField.generic)
          ) {
            throw this.stackUtil.genError(
              `Attribute type error: ${id}[${i}], ` +
                `expecting ${targetField.generic.name} ` +
                `but got ${child.constructor.name}`
            );
          }
          // for array only validate custom types
          if (nativeTypes.indexOf(targetField.generic.name.toLowerCase()) < 0) {
            this._validate(child);
          }
        }
      } else if (targetField.type === Object) {
        if (!(field instanceof targetField.generic)) {
          throw this.stackUtil.genError(
            `Attribute type error: ${id}, ` +
              `expecting ${targetField.generic.name} ` +
              `but got ${field.constructor.name}`
          );
        }
        this._validate(field);
      } else {
        // classMeta defintion is invalid
        throw this.stackUtil.genError(
          `Invalid type and generic combination for class meta ${className}.${id}`
        );
      }
      this.stackUtil.leave();
    }
  }
}
