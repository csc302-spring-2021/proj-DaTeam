import { ChangeEvent } from "react";

interface IFormInputProps {
  type: "text" | "number";
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

function FormInput(props: IFormInputProps) {
  const valueSetter = (e: ChangeEvent<HTMLInputElement>) =>
    props.setState(e.currentTarget.value);

  return (
    <input
      value={props.state}
      onChange={valueSetter}
      type={props.type}
      placeholder={props.placeholder}
      className="w-full h-6 px-4 py-6 bg-gray-200 rounded"
    />
  );
}

export default FormInput;
