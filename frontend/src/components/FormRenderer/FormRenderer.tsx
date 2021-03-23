import { useState, ReactNode } from "react";
import { Model } from "@dateam/shared";
import { Section } from "../../components/Section";
import { DisplayItem } from "../../components/DisplayItem";
import { TextField } from "../../components/TextField";
import { ListField } from "../../components/ListField";
import { NotFound } from "../../pages/NotFound";

interface IMockPrivateClass {
  __class?: "SDCSection" | "SDCDisplayItem" | "SDCTextField" | "SDCListField";
}

function FormRenderer({
  form: sdcform,
  patient,
}: {
  form?: Model.SDCForm;
  patient?: Model.Patient;
}) {
  const [response, setResponse] = useState<{ [key: string]: any }>({});

  function RenderNode(sdcnode: Model.SDCNode & IMockPrivateClass): ReactNode {
    const childNodes = sdcnode.children.map((childnode) => {
      return <div key={childnode.id}>{RenderNode(childnode)}</div>;
    });

    if (sdcnode instanceof Model.SDCSection) {
      return (
        <Section sdcSection={sdcnode as Model.SDCSection}>{childNodes}</Section>
      );
    } else if (sdcnode instanceof Model.SDCDisplayItem) {
      return <DisplayItem sdcDisplayitem={sdcnode as Model.SDCDisplayItem} />;
    } else if (sdcnode instanceof Model.SDCTextField) {
      return (
        <>
          <TextField
            responseState={{ response, setResponse }}
            sdcTextField={sdcnode}
          >
            {childNodes}
          </TextField>
        </>
      );
    } else if (sdcnode instanceof Model.SDCListField) {
      const optionsNodes: {
        listFieldItem: Model.SDCListFieldItem;
        listFieldItemChildren: JSX.Element[];
      }[] = sdcnode.options.map((optionnode: Model.SDCListFieldItem) => {
        const optionChild = optionnode.children.map((childnode) => {
          return <div key={childnode.id}>{RenderNode(childnode)}</div>;
        });
        return {
          listFieldItem: optionnode,
          listFieldItemChildren: optionChild,
        };
      });
      return (
        <>
          <ListField
            responseState={{ response, setResponse }}
            sdcListField={sdcnode}
            optionNodes={optionsNodes}
          >
            {childNodes}
          </ListField>
        </>
      );
    } else {
      return <>{childNodes}</>;
    }
  }

  const onSubmitForm = () => {
    console.log(response);
  };

  if (!sdcform || !patient) {
    return <NotFound />;
  }

  return (
    <div data-testid="form" className="p-12 space-y-8">
      <h2 data-testid="form-title" className="text-3xl tracking-tighter">
        Response of <span className="font-bold">{sdcform?.title}</span> for{" "}
        <span className="font-bold"> {patient.name}</span>
      </h2>
      <div className="flex flex-col justify-between space-x-4 md:flex-row">
        <div className="w-1/2" data-testid="input-form-patientid">
          <ValueBlock id="patientid" value={patient.id} label="OHIP number" />
        </div>
        <div className="w-1/2" data-testid="input-form-patientname">
          <ValueBlock
            id="patientname"
            value={patient.name}
            label="Patient Name"
          />
        </div>
      </div>
      {RenderNode(sdcform)}
      <div className="flex flex-row-reverse">
        <button
          onClick={onSubmitForm}
          className="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
        >
          <span>Submit </span>
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FormRenderer;

function ValueBlock({
  value,
  id,
  label,
}: {
  value: string;
  id: string;
  label: string;
}) {
  return (
    <>
      <label className="text-lg font-bold tracking-wide">{label}:</label>
      <div
        id={id}
        className="block w-full px-3 py-2 my-1 text-xl bg-gray-200 border-gray-300 rounded"
      >
        {value}
      </div>
    </>
  );
}
