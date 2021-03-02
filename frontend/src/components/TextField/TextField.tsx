import { Model } from "@dateam/shared";
import { useState } from "react";
import { FormInput } from "../FormInput";

function TextField(props: { sdcTextField: Model.SDCTextField; children?: any }) {
    const [textResponse, setTextResponse] = useState<string>("");

    return (
        <div
            data-testid="textfield"
            className="py-4 text-lg font-bold rounded-lg "
        >
            {props.sdcTextField.title}
            <div className="py-4">
                <FormInput
                    placeholder={props.sdcTextField.title}
                    type="text"
                    state={textResponse}
                    setState={setTextResponse}
                />
                {props.children}
            </div>

        </div>
    );
}
export default TextField;
