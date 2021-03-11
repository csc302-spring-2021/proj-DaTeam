import { Model } from "@dateam/shared";
import { useState } from "react";
import { FormInput } from "../FormInput";

interface IListFieldItemProps {
  parentQuestionID?: string;
  responseState?: {
    setResponse: React.Dispatch<
      React.SetStateAction<{ [key: string]: string }>
    >;
    response: { [key: string]: string };
  };
  isMultiSelect: boolean;
  isSelected: boolean;
  children?: React.ReactNode;
  sdcListFieldItem: Model.SDCListFieldItem;
  onClick: Function
}

/**
 * An selectable list field which may or many not have one or more items.
 * @param  {[type]} responseState [description]
 * @param  {[type]} optionNodes [description]
 * @param  {[type]} children [description]
 * @param  {[type]} sdcListField [description]
 */
function ListFieldItem(props: IListFieldItemProps) {
  const {
    parentQuestionID,
    responseState,
    isMultiSelect,
    isSelected,
    children,
    sdcListFieldItem,
    onClick
  } = props;

  const [textResponse, setTextResponse] = useState<string>("");
  return (
    <div data-testid="listfielditem" className="font-normal text-md">
      <label className="inline-flex items-center w-full">
        <div className="flex w-full py-1 border-gray-300 rounded cursor-pointer hover:bg-gray-200">
          <input
            id={sdcListFieldItem.id}
            type={isMultiSelect ? "checkbox" : "radio"}
            className="w-5 h-5 ml-2 form-radio"
            name={"radio"}
            checked={isSelected}
          />
          <label className="px-1 ml-2 cursor-pointer">
            <>{sdcListFieldItem.id}</>
            {sdcListFieldItem.textResponse && isSelected ? (
              <div className="pl-8 ">
                <FormInput
                  placeholder={sdcListFieldItem.textResponse.title}
                  type="text"
                  state={textResponse}
                  setState={setTextResponse}
                  iid={sdcListFieldItem.textResponse.id}
                  responseState={responseState}
                />
              </div>
            ) : (
              <></>
            )}
          </label>
        </div>
      </label>
      <div className="px-12">
        {isSelected && !sdcListFieldItem.selectionDisablesChildren
          ? children
          : null}
      </div>
    </div>
  );
}

export default ListFieldItem;
