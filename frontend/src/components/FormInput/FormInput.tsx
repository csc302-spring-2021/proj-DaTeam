import { ChangeEvent, useEffect } from "react";

interface IFormInputProps {
  type: "text" | "number";
  placeholder?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  responseState?: {
    setResponse: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    response: { [key: string]: any };
  };
  iid?: string;
  isDisabled?: boolean;
}

function FormInput(props: IFormInputProps) {
  const valueSetter = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    props.setState(e.currentTarget.value);
    if (props.responseState && props.iid) {
      const response: { [key: string]: any } = {
        ...props.responseState.response,
      };
      if (e.currentTarget.value === "") {
        delete response[props.iid];
      } else {
        response[props.iid] = e.currentTarget.value;
      }
      props.responseState.setResponse(response);
    }
  };

  return (
    <input
      data-testid="form-input"
      value={props.state}
      onChange={valueSetter}
      type={props.type}
      placeholder={props.placeholder}
      className={props.className + " w-full h-6 px-4 py-5 bg-gray-200 rounded"}
      disabled={props.isDisabled}
    />
  );
}

export default FormInput;
