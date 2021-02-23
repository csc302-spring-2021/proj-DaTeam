import { ChangeEvent } from "react";

interface IFormInputProps {
  type: "text" | "number";
  placeholder?: string;
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
      aria-label="form-input"
      placeholder={props.placeholder}
      data-testid="form-input"
      className="w-full h-6 px-4 py-5 bg-gray-200 rounded"
    />
  );
}

export default FormInput;
