import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { preProcessFile } from "typescript";
import { ListFieldItem } from "../ListFieldItem";

function ListField(props: { optionNodes:any[]; children?: any; sdcListField: Model.SDCListField }) {
    const [selected, setSelected] = useState<any>({});

    useEffect(() => {
        const selectedOptionsList: {[key:string] : boolean;} = {};
        props.optionNodes.forEach((optionnode:any[]) => {
            selectedOptionsList[optionnode[0].title] = false;
        })
        setSelected(selectedOptionsList);
    },[props.optionNodes]);

    const onChangeSelect = (event: any) =>{
        event.stopPropagation()    
        const selectedOptionsList:{[key:string] : boolean;} = {...selected};
        for(let optionnodeKey in selectedOptionsList){
            if(event.target.value === optionnodeKey){
                selectedOptionsList[optionnodeKey] = true;
            }else{
                selectedOptionsList[optionnodeKey] = false;
            }
        }
        setSelected(selectedOptionsList);
    }

    return (
    <div
      data-testid="listfield"
      className="py-2 text-lg font-bold tracking-wide"
    >
        <div className="px-2">
            {props.sdcListField.title} 
        </div>
        <form onChange={onChangeSelect}>
            {props.optionNodes.map((optionnode:any[]) => {
                
                return <ListFieldItem isSelected={selected[optionnode[0].title]} sdcListFieldItem={optionnode[0]}>{optionnode[1]}</ListFieldItem>
            })}
        </form>
        {props.children}
    </div>
  );
}

export default ListField;
