import { Model } from "@dateam/shared";
import React, { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { Modal } from "../../components/Modal";
import { notify } from "../../components/Notification/Notification";
import PatientService from "../../services/PatientService";

function NewPatientModal(props: {
    showModal: boolean;
    setShowModal: (val: boolean) => void;
}) {
    const { showModal, setShowModal } = props;
    const [patientName, setPatientName] = useState("");
    const [patientId, setPatientId] = useState("");

    const onCreateClick = () => {
        const newPatient = new Model.Patient();
        newPatient.name = patientName;
        newPatient.id = patientId;
        PatientService.create(newPatient)
            .then((res) => {
                console.log(res);
                setShowModal(!showModal);
            })
            .catch((err) => {
                notify.error(err.message);
                console.log(err);
            });
    };

    return (
        <div>
            <Modal setShowModal={setShowModal}>
                <div className="flex flex-col p-4">
                    <div className="flex space-x-8">
                        <PersonSVG />
                        <span className="flex flex-col">
                            {" "}
                            <h2 className="text-2xl font-semibold text-left">
                                Enter the patient information.
              </h2>
                            <h3 className="text-left text-gray-600">
                                Fill in the following details and hit Create.
              </h3>{" "}
                        </span>
                    </div>
                    <div className="flex flex-col mt-8 space-y-8">
                        <div className="w-1/2 space-y-2 text-left md:w-full">
                            <label className="text-lg font-bold uppercase">Full Name</label>
                            <FormInput
                                state={patientName}
                                setState={setPatientName}
                                type="text"
                                placeholder=""
                            />
                        </div>
                        <div className="flex flex-col w-1/2 space-y-2 text-left md:w-full">
                            <label className="text-lg font-bold uppercase">Patient ID</label>
                            <FormInput
                                state={patientId}
                                setState={setPatientId}
                                type="text"
                                placeholder=""
                            />
                            <label className="text-sm text-gray-600">
                                Typically this is the patient’s OHIP number.
              </label>
                        </div>
                        <button
                            onClick={onCreateClick}
                            className="w-1/2 p-3 text-white bg-gray-800 rounded-lg  md:w-full hover:bg-gray-600"
                        >
                            {" "}
              Create{" "}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function PersonSVG() {
    return (
        <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="68" height="68" rx="34" fill="#7B61FF" fillOpacity="0.15" />
            <path
                d="M34 19C35.65 19 37 20.35 37 22C37 23.65 35.65 25 34 25C32.35 25 31 23.65 31 22C31 20.35 32.35 19 34 19ZM47.5 29.5H38.5V49H35.5V40H32.5V49H29.5V29.5H20.5V26.5H47.5V29.5Z"
                fill="#7B61FF"
            />
        </svg>
    );
}

export default NewPatientModal;
