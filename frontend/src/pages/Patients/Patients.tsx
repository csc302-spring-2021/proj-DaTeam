import { motion } from "framer-motion";
import { pageVariants } from "../../App";
import { Model } from "@dateam/shared";
import { usePatients } from "../../hooks/services";
import NewPatientModel from "../Responses/NewPatientModal";
import { useState } from "react";

function PatientTable(props: { patients?: Model.Patient[] }) {
  return (
    <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              NAME
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              PATIENT ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SYSTEM ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.patients?.map((patient: Model.Patient, i: number) => {
            return <PatientRowData key={i} patient={patient} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
function PatientRowData(props: { patient: Model.Patient }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap max-w-xs">
        <p className="text-sm font-medium text-gray-900 truncate">
          {props.patient.name}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap max-w-xs">
        <p className="text-sm text-gray-900 truncate">{props.patient.id}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {props.patient.uid}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
}

function Patients() {
  const [showNewPatientModal, setShowNewPatientModal] = useState<boolean>(
    false
  );
  const [searchPatients, setSearchPatients] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const { data: patients, refetch: patientsRefetch } = usePatients(
    currentSearch
  );

  const onCreatePatientBtnClick = () => setShowNewPatientModal(true);

  const handleSearchPatientsSubmit = (event: any) => {
    event.preventDefault();
    setCurrentSearch(searchPatients);
  };

  return (
    <>
      {showNewPatientModal && (
        <NewPatientModel
          showModal={showNewPatientModal}
          setShowModal={setShowNewPatientModal}
          refetch={patientsRefetch}
          goToRespones={false}
        />
      )}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        data-testid="Patients"
        className="relative max-w-5xl mx-auto px-8"
      >
        <div className="py-16 flex flex-col space-y-8">
          <div>
            <h2 className="text-3xl font-medium tracking-tighter">
              Patient Directory
            </h2>
            <p className="text-gray-600">
              Manage Patients in the health care system
            </p>
          </div>

          <div className="flex justify-between align-center">
            <form className="w-1/2" onSubmit={handleSearchPatientsSubmit}>
              <input
                type="text"
                placeholder="Search Patients"
                className="p-10 w-full h-6 px-4 py-5 bg-gray-200 rounded tracking-tighter"
                onChange={(event) =>
                  setSearchPatients(event.target.value.trim())
                }
              />
            </form>
            <button
              onClick={onCreatePatientBtnClick}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-800 hover:text-white text-bold font-semibold"
            >
              New Patient
            </button>
          </div>

          <div className="relative">
            <PatientTable patients={patients} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Patients;
