import { useEffect, useState } from 'react';
import { buildFormComplete, SDCForm, SDCNode, Patient } from "@dateam/shared"

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
        const sdcform: SDCForm = buildFormComplete(); // fetch data
        setForm(sdcform);
        console.log(sdcform);
    }, [])

    return (
        <div data-testid="form" className="relative">
            <div data-testid="form-title" className="px-8 py-8 text-left text-3xl leading-relaxed">
                <p className="font-normal">
                    Response for <p className="inline font-bold">{form?.title}</p> for <p className="inline font-bold">{"Arnav Verma"}</p>
                </p>   
            </div>
            <div data-testid="input-form-patientid" className="pb-8 px-8">
                <label className="font-bold text-sm">
                    OHIP NUMBER:
                </label>
                <div className="py-2">
                    <input id="ohipnumber" type="text"
                        placeholder="ex. 1234123123YM"
                        className="px-3 py-3 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded" />
                </div>
            </div>
            <div data-testid="input-form-patientname" className="pb-8 px-8">
                <label className="font-bold text-sm">
                    PAITIENT NAME:
                </label>
                <div className="py-2">
                    <input id="patientname" type="text"
                        placeholder="ex. Arnav Verma"
                        className="px-3 py-3 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded" />
                </div>
            </div>
            {/*RenderNode(form)*/}
        </div>
    );
}

export default Form;
