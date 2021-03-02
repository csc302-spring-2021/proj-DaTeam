import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { preProcessFile } from "typescript";
import { ListFieldItem } from "../ListFieldItem";

function ListField(props: { optionNodes:any[]; children?: any; sdcListField: Model.SDCListField }) {
    const [selected, setSelected] = useState<any>({});
    const [numSelected, setNumSelected] = useState<number>(0);
    const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);

    useEffect(() => {
        const selectedOptionsList: {[key:string] : boolean;} = {};
        props.optionNodes.forEach((optionnode:any[]) => {
            selectedOptionsList[optionnode[0].title] = false;
        })

        if(props.sdcListField.maxSelections !== 1){
            setIsMultiSelect(true);
        }
        setIsMultiSelect(true);

        setSelected(selectedOptionsList);
    },[props.optionNodes]);

    const onChangeSelect = (event: any) =>{
        event.stopPropagation() ;   
        const selectedOptionsList:{[key:string] : boolean;} = {...selected};
        for(let optionnodeKey in selectedOptionsList){
            if(event.target.value === optionnodeKey){
                selectedOptionsList[optionnodeKey] = true;
                if(numSelected === 0){
                    setNumSelected(1);
                }
            }else{
                selectedOptionsList[optionnodeKey] = false;
            }
        }
        setSelected(selectedOptionsList);
    }

    const onChangeMultiSelect = (event: any) => {
        event.stopPropagation();
        const selectedOptionsList:{[key:string] : boolean;} = {...selected};
        if(numSelected >= props.sdcListField.maxSelections){
            selectedOptionsList[event.target.value] = false;
        }else{
            selectedOptionsList[event.target.value] = event.target.checked;
            const currentNumberSelect = event.target.checked ? numSelected + 1 : numSelected - 1;
            setNumSelected(currentNumberSelect);
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
        <form onChange={isMultiSelect ? onChangeMultiSelect : onChangeSelect}>
            {props.optionNodes.map((optionnode:any[]) => {
                return <ListFieldItem isMultiSelect={isMultiSelect} isSelected={selected[optionnode[0].title]} sdcListFieldItem={optionnode[0]}>{optionnode[1]}</ListFieldItem>
            })}
        </form>
        {props.children}
    </div>
  );
}

export default ListField;
