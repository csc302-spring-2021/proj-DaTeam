import { motion } from "framer-motion";
import { useParams } from "react-router";

import { FormRenderer } from "../../components/FormRenderer";

import { useForm, useFormResponse, usePatient } from "../../hooks/services";

export function ResponseReadOnly() {
  const { formId, responseId } = useParams<{
    formId: string;
    responseId: string;
  }>();
  const { data: form } = useForm(formId);
  const { data: response } = useFormResponse(responseId);
  const { data: patient } = usePatient(response?.patientID);

  return (
    <motion.div
      data-testid="form-renderer-panel"
      className="relative w-full mx-auto rounded-lg sm:w-1/2 lg:w-1/2 bg-gray-50"
    >
      {form && (
        <div className="">
          <FormRenderer
            key={formId + responseId}
            form={form}
            patient={patient}
            sdcResponse={response}
            readOnly={true}
          />
        </div>
      )}
    </motion.div>
  );
}
