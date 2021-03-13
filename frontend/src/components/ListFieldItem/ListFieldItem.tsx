import { Model } from "@dateam/shared";
import React, { useEffect, useState } from "react";
import { FormInput } from "../FormInput";
import { LinkedListNode } from "../ListField/LinkedListNode";
import { IOptionNode } from "../ListField/ListField";

interface IListFieldItemProps<T> {
  optionNode: IOptionNode;
  setCurrentChoice: React.Dispatch<React.SetStateAction<LinkedListNode<T>>>;
  currentChoice: LinkedListNode<T>;
  uncollaped?: boolean;
  isMultiSelect: boolean;
  currentNode?: LinkedListNode<T>;
}

/**
 * An selectable list field which may or many not have one or more items.
 * @param  {[type]} responseState [description]
 * @param  {[type]} optionNodes [description]
 * @param  {[type]} children [description]
 * @param  {[type]} sdcListField [description]
 */
function ListFieldItem(props: IListFieldItemProps<string[]>) {
  const {
    currentChoice,
    setCurrentChoice,
    optionNode,
    uncollaped,
    isMultiSelect,
  } = props;

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checked = isMultiSelect
      ? currentChoice
          .getPrev()
          ?.getValue()
          .includes(optionNode.listFieldItem.id) || false
      : currentChoice
          .getNext()
          ?.getValue()
          .includes(optionNode.listFieldItem.id) || false;
    setIsChecked(checked);
  }, []);

  const onCheck = (e: React.MouseEvent | React.ChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isMultiSelect) {
      setIsChecked((c) => !c);
    }
  };

  const checkType = isMultiSelect ? "checkbox" : "radio";

  return (
    <div
      onClick={onCheck}
      className="flex flex-col"
      data-testid="listfielditem"
    >
      <div
        className={`flex px-2 space-x-4 rounded-md cursor-pointer mb-1  ${
          isChecked ? "bg-blue-200" : "hover:bg-blue-100"
        }`}
      >
        <input
          className="my-auto cursor-pointer"
          checked={isChecked}
          onChange={onCheck}
          type={checkType}
        />
        <label className="my-auto cursor-pointer">
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
    </div>
  );
}

export default ListFieldItem;
