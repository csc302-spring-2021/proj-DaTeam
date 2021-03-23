import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { FormInput } from "../FormInput";

function TextField(props: {
  responseState?: {
    setResponse: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    response: { [key: string]: any };
  };
  sdcTextField: Model.SDCTextField;
  children?: any;
}) {
  const { responseState, sdcTextField } = props;
  const [textResponse, setTextResponse] = useState<string>("");
  useEffect(() => {
    const currentRes = responseState?.response[sdcTextField.id];
    if (typeof currentRes === "string") {
      setTextResponse(currentRes);
    }
  }, []);

  return (
    <div
      data-testid="textfield"
      className="py-2 mt-2 text-lg font-bold rounded-lg"
    >
      {props.sdcTextField.title}
      <FormInput
        placeholder={props.sdcTextField.title}
        type="text"
        state={textResponse}
        iid={props.sdcTextField.id}
        responseState={props.responseState}
        setState={setTextResponse}
      />
      {props.children}
    </div>
  );
}
export default TextField;
