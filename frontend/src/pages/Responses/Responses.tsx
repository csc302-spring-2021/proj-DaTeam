import { Form } from "../../components/Form";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";

function Responses() {
  return (
    <div data-testid="responses" className="h-screen mx-auto overflow-hidden">
      <div className="flex h-full">
        <FormsPanel />
        <ResponsesPanel />
        <div className="z-0 w-full min-h-full overflow-y-auto rounded-lg shadow-2xl sm:w-1/2 lg:w-1/2 bg-gray-50">
          <Form />
        </div>
      </div>
    </div>
  );
}

function ResponsesCard({
  responseForm,
  setSelectedId,
  selectedId,
}: {
  responseForm: { id: number; name: string };
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  selectedId: number;
}) {
  const setSelectedResponseFormId = (id: number) => () => setSelectedId(id);
  const isSelected = selectedId === responseForm.id;
  return (
    <div
      key={responseForm.id}
      className={`p-4 cursor-pointer ${
        isSelected
          ? "bg-gray-900 text-white"
          : "text-black bg-gray-50 hover:bg-gray-200"
      } rounded-lg transition-colors`}
      onClick={setSelectedResponseFormId(responseForm.id)}
    >
      <span
        className={`text-xs ${isSelected ? "text-gray-400" : "text-gray-500"}`}
      >
        ID: {responseForm.id}
      </span>
      <h3 className="text-lg font-medium">{responseForm.name}</h3>
    </div>
  );
}

function FormCard({
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
      className={`p-4 cursor-pointer ${
        isSelected
          ? "bg-gray-900 text-white"
          : "text-black bg-gray-50 hover:bg-gray-200"
      } rounded-lg transition-colors`}
      onClick={setSelectedResponseFormId(responseForm.id)}
    >
      <span
        className={`text-xs ${isSelected ? "text-gray-400" : "text-gray-500"}`}
      >
        ID: {responseForm.id}
      </span>
      <h3 className="text-lg font-medium">{responseForm.name}</h3>
      <p className="text-sm text-gray-400">X responses</p>
    </div>
  );
}

function FormsPanel() {
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
      <FormCard
        key={i}
        responseForm={responseForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  });

  return (
    <div className="z-20 w-1/2 w-full px-6 py-12 space-y-8 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <div className="space-y-2">
        <h2 className="text-3xl font-medium tracking-tighter">Choose a Form</h2>
        <p className="text-gray-600">
          Responses are grouped by the form they come from.
        </p>
      </div>
      <FormInput
        placeholder="Filter by name."
        type="text"
        state={responseFormsSearch}
        setState={setResponseFormsSearch}
      />
      <div className="space-y-4">{responseFormInfoBlocks}</div>
    </div>
  );
}

function ResponsesPanel() {
  const [formResponseSearch, setFormResponseSearch] = useState("");
  const [selectedId, setSelectedId] = useState(2);
  const responseFormInfoArr = [
    { id: 1, name: "Arnav" },
    { id: 2, name: "Umar" },
    { id: 3, name: "Vinay" },
    { id: 4, name: "Jin" },
  ];
  const responseFormInfoBlocks = responseFormInfoArr.map((responseForm, i) => {
    return (
      <ResponsesCard
        key={i}
        responseForm={responseForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  });

  return (
    <div className="z-10 w-1/2 w-full px-6 py-12 space-y-8 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50">
      <div className="space-y-2">
        <h2 className="text-3xl font-medium tracking-tighter">Responses</h2>
        <p className="text-gray-600">
          Responses are grouped by the form they come from.
        </p>
      </div>
      <FormInput
        placeholder="Filter by name."
        type="text"
        state={formResponseSearch}
        setState={setFormResponseSearch}
      />
      <div className="space-y-4">{responseFormInfoBlocks}</div>
    </div>
  );
}

export default Responses;
