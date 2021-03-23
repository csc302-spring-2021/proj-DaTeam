import { Model } from "@dateam/shared";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { FormInput } from "../../components/FormInput";

import { useForms } from "../../hooks/services";

export default function FormsPanel() {
  const { formId } = useParams<{ formId: string }>();
  const { data: forms } = useForms();

  const [responseFormsSearch, setResponseFormsSearch] = useState("");

  const responseFormInfoBlocks = forms?.map((responseForm, i) => {
    return (
      <Link to={`/responses/${responseForm.uid}`} key={i}>
        <FormCard
          form={responseForm}
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

function FormCard({
  form,
  isSelected = false,
}: {
  form: Model.SDCForm;
  isSelected: boolean;
}) {
  return (
    <motion.div
      key={form.id}
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
        ID: {form.id}
      </span>
      <h3 className="text-lg font-medium">{form.title}</h3>
      {/* <p className="text-sm text-gray-400">X responses</p> */}
    </motion.div>
  );
}