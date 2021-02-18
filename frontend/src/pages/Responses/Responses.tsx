import { Form } from "../../components/Form";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";

function Responses() {
  return (
    <div data-testid="responses" className="h-screen mx-auto overflow-hidden">
      <div className="flex h-full">
        <ResponseForms />
        <FormResponses />
        <div className="z-0 w-full min-h-full overflow-y-auto rounded-lg shadow-2xl sm:w-1/2 lg:w-1/2 bg-gray-50">
          <Form />
        </div>
      </div>
    </div>
  );
}

function ResponseFormInfoBlock({
  responseForm,
  setSelectedId,
  selectedId,
}: {
  responseForm: { id: number; name: string; responses: number };
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  selectedId: number;
}) {
  const setSelectedResponseFormId = (id: number) => () => setSelectedId(id);
  const isSelected = selectedId === responseForm.id;
  return (
    <div
      key={responseForm.id}
      className={`h-24 py-2 px-4 mx-2 my-4 cursor-pointer ${
        isSelected
          ? "bg-black text-white"
          : "text-black bg-gray-50 hover:bg-gray-200"
      } rounded-lg`}
      onClick={setSelectedResponseFormId(responseForm.id)}
    >
      <div> {responseForm.id} </div>{" "}
    </div>
  );
}

function ResponseForms() {
  const [responseFormsSearch, setResponseFormsSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);

  const responseFormInfoArr = [
    { id: 1, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 2, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 3, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 4, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 5, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 6, name: "Pancreatic Cancer Biopsy", responses: 25 },
  ];
  const responseFormInfoBlocks = responseFormInfoArr.map((responseForm, i) => {
    return (
      <ResponseFormInfoBlock
        key={i}
        responseForm={responseForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  });

  return (
    <div className="z-20 w-1/2 w-full px-4 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <h2 className="my-4 ml-2 text-3xl font-semibold"> Choose a Form</h2>
      <h3 className="mx-2 mb-6 font-medium">
        Responses are grouped by the form they come from.
      </h3>
      <FormInput
        placeholder={"Filter by name."}
        type={"text"}
        state={responseFormsSearch}
        setState={setResponseFormsSearch}
      />
      <div className="h-full">{responseFormInfoBlocks}</div>
    </div>
  );
}

function FormResponses() {
  const [formResponseSearch, setFormResponseSearch] = useState("");
  const [selectedId, setSelectedId] = useState(2);
  const responseFormInfoArr = [
    { id: 1, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 2, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 3, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 4, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 5, name: "Pancreatic Cancer Biopsy", responses: 25 },
    { id: 6, name: "Pancreatic Cancer Biopsy", responses: 25 },
  ];
  const responseFormInfoBlocks = responseFormInfoArr.map((responseForm, i) => {
    return (
      <ResponseFormInfoBlock
        key={i}
        responseForm={responseForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  });
  return (
    <div className="z-10 w-1/2 w-full px-4 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <h2 className="my-4 ml-2 text-3xl font-medium"> Responses</h2>
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
      {responseFormInfoBlocks}
    </div>
  );
}

export default Responses;
