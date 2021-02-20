# Shared module

Shared module contains domain object definitions and other utilities
that can be used by both the frontend and backend

# Components

## ClassDef

Contains domain object definition in TypeScript

Sample usage:
```typescript
import { Model } from "@dateam/shared";

const form = new Model.SDCForm();
```

## ClassMeta

Contains type meta information about domain objects.
It also includes simple validators for some fielde.

If ClassDef is updated, the meta file should also be updated.

This module is not needed except for modules that
constructs/validates the domain object

Sample usage:
```typescript
import { classMeta } from "@dateam/shared";

classMeta["SDCNode"].fields["uid"]; // gets type information of SDCNode.uid
```

## TextFieldTypeMeta (not fully implemented)

Contains definitions and meta info for text field types.
All types listed here are defined in the official SDC document.

Sample usage:
```typescript
import { textFieldTypeMeta } from "@dateam/shared";

let text = " 5 ";
let textFieldType = "int";
let meta = textFieldTypeMeta[textFieldType];

// format the field (e.g. when the user clicks on submit)
if (meta.processor) text = meta.processor(text);

// validate and parse the field
try{
    const value = meta.parsor ? meta.parsor(text) : text;
}catch(e){
    console.log(e); // input is invalid
}
```

## ClassValidator

Although TypeScript is type safe, there is no runtime type checking for it.
The validator checks to make sure a domain object is valid using classMeta,
and provides human readable error message when an error is detected

This module should be rarely used as the serializer calls this automatically

Sample usage:
```typescript
import { GenericClassValidator } from "@dateam/shared";

try{
    // Works for any domain object
    GenericClassValidator.validate(obj);
} catch(e){
    console.log(e);
}
```

## ClassJsonSerializer

Because the class information is invisible when doing stringify,
a special serializer is need.
This serializer can serialize objects based on classMeta.
Extra attributes on the objects are discarded.

ClassValidator is called automatically before encoding and after decoding

Sample usage:
```typescript
import { GenericJsonSerializer } from "@dateam/shared";

// encode an SDCForm into pure json
try{
    const encoded = GenericJsonSerializer.encode(obj, Model.SDCForm);
} catch(e){
    console.log(e);
}

// decode a pure json into SDCForm
try{
    const decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm);
} catch(e){
    console.log(e);
}
```

## FormResponseValidator (not fully implemented)

A validator that validate a form response for a given form.
It also calls the ClassValidator to make sure the object structure is correct.
If all validations passed, it will remove unneeded answers from the response.

Sample usage:
```typescript
import { FormResponseValidator } from "@dateam/shared";

try{
    // errors collected here are for individual fields
    const errors = FormResponseValidator.validate(response, form);
}catch(e){
    console.log(e); // this error is likely from the class validator
}
```

## MockData

Contains mock domain objects for testing.
- Functions begin with `gen` only generate a single object.
- Functions begin with `build` will generate a complex object.
- Functions end with `Complete` means all attributes are defined.
- Functions end with `Partial` means optional attributes are missing.

Sample usage:
```typescript
import { Mocks } from "@dateam/shared";

Mocks.buildFormComplete()
```
