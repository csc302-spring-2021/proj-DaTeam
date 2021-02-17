import { useEffect, useState } from 'react';
import { buildFormComplete, SDCForm, SDCNode, Patient } from "@dateam/shared"

function RenderNode(sdcnode: SDCNode | null | undefined) {
    if (sdcnode == null || sdcnode === undefined) {
        return;
    }

    return (
        <>
            {sdcnode.id}
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
            <div data-testid="input-patientid" className="pt-10 pb-3 px-3">
                <label className="font-bold text-sm"> 
                    OHIP NUMBER: 
                </label>
                <div>
                    <input id="ohipnumber" type="text"
                        placeholder="ex. 1234123123YM"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md" />
                </div>
            </div>
            <div data-testid="input-patientname" className="py-3 px-3">
                <label className="font-bold text-sm"> 
                    PAITIENT NAME:
                </label>
                <div>
                    <input id="ohipnumber" type="text"
                        placeholder="ex. Arnav Verma"
                        className="px-3 -mx-2 w-2/5 focus:outline-none focus:ring focus:border-purple-500 border-black rounded-md" />
                </div>
            </div>
            {RenderNode(form)}
        </div>
    );
}

export default Form;
