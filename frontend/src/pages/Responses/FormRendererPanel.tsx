import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { FormRenderer } from "../../components/FormRenderer";
import { CloseButton } from "../../components/CloseButton";

import { useForm, useFormResponse, usePatient } from "../../hooks/services";

export default function FormRendererPanel() {
  const { formId, responseId } = useParams<{
    formId: string;
    responseId: string;
  }>();
  const { data: form } = useForm(formId);
  const { data: response } = useFormResponse(responseId);
  const { data: patient } = usePatient(response?.patientID);
  console.log(response);

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

      {form && (
        <FormRenderer form={form} patient={patient} sdcResponse={response} />
      )}
    </motion.div>
  );
}
