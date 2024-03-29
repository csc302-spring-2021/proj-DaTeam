import { Model } from "@dateam/shared";
import React, { useEffect, useState } from "react";
import { FormInput } from "../FormInput";
import { LinkedListNode } from "../ListField/LinkedListNode";
import { IOptionNode } from "../ListField/ListField";

interface IListFieldItemProps<T> {
  optionNode: IOptionNode;
  setCurrentChoice?: React.Dispatch<React.SetStateAction<T>>;
  currentChoice?: T;
  uncollaped?: boolean;
  isMultiSelect: boolean;
  isDisabled?: boolean;
}

/**
 * An selectable list field which may or many not have one or more items.
 * @param  {[type]} responseState [description]
 * @param  {[type]} optionNodes [description]
 * @param  {[type]} children [description]
 * @param  {[type]} sdcListField [description]
 * @param  {[type]} isDisabled [description]
 */
function ListFieldItem(props: IListFieldItemProps<string[]>) {
  const {
    currentChoice,
    setCurrentChoice,
    optionNode,
    uncollaped,
    isMultiSelect,
    isDisabled,
  } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [optionalText, setOptionalText] = useState("");

  useEffect(() => {
    if (currentChoice && setCurrentChoice) {
      if (currentChoice.includes(optionNode.listFieldItem.id)) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [optionNode, currentChoice]);

  const onCheck = (e: React.MouseEvent | React.ChangeEvent) => {
    // e.preventDefault();
    e.stopPropagation();

    if (isDisabled) {
      return;
    }

    const currentId = optionNode.listFieldItem.id;
    if (currentChoice && setCurrentChoice) {
      if (!currentChoice.includes(currentId)) {
        isMultiSelect
          ? setCurrentChoice((arr) => [...arr, currentId])
          : setCurrentChoice([currentId]);
      } else {
        setCurrentChoice((arr) => arr.filter((val) => val !== currentId));
      }
    }
  };

  const checkType = isMultiSelect ? "checkbox" : "radio";

  return (
    <div className="flex flex-col" data-testid="listfielditem">
      <div
        onClick={onCheck}
        className={`flex px-2 space-x-4 rounded-md mb-1 ${
          isChecked ? "bg-blue-200" : isDisabled ? "" : "hover:bg-blue-100"
        } ${isDisabled ? "" : "cursor-pointer"}`}
      >
        <input
          className={`my-auto ${isDisabled ? "" : "cursor-pointer"}`}
          checked={isChecked}
          onChange={onCheck}
          type={checkType}
        />
        <label className={`my-auto ${isDisabled ? "" : "cursor-pointer"}`}>
          {!optionNode.listFieldItem.selectionDisablesChildren &&
            optionNode.listFieldItemChildren.length > 0 &&
            " +  "}
          {optionNode.listFieldItem.title}
        </label>
      </div>

      <div className={`flex flex-col pl-4`}>
        {(isChecked || uncollaped) &&
          !optionNode.listFieldItem.selectionDisablesChildren &&
          optionNode.listFieldItemChildren}

        {(isChecked || uncollaped) && optionNode.listFieldItem.textResponse && (
          <div className="my-2">
            <FormInput
              placeholder={optionNode.listFieldItem.textResponse.title}
              type="text"
              state={optionalText}
              setState={setOptionalText}
              isDisabled={isDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListFieldItem;
