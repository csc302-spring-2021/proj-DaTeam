import { Model } from "@dateam/shared";
import { useState } from "react";
import { FormInput } from "../FormInput";

function ListFieldItem(props: {
  parentQuestionID?: string;
  responseState?: {
    setResponse: React.Dispatch<
      React.SetStateAction<{ [key: string]: string }>
    >;
    response: { [key: string]: string };
  };
  isMultiSelect: boolean;
  isSelected: boolean;
  children?: any;
  sdcListFieldItem: Model.SDCListFieldItem;
}) {
  const [textResponse, setTextResponse] = useState<string>("");
  return (
    <div
      data-testid="listfielditem"
      className="font-normal tracking-wide text-md"
    >
      <label className="inline-flex items-center">
        <div className="py-1 text-xl border-gray-300 rounded cursor-pointer hover:bg-gray-200">
          <input
            id={props.sdcListFieldItem.id}
            type={props.isMultiSelect ? "checkbox" : "radio"}
            className="w-5 h-5 ml-2 form-radio"
            name={"radio"}
            value={props.sdcListFieldItem.title}
          />
          <label className="ml-2">
            <>{props.sdcListFieldItem.id}</>
            {props.sdcListFieldItem.textResponse && props.isSelected ? (
              <div className="py-2 pl-8">
                <FormInput
                  placeholder={props.sdcListFieldItem.textResponse.title}
                  type="text"
                  state={textResponse}
                  setState={setTextResponse}
                  iid={props.sdcListFieldItem.textResponse.id}
                  responseState={props.responseState}
                />
              </div>
            ) : (
              <></>
            )}
          </label>
        </div>
      </label>
      <div className="px-12">
        {props.isSelected && !props.sdcListFieldItem.selectionDisablesChildren
          ? props.children
          : null}
      </div>
    </div>
  );
}

export default ListFieldItem;
