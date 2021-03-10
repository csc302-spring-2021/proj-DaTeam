import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
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
  children?: any;
  sdcListField: Model.SDCListField;
}

function ListField(props: IListFieldProps) {
  const [numSelected, setNumSelected] = useState<number>(0);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);

  const { responseState, optionNodes, children, sdcListField } = props;

  useEffect(() => {
    if (sdcListField.maxSelections !== 1) {
      setIsMultiSelect(true);
    }
  }, [optionNodes]);

  const onChangeSelect = (event: any) => {
    event.stopPropagation();
    const response: { [key: string]: any } = {
      ...responseState.response,
    };
    if (numSelected === 0) {
      setNumSelected(1);
    }
    response[sdcListField.id] = [event.target.id];
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
      className="py-2 text-lg font-bold tracking-wide"
    >
      <div className="px-2">{sdcListField.id}</div>
      <div onChange={isMultiSelect ? onChangeMultiSelect : onChangeSelect}>
        {optionNodes.map(
          (optionnode: {
            listFieldItem: Model.SDCListFieldItem;
            listFieldItemChildren: any[];
          }) => {
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
