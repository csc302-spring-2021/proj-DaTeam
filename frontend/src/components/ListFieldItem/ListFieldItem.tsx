import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { FormInput } from "../FormInput";
import { LinkedListNode } from "../ListField/LinkedListNode";
import { IOptionNode } from "../ListField/ListField";

interface IListFieldItemProps {
  optionNode: IOptionNode;
  setCurrentChoice: React.Dispatch<
    React.SetStateAction<LinkedListNode<string>>
  >;
  currentChoice: LinkedListNode<string>;
  /* parentQuestionID?: string;
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
  onClick: Function;
  currentChoice: LinkedListNode<string> | undefined; */
}

/**
 * An selectable list field which may or many not have one or more items.
 * @param  {[type]} responseState [description]
 * @param  {[type]} optionNodes [description]
 * @param  {[type]} children [description]
 * @param  {[type]} sdcListField [description]
 */
function ListFieldItem(props: IListFieldItemProps) {
  const { currentChoice, setCurrentChoice, optionNode } = props;

  const checked = currentChoice.getValue() === optionNode.listFieldItem.id;
  const onCheck = () => {
    const currentNode = new LinkedListNode(optionNode.listFieldItem.id);
    currentNode.setPrev(currentChoice);
    currentChoice.setNext(currentNode);
    setCurrentChoice(currentNode);
  };

  /*   const {
    parentQuestionID,
    responseState,
    isMultiSelect,
    isSelected,
    children,
    sdcListFieldItem,
    onClick,
    currentChoice,
  } = props;

  const [textResponse, setTextResponse] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const onClickFunc = () => {
    if (currentChoice) {
      currentChoice.next = new LinkedListNode(sdcListFieldItem.id);
    }
    console.log(currentChoice);
    setIsChecked((b) => !b);
  }; */

  return (
    <div className="flex flex-col " onClick={onCheck}>
      <div
        className={`flex px-2 space-x-4 rounded-md cursor-pointer  ${
          checked ? "bg-blue-200" : "hover:bg-blue-100"
        }`}
      >
        <input
          className="my-auto cursor-pointer"
          checked={checked}
          onChange={onCheck}
          type="radio"
        />
        <label className="my-auto cursor-pointer">
          {optionNode.listFieldItem.title}
        </label>
      </div>

      <div className={`flex flex-col pl-4`}>
        {checked &&
          !optionNode.listFieldItem.selectionDisablesChildren &&
          optionNode.listFieldItemChildren}
        {checked && optionNode.listFieldItem.textResponse && (
          <div className="mt-2">
          <FormInput
            placeholder={optionNode.listFieldItem.textResponse.title}
            type="text"
            state={""}
            setState={() => {}}
          />
          </div>
        )}
      </div>

      {/* <div
      data-testid="listfielditem"
      className="font-normal text-md"
      onClick={onClickFunc}
    >
      <label className="inline-flex items-center w-full">
        <div className="flex w-full py-1 border-gray-300 rounded cursor-pointer hover:bg-gray-200">
          <input
            id={sdcListFieldItem.id}
            type={isMultiSelect ? "checkbox" : "radio"}
            className="w-5 h-5 ml-2 form-radio"
            name={"radio"}
            checked={isChecked}
            onChange={() => setIsChecked((s) => (!s))}
          />
          <label className="px-1 ml-2 cursor-pointer">
            <>{sdcListFieldItem.id}</>
            {sdcListFieldItem.textResponse && isChecked ? (
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
        {isChecked && !sdcListFieldItem.selectionDisablesChildren
          ? children
          : null}
      </div>
    </div> */}
    </div>
  );
}

export default ListFieldItem;
