import { Model } from "@dateam/shared";
import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";

export function PatientsSelect({
  patients,
  selectedPatient,
  onSelect = () => {},
  readOnly = false,
}: {
  patients: Model.Patient[];
  selectedPatient?: Model.Patient;
  onSelect?: (patientId: string) => void;
  readOnly: boolean;
}) {
  return (
    <div className="w-full max-w-xs">
      <Listbox
        as="div"
        className="space-y-1"
        value={selectedPatient?.uid}
        onChange={onSelect}
        disabled={readOnly}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
              Patient
            </Listbox.Label>
            <div className="relative">
              <span className="inline-block w-full rounded-md shadow-sm">
                <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  <span className="block truncate">
                    {selectedPatient?.name || "None"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
              >
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                  {patients.map((patient) => (
                    <Listbox.Option key={patient?.uid} value={patient?.uid}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active ? "text-white bg-blue-600" : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-8 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } block truncate`}
                          >
                            {patient?.name}
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-blue-600"
                              } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
