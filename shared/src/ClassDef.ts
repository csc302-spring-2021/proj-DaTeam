/*  This file is for domain object definitions only
    Validators, Encoders, Decoders should not be placed here
 */

export class Procedure {
    uid?: string
    id: string
    assignedFormID?: string

    constructor(data?: any){
        Object.assign(this, data)
    }
}

export class Patient {
    uid?: string
    id: string // external patient id (OHIP)
    name: string

    constructor(data?: any){
        Object.assign(this, data)
    }
}

export abstract class SDCNode {
    readonly class: string // for json serilization only
    id: string
    uid?: string // uid is only assigned after it is stored in the database
    title?: string
    order?: number
    children: SDCNode[] = []
    maxSelections = 1
    minSelections = 1

    constructor(data?: any){
        Object.assign(this, data)
        this.class = this.constructor.name;
    }
}

export abstract class SDCQuestion extends SDCNode {}

export class SDCForm extends SDCNode {
    lineage: string
    version: string
    header?: string
    footer?: string
    formProperties: SDCFormProperty[] = []
}

export class SDCFormProperty {
    readonly class = "SDCFormProperty"
    order?: number
    name: string
    propName: string
    val: string

    constructor(data?: any){
        Object.assign(this, data)
    }
}

export class SDCSection extends SDCNode {}

export class SDCDisplayItem extends SDCNode {}

export class SDCTextField extends SDCQuestion {
    textAfterResponse?: string
    type: string
}

export class SDCListField extends SDCQuestion {
    options: SDCListFieldItem[] = []
    lookupEndPoint?: string
}

export class SDCListFieldItem extends SDCNode {
    textResponse?: SDCTextField
    selectionDeselectsSiblings = false
    selectionDisablesChildren = false
}

export class SDCFormResponse {
    uid?: string // uid is only assigned after it is stored in the database
    formId: string
    patientID: string // uid of the patient
    answers: SDCAnswer[] = []

    constructor(data?: any){
        Object.assign(this, data)
    }
}

export class SDCAnswer {
    // uid: string  // No need and cannot expose this field 
                    // as it may have multiple uid's in db
    questionID: string
    // an answer without responses will not be save in db
    responses: string[] = []

    constructor(data?: any){
        Object.assign(this, data)
    }
}
