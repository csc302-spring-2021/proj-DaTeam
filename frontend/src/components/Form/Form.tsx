import { useEffect, useState } from "react";
import { SDCNode, Patient } from "@dateam/shared";
import FormService from "../../services/FormService";

function RenderNode(sdcnode: SDCNode | null | undefined) {
  if (sdcnode == null || sdcnode === undefined) {
    return;
  }

  return (
    <>
      {/*SDCnode processing for react rendering*/}
      {sdcnode.children.map((childnode, i) => {
        return (
          <div key={i} className="mx-4">
            {RenderNode(childnode)}
          </div>
        );
      })}
    </>
  );
}

function Form() {
  const [form, setForm] = useState<SDCNode | null | undefined>();
  const [patient, setPatient] = useState<Patient | null | undefined>();

  useEffect(() => {
    FormService.mockRead().then((sdcform) => {
      setForm(sdcform);
    });
  }, []);

  return (
    <div data-testid="form" className="relative">
      <div
        data-testid="form-title"
        className="px-8 py-8 text-3xl leading-relaxed text-left"
      >
        <div className="font-normal">
          Response for <p className="inline font-bold">{form?.title}</p> for{" "}
          <p className="inline font-bold">{"Arnav Verma"}</p>
        </div>
      </div>
      <div data-testid="input-form-patientid" className="px-8 pb-8">
        <label className="text-sm font-bold">OHIP NUMBER:</label>
        <div className="py-2">
          <input
            id="ohipnumber"
            type="text"
            placeholder="ex. 1234123123YM"
            className="block w-full px-3 py-3 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div data-testid="input-form-patientname" className="px-8 pb-8">
        <label className="text-sm font-bold">PAITIENT NAME:</label>
        <div className="py-2">
          <input
            id="patientname"
            type="text"
            placeholder="ex. Arnav Verma"
            className="block w-full px-3 py-3 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {/*RenderNode(form)*/}
    </div>
  );
}

export default Form;
