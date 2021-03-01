import { Model } from "@dateam/shared";
import { useState } from "react";
import { FormInput } from "../FormInput";

function ListFieldItem(props: {isSelected?:boolean, children?: any; sdcListFieldItem: Model.SDCListFieldItem }) {
    const [textResponse, setTextResponse] = useState<string>("");
    return (
        <div
            data-testid="listfielditem"
            className="text-md font-normal tracking-wide "
        >
                <label className="inline-flex items-center"> 
                <div className="py-1 text-xl hover:bg-gray-200 border-gray-300 rounded">
                    <input type="radio" className="form-radio ml-2 h-5 w-5" name={"radio"} value={props.sdcListFieldItem.title} />
                    <span className="ml-2"> 
                    <>{props.sdcListFieldItem.title}</>
                    {props.sdcListFieldItem.textResponse ?
                    <div className="py-2 pl-8">
                        <FormInput
                            placeholder={props.sdcListFieldItem.textResponse.title}
                            type="text"
                            state={textResponse}
                            setState={setTextResponse}
                        />
                    </div>
                        :
                        <></>
                    }
                    </span>
                    </div>
                </label>
                <div className="px-12">
                    {(props.isSelected && !props.sdcListFieldItem.selectionDisablesChildren ) ? props.children : null}
                </div>
        </div>
    );
}

export default ListFieldItem;
