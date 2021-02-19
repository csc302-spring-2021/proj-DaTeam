import { Children, useEffect, useState } from "react";
import { SDCNode, Patient } from "@dateam/shared";
import { Section } from "../../components/Section";
import { DisplayItem } from "../../components/DisplayItem";
import FormService from "../../services/FormService";

function RenderNode(sdcnode: SDCNode | null | undefined) {
  if (sdcnode == null || sdcnode === undefined) {
    return;
  }

  const childNodes: React.ReactNode[] = sdcnode.children.map((childnode, i) => {
    return <div key={i}>{RenderNode(childnode)}</div>;
  });

  let rootNode: React.ReactNode | null = null;
  switch (sdcnode.class) {
    case "SDCSection":
      rootNode = <Section sdcSection={sdcnode}>{childNodes}</Section>;
      break;
    case "SDCDisplayItem":
      rootNode = <DisplayItem sdcDisplayitem={sdcnode} />;
      break;
    case "SDCTextField":
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
      break;
    case "SDCListField":
      rootNode = (
        <>
          {/*Remove this and add component*/}
          {childNodes}
        </>
      );
      break;
    default:
      rootNode = <>{childNodes}</>;
  }

  return <>{rootNode}</>;
}

function Form() {
  const [sdcform, setSdcform] = useState<SDCNode | null | undefined>();
  const [patient, setPatient] = useState<Patient | null | undefined>();

  useEffect(() => {
    FormService.mockRead().then((sdcform) => {
        setSdcform(sdcform);
    });
  }, []);

  return (
    <div data-testid="form" className="relative p-12 space-y-8">
      <h2 data-testid="form-title" className="text-3xl tracking-tighter">
        Response of <span className="font-bold">{sdcform?.title}</span> for{" "}
        <span className="font-bold"> {"Arnav Verma"}</span>
      </h2>

      <div data-testid="input-form-patientid">
        <label className="font-bold">OHIP NUMBER:</label>
        <div className="py-2">
          <input
            id="ohipnumber"
            type="text"
            placeholder="ex. 1234123123YM"
            className="block w-full px-3 py-3 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div data-testid="input-form-patientname">
        <label className="font-bold">PAITIENT NAME:</label>
        <div className="py-2">
          <input
            id="patientname"
            type="text"
            placeholder="ex. Arnav Verma"
            className="block w-full px-3 py-3 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {RenderNode(sdcform)}
    </div>
  );
}

export default Form;
