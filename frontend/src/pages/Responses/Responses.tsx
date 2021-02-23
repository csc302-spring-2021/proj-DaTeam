import { motion } from "framer-motion";
import { useState } from "react";

import { pageVariants } from "../../App";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";

export default function Responses() {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [selectedResponseId, setSelectedResponseId] = useState<number | null>(
    null
  );
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="responses"
      className="h-screen mx-auto overflow-hidden"
    >
      <div className="flex h-full">
        <FormsPanel
          selectedId={selectedFormId}
          setSelectedId={(id: number) => {
            setSelectedFormId(id);
            setSelectedResponseId(null);
          }}
        />
        {selectedFormId && (
          <ResponsesPanel
            selectedId={selectedResponseId}
            setSelectedId={setSelectedResponseId}
            onClose={() => {
              setSelectedFormId(null);
              setSelectedResponseId(null);
            }}
          />
        )}
        {selectedResponseId && (
          <FormRendererPanel onClose={() => setSelectedResponseId(null)} />
        )}
      </div>
    </motion.div>
  );
}

function FormCard({
  responseForm,
  setSelectedId,
  selectedId,
}: {
  responseForm: { id: number; name: string; responses: number };
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  selectedId: number | null;
}) {
  const setSelectedResponseFormId = (id: number) => () => setSelectedId(id);
  const isSelected = selectedId === responseForm.id;
  return (
    <motion.div
      key={responseForm.id}
      variants={{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }}
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
    </motion.div>
  );
}

function FormsPanel({
  selectedId,
  setSelectedId,
}: {
  selectedId: number | null;
  setSelectedId: any;
}) {
  const [responseFormsSearch, setResponseFormsSearch] = useState("");

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
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          x: -10,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            ease: "easeInOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 0,
        },
      }}
      className="z-20 w-1/2 w-full px-6 py-12 space-y-8 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50"
    >
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
    </motion.div>
  );
}

function ResponsesCard({
  responseForm,
  setSelectedId,
  selectedId,
}: {
  responseForm: { id: number; name: string };
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  selectedId: number | null;
}) {
  const setSelectedResponseFormId = (id: number) => () => setSelectedId(id);
  const isSelected = selectedId === responseForm.id;
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }}
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
    </motion.div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className="absolute inline-flex items-center justify-center p-2 text-gray-400 rounded-md top-2 right-2 bg-gray-50 hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={() => onClose()}
    >
      <span className="sr-only">Close</span>
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function ResponsesPanel({
  selectedId,
  setSelectedId,
  onClose,
}: {
  selectedId: number | null;
  setSelectedId: any;
  onClose: () => void;
}) {
  const [formResponseSearch, setFormResponseSearch] = useState("");
  const responseFormInfoArr = [
    { id: 1, name: "Arnav" },
    { id: 2, name: "Umar" },
    { id: 3, name: "Vinay" },
    { id: 4, name: "Jin" },
  ];
  const responseFormInfoBlocks = responseFormInfoArr.map((responseForm, i) => {
    return (
      <ResponsesCard
        key={responseForm.id}
        responseForm={responseForm}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    );
  });

  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          x: -10,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            ease: "easeInOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
      }}
      initial="initial"
      animate="animate"
      className="relative z-10 w-1/2 w-full px-6 py-12 space-y-8 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50"
    >
      <CloseButton onClose={onClose} />

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

      <motion.div className="space-y-4">{responseFormInfoBlocks}</motion.div>
    </motion.div>
  );
}

function FormRendererPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0, transition: { ease: "easeInOut" } }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-full overflow-y-auto rounded-lg shadow-2xl sm:w-1/2 lg:w-1/2 bg-gray-50"
    >
      <CloseButton onClose={onClose} />

      <Form />
    </motion.div>
  );
}
