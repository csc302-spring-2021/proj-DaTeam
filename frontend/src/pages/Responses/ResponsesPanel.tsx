import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import { CloseButton } from "../../components/CloseButton";
import { useFormResponses, usePatient } from "../../hooks/services";
import { Model } from "@dateam/shared";

export default function ResponsesPanel() {
  const { formId, responseId } = useParams<{
    formId: string;
    responseId: string;
  }>();
  const [formResponseSearch, setFormResponseSearch] = useState("");
  const { data: formResponses } = useFormResponses(formId);

  const responseFormInfoBlocks = formResponses?.map((formResponse, i) => {
    return (
      <Link
        to={`/responses/manage/${formResponse.formId}/response/${formResponse.uid}`}
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
    <>
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
        <Link to={`/responses/manage`}>
          <CloseButton />
        </Link>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h2 className="text-3xl font-medium tracking-tighter">
                Responses
              </h2>
            </div>

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
          <div className="flex justify-end space-x-2">
            {responseId && (
              <a
                href={`/responses/view/${formId}/${responseId}`}
                rel="noreferrer"
                target="_blank"
              >
                <button className="h-8 px-4 font-semibold bg-blue-300 rounded-lg hover:bg-blue-500 hover:text-white text-bold">
                  Share Page
                </button>
              </a>
            )}
            <Link to={`/responses/manage/${formId}/new`}>
              <button className="w-20 h-8 font-semibold bg-gray-300 rounded-lg hover:bg-gray-800 hover:text-white text-bold">
                New
              </button>
            </Link>
          </div>
          <motion.div className="space-y-4">
            {responseFormInfoBlocks}
          </motion.div>
        </div>
      </motion.div>
    </>
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
