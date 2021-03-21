import { motion } from "framer-motion";
import { useState } from "react";
import { Route, useParams } from "react-router";
import { Link } from "react-router-dom";

import { pageVariants } from "../../App";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";
import { CloseButton } from "../../components/CloseButton";
import { useFormResponses, useForms, usePatient } from "../../hooks/services";
import { Model } from "@dateam/shared";

export default function Responses() {
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
        <Route
          exact
          path={[
            "/responses",
            "/responses/:formId",
            "/responses/:formId/:responseId",
          ]}
          component={FormsPanel}
        />
        <Route
          exact
          path={["/responses/:formId", "/responses/:formId/:responseId"]}
          component={ResponsesPanel}
        />
        <Route
          exact
          path={["/responses/:formId/:responseId"]}
          component={FormRendererPanel}
        />
      </div>
    </motion.div>
  );
}

function FormCard({
  responseForm,
  isSelected = false,
}: {
  responseForm: Model.SDCForm;
  isSelected: boolean;
}) {
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
    >
      <span
        className={`text-xs ${isSelected ? "text-gray-400" : "text-gray-500"}`}
      >
        ID: {responseForm.id}
      </span>
      <h3 className="text-lg font-medium">{responseForm.title}</h3>
      <p className="text-sm text-gray-400">X responses</p>
    </motion.div>
  );
}

function FormsPanel() {
  const { formId } = useParams<{ formId: string }>();
  const { data: forms } = useForms();
  const [responseFormsSearch, setResponseFormsSearch] = useState("");

  const responseFormInfoBlocks = forms?.map((responseForm, i) => {
    return (
      <Link to={`/responses/${responseForm.uid}`} key={i}>
        <FormCard
          responseForm={responseForm}
          isSelected={formId === responseForm.uid}
        />
      </Link>
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
  isSelected = false,
}: {
  responseForm: Model.SDCFormResponse;
  isSelected: boolean;
}) {
  const { data: patient } = usePatient(responseForm.patientID);
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }}
      key={responseForm.uid}
      className={`p-4 cursor-pointer ${
        isSelected
          ? "bg-gray-900 text-white"
          : "text-black bg-gray-50 hover:bg-gray-200"
      } rounded-lg transition-colors`}
    >
      <span
        className={`text-xs ${isSelected ? "text-gray-400" : "text-gray-500"}`}
      >
        ID: {responseForm.uid}
      </span>
      <h3 className="text-lg font-medium">{patient?.name}</h3>
    </motion.div>
  );
}

function ResponsesPanel() {
  const { formId, responseId } = useParams<{
    formId: string;
    responseId: string;
  }>();
  const [formResponseSearch, setFormResponseSearch] = useState("");
  const { data: formResponses } = useFormResponses(formId);

  const responseFormInfoBlocks = formResponses?.map((formResponse, i) => {
    return (
      <Link
        to={`/responses/${formResponse.formId}/${formResponse.uid}`}
        key={formResponse.uid}
      >
        <ResponsesCard
          responseForm={formResponse}
          isSelected={responseId === formResponse.uid}
        />
      </Link>
    );
  });

  return (
    <motion.div
      data-testid="responses-panel"
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
      className="relative z-10 w-1/2 w-full px-6 py-12 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50"
    >
      <Link to={`/responses`}>
        <CloseButton />
      </Link>

      <div className="space-y-8">
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
      </div>
    </motion.div>
  );
}

function FormRendererPanel() {
  const { formId } = useParams<{ formId: string }>();
  return (
    <motion.div
      data-testid="form-renderer-panel"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0, transition: { ease: "easeInOut" } }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-full overflow-y-auto rounded-lg shadow-2xl sm:w-1/2 lg:w-1/2 bg-gray-50"
    >
      <Link to={`/responses/${formId}`}>
        <CloseButton />
      </Link>

      <Form />
    </motion.div>
  );
}
