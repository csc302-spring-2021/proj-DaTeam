import { motion } from "framer-motion";
import { Route, useParams } from "react-router";
import { Link } from "react-router-dom";

import { pageVariants } from "../../App";
import { FormRenderer } from "../../components/FormRenderer";
import { CloseButton } from "../../components/CloseButton";
import FormsPanel from "./FormsPanel";
import ResponsesPanel from "./ResponsesPanel";
import { useForm, useFormResponse, usePatient } from "../../hooks/services";

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

function FormRendererPanel() {
  const { formId, responseId } = useParams<{
    formId: string;
    responseId: string;
  }>();
  const { data: form } = useForm(formId);
  const { data: response } = useFormResponse(responseId);
  const { data: patient } = usePatient(response?.patientID);
  console.log(form);

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

      <FormRenderer form={form} patient={patient} />
    </motion.div>
  );
}
