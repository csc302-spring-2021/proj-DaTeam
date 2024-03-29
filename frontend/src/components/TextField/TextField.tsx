import { Model } from "@dateam/shared";
import { useEffect, useState } from "react";
import { FormInput } from "../FormInput";

function TextField(props: {
  responseState: {
    setResponse: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    response: { [key: string]: any };
  };
  sdcTextField: Model.SDCTextField;
  children?: any;
  readOnly?: boolean;
}) {
  const { responseState, sdcTextField, readOnly = false } = props;
  const [textResponse, setTextResponse] = useState<string>("");
  useEffect(() => {
    const currentRes = responseState?.response[sdcTextField.id];
    if (typeof currentRes === "string") {
      setTextResponse(currentRes);
    } else {
      setTextResponse("");
    }
  }, [responseState]);

  return (
    <div
      data-testid="textfield"
      className="py-2 mt-2 text-lg font-bold rounded-lg"
    >
      {sdcTextField.title && sdcTextField.title + " - "}
      {"ID: " + sdcTextField.id}
      <FormInput
        placeholder={props.sdcTextField.title}
        type="text"
        state={textResponse}
        iid={props.sdcTextField.id}
        responseState={props.responseState}
        setState={setTextResponse}
        isDisabled={readOnly}
      />
      {props.children}
    </div>
  );
}
export default TextField;
