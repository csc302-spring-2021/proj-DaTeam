import { Model } from "@dateam/shared";
import React, { useEffect, useState } from "react";
import { ListFieldItem } from "../ListFieldItem";
import { LinkedListNode } from "./LinkedListNode";

export interface IOptionNode {
  listFieldItem: Model.SDCListFieldItem;
  listFieldItemChildren: JSX.Element[];
}
interface IListFieldProps {
  responseState: {
    setResponse: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    response: { [key: string]: any };
  };
  optionNodes: IOptionNode[];
  children?: React.ReactNode;
  sdcListField: Model.SDCListField;
}

/**
 * An selectable list field which may or many not have one or more items.
 * @param  {[type]} responseState [description]
 * @param  {[type]} optionNodes [description]
 * @param  {[type]} children [description]
 * @param  {[type]} sdcListField [description]
 */
function ListField(props: IListFieldProps) {
  const { responseState, optionNodes, children, sdcListField } = props;

  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  // Set choice for single answer responses
  const [currentSingleChoice, setCurrentSingleChoice] = useState(
    new LinkedListNode<string>("ROOT")
  );
  // Check if we should use checkboxes or radio buttons
  // Check for each node
  useEffect(() => {
    setIsMultiSelect(sdcListField.maxSelections !== 1);
  }, [optionNodes, sdcListField.maxSelections]);

  // Sets current parent node in list
  const onClickListField = (optionnode: IOptionNode) => () => {
    const ll_node = new LinkedListNode<string>(optionnode.listFieldItem.id);
    setCurrentSingleChoice(ll_node);
  };

  return (
    <fieldset data-testid="listfield" className="py-2 tracking-wide text-md ">
      <legend className="w-full px-2 py-1 font-bold bg-blue-200 rounded-md">
        {sdcListField.title
          ? sdcListField.title + " - ID: " + sdcListField.id
          : "ID: " + sdcListField.id}
      </legend>
      <div>
        {optionNodes.map((optionnode) => {
          return (
            <ListFieldItem
              key={optionnode.listFieldItem.id}
              setCurrentChoice={setCurrentSingleChoice}
              currentChoice={currentSingleChoice}
              optionNode={optionnode}
            />
          );
        })}
        {/* <ListFieldItem
                key={optionnode.listFieldItem.id}
                responseState={responseState}
                isMultiSelect={isMultiSelect}
                isSelected={
                  responseState.response[sdcListField.id]
                    ? responseState.response[sdcListField.id].indexOf(
                        optionnode.listFieldItem.id
                      ) !== -1
                    : false
                }
                parentNode={currentSingleChoice}
                onClick={isMultiSelect ? onChangeMultiSelect : onChangeSelect}
                sdcListFieldItem={optionnode.listFieldItem}
              >
                {optionnode.listFieldItemChildren}
              </ListFieldItem> */}
      </div>
      {children}
    </fieldset>
  );
}

export default ListField;
