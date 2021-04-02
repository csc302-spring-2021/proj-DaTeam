import { motion } from "framer-motion";
import { pageVariants } from "../../App";
import { GenericJsonSerializer, Model, Mocks } from "@dateam/shared";
import PatientService from "../../services/PatientService";
import { useEffect, useState } from "react";

function PatientTable() {
    const [patients, setPatients] = useState<Model.Patient[]>([Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete(), Mocks.genPatientComplete()]);

    /*useEffect(() => {
        const p: Model.Patient[] = [];
        for (let i = 0; i < 2; i++) {
            console.log(i);
            p.push(Mocks.genPatientComplete());
        }
        setPatients(p);
    }, [patients]);*/

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            NAME
                                </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            PATIENT ID
                                </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SYSTEM ID
                                </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTIONS
                                </th>

                                    </tr>
                                </thead>
                                {patients.map((patient: Model.Patient, i: number) => {
                                    return <PatientRowData key={i} patient={patient} />
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
function PatientRowData(props: {
    patient: Model.Patient;
}) {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {props.patient.name}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{props.patient.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {props.patient.uid}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
            </tr>
        </tbody>
    );
}

function Patients() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            data-testid="Patients"
        >
            {PatientTable()}

        </motion.div>
    );
}

export default Patients;
