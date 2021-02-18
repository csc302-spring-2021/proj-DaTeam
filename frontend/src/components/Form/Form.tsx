import { Children, useEffect, useState } from "react";
import { SDCNode, Patient } from "@dateam/shared";
import { Section } from "../../components/Section";
import FormService from "../../services/FormService";


function RenderNode(sdcnode: SDCNode | null | undefined) {
    if (sdcnode == null || sdcnode === undefined) {
        return;
    }
    console.log(sdcnode);

    const childNodes: React.ReactNode[] = sdcnode.children.map((childnode, i) => {
        return (
            <div key={i} className="mx-4">
                {RenderNode(childnode)}
            </div>
        );
    });

    let rootNode: React.ReactNode | null = null;
    switch (sdcnode.class) {
        case "SDCSection":
            rootNode = (
                <div>
                     section compo
                    {childNodes}
                </div>
            );
            break;
        case "SDCDisplayItem":
            rootNode = (
                <div>
                    display item
                    {childNodes}
                </div>
            );
            break;
        case "SDCTextField":
            rootNode = (
                <div>
                    text field
                    {childNodes}
                </div>
            );
            break;
        case "SDCListField":
            rootNode = (
                <div>
                    list field
                    {childNodes}
                </div>
            );
            break;
        default:
            rootNode = (
                <div>
                    form 
                    {childNodes}
                </div>
            );
    }

    return (
        <>
            {/*SDCnode processing for react rendering*/}
            {rootNode}
        </>
    );
}

function Form() {
    const [form, setForm] = useState<SDCNode | null | undefined>();
    const [patient, setPatient] = useState<Patient | null | undefined>();

    useEffect(() => {
        FormService.mockRead().then((sdcform) => {
            setForm(sdcform);
            console.log(sdcform);
        });
    }, []);

    return (
        <div data-testid="form" className="relative">
            <div data-testid="form-title" className="px-8 py-4 text-3xl text-left">
                <div className="inline-block">
                    Response of <p className="inline font-bold">{form?.title}</p>
                </div>
                <div className="inline-block ml-2">
                    for <p className="inline font-bold"> {"Arnav Verma"}</p>
                </div>
            </div>
            <div data-testid="input-form-patientid" className="px-8 pb-8">
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
            <div data-testid="input-form-patientname" className="px-8 pb-8">
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
            {RenderNode(form)}
        </div>
    );
}

export default Form;
