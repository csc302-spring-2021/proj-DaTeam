import { motion } from "framer-motion";
import { Route } from "react-router";

import { pageVariants } from "../../App";
import FormsPanel from "../../components/FormsPanel/FormsPanel";
import ResponsesPanel from "./ResponsesPanel";
import FormRendererPanel from "./FormRendererPanel";
import NewFormResponsePanel from "./NewFormResponsePanel";

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
            "/responses/manage",
            "/responses/manage/:formId",
            "/responses/manage/:formId/new",
            "/responses/manage/:formId/response/:responseId",
          ]}
          component={FormsResponsePanel}
        />
        <Route
          exact
          path={[
            "/responses/manage/:formId",
            "/responses/manage/:formId/new",
            "/responses/manage/:formId/response/:responseId",
          ]}
          component={ResponsesPanel}
        />
        <Route
          exact
          path="/responses/manage/:formId/new"
          component={NewFormResponsePanel}
        />
        <Route
          exact
          path="/responses/manage/:formId/response/:responseId"
          component={FormRendererPanel}
        />
      </div>
    </motion.div>
  );
}

function FormsResponsePanel() {
  return (
    <FormsPanel
      title="Manage Forms"
      subtext="Lists all uploaded forms."
      baseUri="/responses/manage"
    />
  );
}
