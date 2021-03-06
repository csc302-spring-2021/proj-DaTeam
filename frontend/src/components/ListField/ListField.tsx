import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { preProcessFile } from "typescript";
import { ListFieldItem } from "../ListFieldItem";

function ListField(props: {responseState: {setResponse:React.Dispatch<React.SetStateAction<{[key: string]: any;}>>; response:{[key: string]: any;}}; optionNodes:any[]; children?: any; sdcListField: Model.SDCListField }) {
    const [selected, setSelected] = useState<{[key:string] : boolean;}>({});
    const [numSelected, setNumSelected] = useState<number>(0);
    const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);

    useEffect(() => {
        const selectedOptionsList: {[key:string] : boolean;} = {};
        props.optionNodes.forEach((optionnode:any[]) => {
            selectedOptionsList[optionnode[0].title] = false;
            if(props.responseState.response[props.sdcListField.id] !== undefined){
                if(optionnode[0].title in props.responseState.response[props.sdcListField.id]){
                    selectedOptionsList[optionnode[0].title] = true;
                }
            }

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
                const response: {[key:string] : any;} = {...props.responseState.response};
                response[props.sdcListField.id] = [optionnodeKey];
                props.responseState.setResponse(response);
            }else{
                selectedOptionsList[optionnodeKey] = false;
            }
        }
        setSelected(selectedOptionsList);
    }

    const onChangeMultiSelect = (event: any) => {
        event.stopPropagation();
        const selectedOptionsList:{[key:string] : boolean;} = {...selected};
        if(event.target.checked && numSelected >= props.sdcListField.maxSelections + 5){
            console.log("A");
            selectedOptionsList[event.target.value] = false;
            event.target.checked = false;
        }else{
            console.log("B");

            selectedOptionsList[event.target.value] = event.target.checked;
            if(event.target.checked){
                setNumSelected( numSelected + 1);
            }else{
                setNumSelected( numSelected - 1);
            }
        }
        console.log("C");

        const response: {[key:string] : any;} = {...props.responseState.response};
        response[props.sdcListField.id] = [];
        for(let key in selectedOptionsList){
            console.log("D");
            if(selectedOptionsList[key] === true){
                console.log("E");

                response[props.sdcListField.id].push(key);
            }
        }
        if(response[props.sdcListField.id] === []){
            console.log("F");
            delete response[props.sdcListField.id];
        }
        props.responseState.setResponse(response);
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
        <div>
            {numSelected}
            <>{console.log(selected)}</>

        </div>
        <form onChange={isMultiSelect ? onChangeMultiSelect : onChangeSelect}>
            {props.optionNodes.map((optionnode:any[]) => {
                return <ListFieldItem key={optionnode[0].id} responseState={props.responseState} isMultiSelect={isMultiSelect} isSelected={selected[optionnode[0].title]} sdcListFieldItem={optionnode[0]}>{optionnode[1]}</ListFieldItem>
            })}
        </form>
        {props.children}
    </div>
  );
}

export default ListField;
