import { GenericJsonSerializer, Mocks, Model } from "@dateam/shared";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

import { pageVariants } from "../../App";
import { CloseButton } from "../../components/CloseButton";
import { FormInput } from "../../components/FormInput";
import { notify } from "../../components/Notification/Notification";
import { useForm, useForms } from "../../hooks/services";
import ParserService from "../../services/ParserService";
import FormService from "../../services/FormService";

export default function Forms() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="forms"
      className="h-screen mx-auto overflow-hidden"
    >
      <div className="flex h-full">
        <Route
          exact
          path={["/forms", "/forms/:formId"]}
          component={FormsPanel}
        />
        <Route exact path={["/forms/:formId"]} component={FormDetailsPanel} />
      </div>
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
      <p className="text-sm text-gray-400">X questions</p>
    </motion.div>
  );
}

function FormsPanel() {
  const { formId } = useParams<{ formId: string }>();
  const { data: forms } = useForms();
  const [responseFormsSearch, setResponseFormsSearch] = useState("");

  const formCards = forms?.map((form, i) => {
    return (
      <Link to={`/forms/${form.uid}`} key={form.uid}>
        <FormCard form={form} isSelected={formId === form.uid} />
      </Link>
    );
  });

  const handlexmlfileupload = (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    ParserService.parse(file)
      .then((form: Model.SDCForm) => {
        FormService.create(form)
          .then((createdForm) => {
            console.log(createdForm);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        notify.error(err.message);
        console.log(err);
      });
  };

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
        <div className="flex justify-between align-center">
          <h2 className="text-3xl font-medium tracking-tighter">Forms</h2>
          <label className="px-4 py-2 font-semibold rounded cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="mt-2 text-base leading-normal">Upload XML</span>
            <input
              type="file"
              className="hidden"
              accept=".xml"
              onChange={(event) => handlexmlfileupload(event)}
            />
          </label>
        </div>
        <p className="text-gray-600">
          Select a recent form or search for one to view or update it's
          structure
        </p>
      </div>
      <FormInput
        placeholder="Filter by name."
        type="text"
        state={responseFormsSearch}
        setState={setResponseFormsSearch}
      />
      <div className="space-y-4">{formCards}</div>
    </motion.div>
  );
}

function render(node: Model.SDCNode) {
  if (node instanceof Model.SDCDisplayItem) {
    return (
      <FormFieldCard
        key={node.uid}
        type="Display Item"
        title={node.title ?? "Untitled"}
      />
    );
  } else if (node instanceof Model.SDCListField) {
    return (
      <FormFieldCard
        key={node.uid}
        type="List"
        title={node.title ?? "Untitled"}
      />
    );
  } else if (node instanceof Model.SDCTextField) {
    return (
      <FormFieldCard
        key={node.uid}
        type="Text"
        title={node.title ?? "Untitled"}
      />
    );
  } else if (node instanceof Model.SDCSection) {
    return (
      <>
        <motion.h3
          key={`${node.uid}-heading`}
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }}
          className="font-medium uppercase"
        >
          {node.title}
        </motion.h3>
        <motion.div
          key={`${node.uid}-children`}
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }}
          className="pl-4 space-y-4 border-l-2 border-gray-200"
        >
          {node.children.map(render)}
        </motion.div>
      </>
    );
  }
}

function FormDetailsPanel() {
  const { formId } = useParams<{ formId: string }>();
  const [responseFormsSearch, setResponseFormsSearch] = useState("");
  const { data: sdcform } = useForm(formId);

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
      className="relative z-10 w-1/2 w-full px-6 py-12 space-y-8 overflow-y-auto rounded-lg shadow-xl lg:w-1/4 bg-gray-50"
      data-testid="structure"
    >
      <Link to="/forms">
        <CloseButton />
      </Link>

      <div className="space-y-2">
        <h2 className="text-3xl font-medium tracking-tighter">Structure</h2>
        <p className="text-gray-600">
          View or update the structure of this form.
        </p>
      </div>

      <FormInput
        placeholder="Filter fields by name"
        type="text"
        state={responseFormsSearch}
        setState={setResponseFormsSearch}
      />

      <div className="space-y-4">{sdcform && sdcform.children.map(render)}</div>
    </motion.div>
  );
}

function FormFieldCard({
  type,
  title,
  isSelected = false,
}: {
  type: string;
  title: string;
  isSelected?: boolean;
}) {
  return (
    <motion.div
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
        className={`text-xs uppercase ${
          isSelected ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {type}
      </span>
      <h3 className="text-lg font-medium">{title}</h3>
    </motion.div>
  );
}
