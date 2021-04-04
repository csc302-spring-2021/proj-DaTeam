import { motion } from "framer-motion";
import { Route } from "react-router";

import { pageVariants } from "../../App";
import FormsPanel from "../../components/FormsPanel/FormsPanel";
import ResponsesPanel from "./ResponsesPanel";
import FormRendererPanel from "./FormRendererPanel";

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
          component={FormsResponsePanel}
        />
        <Route
          exact
          path={["/responses/:formId", "/responses/:formId/:responseId"]}
          component={ResponsesPanel}
        />
        <Route
          exact
          path={["/responses/:formId", "/responses/:formId/:responseId"]}
          component={FormRendererPanel}
        />
      </div>
    </motion.div>
  );
}

function FormsResponsePanel() {
  return <FormsPanel baseUri="/responses" />;
}
