import { Children, useEffect, useState } from "react";
import { Model } from "@dateam/shared";
import { Section } from "../../components/Section";
import { DisplayItem } from "../../components/DisplayItem";
import FormService from "../../services/FormService";
import { notify } from "../Notification/Notification";
import { FormInput } from "../FormInput";
import { NotFound } from "../../pages/NotFound";

function RenderNode(sdcnode: Model.SDCNode | null | undefined) {
  const { SDCNode } = Model;
  if (sdcnode == null || sdcnode === undefined) {
    return;
  }

  const childNodes: React.ReactNode[] = sdcnode.children.map((childnode, i) => {
    return <div key={i}>{RenderNode(childnode)}</div>;
  });

  let rootNode: React.ReactNode | null = null;
  if (sdcnode instanceof Model.SDCSection) {
    rootNode = <Section sdcSection={sdcnode}>{childNodes}</Section>;
  } else if (sdcnode instanceof Model.SDCDisplayItem) {
    rootNode = <DisplayItem sdcDisplayitem={sdcnode} />;
  } else if (sdcnode instanceof Model.SDCTextField) {
    rootNode = (
      <div>
        {/*Remove this div and add component*/}
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
  } else if (sdcnode instanceof Model.SDCListField) {
    rootNode = (
      <>
        {/*Remove this and add component*/}
        {childNodes}
      </>
    );
  } else {
    rootNode = <>{childNodes}</>;
  }

  return <>{rootNode}</>;
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
          <ValueBlock id="patientname" value={patient.name} label="Patient Name" />
        </div>
      </div>

      {RenderNode(sdcform)}
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
