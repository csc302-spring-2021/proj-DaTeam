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
  const [uncollapsed, setUncollapsed] = useState(true);

  // Set choice for single answer responses
  const [currentChoice, setCurrentChoice] = useState<string[]>([]);
  useEffect(() => {
    const res = responseState.response[sdcListField.id];
    if (typeof res === "string") {
      setCurrentChoice([res]);
    } else {
      setCurrentChoice([]);
    }
  }, [responseState]);

  const collapseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUncollapsed(!uncollapsed);
  };

  const preventLegendSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const isMultiSelect = sdcListField.maxSelections !== 1;

  return (
    <fieldset data-testid="listfield" className="tracking-wide text-md">
      <div onClick={preventLegendSelect} className="flex">
        <legend className="w-full p-1 font-bold rounded-md">
          {sdcListField.title && sdcListField.title + " - "}
          {"ID: " + sdcListField.id}
        </legend>
        {sdcListField.children && (
          <button
            onClick={collapseClick}
            className="w-12 h-6 mt-1 bg-gray-300 rounded-md text-md hover:bg-gray-400"
          >
            {uncollapsed ? "-" : "+"}
          </button>
        )}
      </div>
      <div className="">
        {uncollapsed &&
          optionNodes.map((optionnode) => {
            /* currentChoice.addValue([optionnode.listFieldItem.id]); */

            return (
              <ListFieldItem
                key={optionnode.listFieldItem.id}
                setCurrentChoice={setCurrentChoice}
                currentChoice={currentChoice}
                optionNode={optionnode}
                response={responseState.response[sdcListField.id]}
                uncollaped={uncollapsed}
                isMultiSelect={isMultiSelect}
              />
            );
          })}
      </div>
      {children}
    </fieldset>
  );
}

export default ListField;
