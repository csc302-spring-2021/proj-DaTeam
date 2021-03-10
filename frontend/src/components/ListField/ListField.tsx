import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { ListFieldItem } from "../ListFieldItem";

function ListField(props: {
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
}) {
  const [numSelected, setNumSelected] = useState<number>(0);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);

  useEffect(() => {
    if (props.sdcListField.maxSelections !== 1) {
      setIsMultiSelect(true);
    }
  }, [props.optionNodes]);

  const onChangeSelect = (event: any) => {
    event.stopPropagation();
    const response: { [key: string]: any } = {
      ...props.responseState.response,
    };
    if (numSelected === 0) {
      setNumSelected(1);
    }
    response[props.sdcListField.id] = [event.target.id];
    props.responseState.setResponse(response);
  };

  const onChangeMultiSelect = (event: any) => {
    event.stopPropagation();
    if (
      event.target.checked &&
      numSelected >= props.sdcListField.maxSelections + 5
    ) {
      event.target.checked = false;
    } else {
      const response: { [key: string]: any } = {
        ...props.responseState.response,
      };
      if (response[props.sdcListField.id] === undefined) {
        response[props.sdcListField.id] = [];
      }
      let index = response[props.sdcListField.id].indexOf(event.target.id);
      if (event.target.checked && index === -1) {
        response[props.sdcListField.id].push(event.target.id);
        setNumSelected(numSelected + 1);
      } else if (!event.target.checked && index !== -1) {
        response[props.sdcListField.id].splice(index, 1);
        setNumSelected(numSelected - 1);
      }
      props.responseState.setResponse(response);
    }
  };

  return (
    <div
      data-testid="listfield"
      className="py-2 text-lg font-bold tracking-wide"
    >
      <div className="px-2">{props.sdcListField.id}</div>
      <div onChange={isMultiSelect ? onChangeMultiSelect : onChangeSelect}>
        {props.optionNodes.map(
          (optionnode: {
            listFieldItem: Model.SDCListFieldItem;
            listFieldItemChildren: any[];
          }) => {
            return (
              <ListFieldItem
                key={optionnode.listFieldItem.id}
                responseState={props.responseState}
                isMultiSelect={isMultiSelect}
                isSelected={
                  props.responseState.response[props.sdcListField.id]
                    ? props.responseState.response[
                        props.sdcListField.id
                      ].indexOf(optionnode.listFieldItem.id) !== -1
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
      {props.children}
    </div>
  );
}

export default ListField;
