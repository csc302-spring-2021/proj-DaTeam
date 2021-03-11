import { Model } from "@dateam/shared";
import React, { useEffect, useState } from "react";
import { ListFieldItem } from "../ListFieldItem";

interface IListFieldProps {
  responseState: {
    setResponse: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    response: { [key: string]: any };
  };
  optionNodes: {
    listFieldItem: Model.SDCListFieldItem;
    listFieldItemChildren: JSX.Element[];
  }[];
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
  const [numSelected, setNumSelected] = useState<number>(0);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);

  const { responseState, optionNodes, children, sdcListField } = props;

  // Check if we should use checkboxes or radio buttons  
  useEffect(() => {
    if (sdcListField.maxSelections !== 1) {
      setIsMultiSelect(true);
    }
  }, [optionNodes, sdcListField.maxSelections]);

  const onChangeSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const response: { [key: string]: any } = {
      ...responseState.response,
    };
    if (numSelected === 0) {
      setNumSelected(1);
    }
    console.log((event.target as any).id)
    response[sdcListField.id] = [(event.target as any).id];
    responseState.setResponse(response);
  };

  const onChangeMultiSelect = (event: any) => {
    event.stopPropagation();
    if (event.target.checked && numSelected >= sdcListField.maxSelections + 5) {
      event.target.checked = false;
    } else {
      const response: { [key: string]: any } = {
        ...responseState.response,
      };
      if (response[sdcListField.id] === undefined) {
        response[sdcListField.id] = [];
      }
      let index = response[sdcListField.id].indexOf(event.target.id);
      if (event.target.checked && index === -1) {
        response[sdcListField.id].push(event.target.id);
        setNumSelected(numSelected + 1);
      } else if (!event.target.checked && index !== -1) {
        response[sdcListField.id].splice(index, 1);
        setNumSelected(numSelected - 1);
      }
      responseState.setResponse(response);
    }
  };

  return (
    <div
      data-testid="listfield"
      className="py-2 font-bold tracking-wide text-md "
    >
      <div className="w-full px-2 py-1 mb-2 bg-blue-200 rounded-md">
        {sdcListField.title + " - ID: " + sdcListField.id}
      </div>

      <div >
        {console.log(optionNodes)}
        {optionNodes.map(
          (optionnode) => {
            return (
              <ListFieldItem
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
                onClick={isMultiSelect ? onChangeMultiSelect : onChangeSelect}
                sdcListFieldItem={optionnode.listFieldItem}
              >
                {optionnode.listFieldItemChildren}
              </ListFieldItem>
            );
          }
        )}
      </div>
      {children}
    </div>
  );
}

export default ListField;
