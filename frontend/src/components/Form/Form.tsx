import { Children, useEffect, useState, ReactNode } from "react";
import { Model } from "@dateam/shared";
import { Section } from "../../components/Section";
import { DisplayItem } from "../../components/DisplayItem";
import FormService from "../../services/FormService";
import { notify } from "../Notification/Notification";
import { NotFound } from "../../pages/NotFound";

interface IMockPrivateClass {
  __class?: "SDCSection" | "SDCDisplayItem" | "SDCTextField" | "SDCListField";
}

function RenderNode(sdcnode: Model.SDCNode & IMockPrivateClass): ReactNode {
  const childNodes = sdcnode.children.map((childnode, i) => {
    return <div key={childnode.id}>{RenderNode(childnode)}</div>;
  });
  switch (sdcnode.__class) {
    case "SDCSection":
      return <Section sdcSection={sdcnode}>{childNodes}</Section>;
    case "SDCDisplayItem":
      return <DisplayItem sdcDisplayitem={sdcnode} />;
    case "SDCTextField":
      return (
        <div>
          <label data-testid={"question-" + sdcnode.id}>{sdcnode.title}</label>
          <div className="py-2">
            <input
              type="text"
              className="block w-full px-3 py-3 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {childNodes}
        </div>
      );
    case "SDCListField":
      return <>{childNodes}</>;
    default:
      return <>{childNodes}</>;
  }
}

function Form() {
  const [sdcform, setSdcform] = useState<Model.SDCNode | undefined>(undefined);
  const [patient, setPatient] = useState<Model.Patient | undefined>(undefined);

  useEffect(() => {
    FormService.read(123)
      .then((sdcform) => {
        setSdcform(sdcform);
        /* Remove to use actual patient */
        const patient = new Model.Patient({});
        patient.id = "111";
        patient.name = "Arnav Verma";
        patient.uid = "testuuid";
        setPatient(patient);
      })
      .catch((err) => notify.error(err));
  }, []);

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
          <ValueBlock id="patientid" value={sdcform.id} label="OHIP number" />
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
      {console.log("render", RenderNode(sdcform))}
    </div>
  );
}

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
      <label className="text-lg font-bold tracking-wide uppercase">
        {label}:
      </label>
      <div
        id={id}
        className="block w-full px-3 py-2 my-1 text-xl bg-gray-200 border-gray-300 rounded"
      >
        {value}
      </div>
    </>
  );
}

export default Form;
