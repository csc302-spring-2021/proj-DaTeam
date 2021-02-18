import { Form } from "../../components/Form";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";

function Responses() {
  return (
    <div data-testid="responses" className="mx-auto">
      <div className="flex min-h-screen">
        <ResponseForms />
        <FormResponses />
        <div className="z-0 w-full p-4 overflow-y-auto rounded-lg shadow-2xl sm:w-1/2 lg:w-1/2 bg-gray-50">
          <div className="px-10 py-12 font-sans bg-white rounded-lg shadow-lg">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponseForms() {
  const [responseFormsSearch, setResponseFormsSearch] = useState("");
  return (
    <div className="z-20 w-1/2 w-full px-4 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <h2 className="my-4 ml-4 text-4xl font-semibold"> Choose a Form</h2>
      <h3 className="mx-2 mb-6 font-medium">
        {" "}
        Responses are grouped by the form they come from.
      </h3>
      <FormInput
        placeholder={"Filter by name."}
        type={"text"}
        state={responseFormsSearch}
        setState={setResponseFormsSearch}
      />
    </div>
  );
}

function FormResponses() {
  const [formResponseSearch, setFormResponseSearch] = useState("");

  return (
    <div className="z-10 w-1/2 w-full px-4 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <h2 className="my-4 ml-4 text-4xl font-semibold"> Responses</h2>
      <h3 className="mx-2 mb-6 font-medium">
        {" "}
        Responses are grouped by the form they come from.
      </h3>
      <FormInput
        placeholder={"Filter by name."}
        type={"text"}
        state={formResponseSearch}
        setState={setFormResponseSearch}
      />
    </div>
  );
}

export default Responses;
