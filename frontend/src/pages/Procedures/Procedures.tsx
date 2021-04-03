import { motion } from "framer-motion";
import { pageVariants } from "../../App";
import { Model } from "@dateam/shared";
import { useProcedures } from "../../hooks/services";
import { NewProcedureModel } from "../../components/NewProcedureModel"
import { useState } from "react";

function ProcedureTable(props: { procedures?: Model.Procedure[] }) {
    return (
        <div className="shadow border-b border-gray-200 sm:rounded-lg w-full">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr className="flex w-f">
                        <th
                            scope="col"
                            className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            NAME
            </th>
                        <th
                            scope="col"
                            className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            PROCEDURE ID
            </th>
                        <th
                            scope="col"
                            className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            SYSTEM ID
            </th>
                        <th
                            scope="col"
                            className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            ACTIONS
            </th>
                    </tr>
                </thead>
                <tbody className="bg-white w-full max-h-96 flex flex-col divide-y overflow-y-auto divide-gray-200">
                    {props.procedures?.map((procedure: Model.Procedure, i: number) => {
                        return <ProcedureRowData key={i} procedure={procedure} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}
function ProcedureRowData(props: { procedure: Model.Procedure }) {
    return (
        <tr className="flex w-full">
            <td className="px-6 py-4 w-1/4 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {props.procedure.assignedFormID}
                </p>
            </td>
            <td className="px-6 py-4 w-1/4 whitespace-nowrap">
                <p className="text-sm text-gray-900 truncate">{props.procedure.id}</p>
            </td>
            <td className="px-6 py-4 w-1/4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {props.procedure.uid}
                </span>
            </td>
            <td className="px-6 py-4 w-1/4 text-right text-sm font-medium whitespace-nowrap">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
        </a>
            </td>
        </tr>
    );
}

function Procedures() {
    const [showNewProcedureModal, setShowNewProcedureModal] = useState<boolean>(
        false
    );
    const [searchProcedures, setSearchProcedures] = useState<string>("");
    const [currentSearch, setCurrentSearch] = useState<string>("");
    const { data: procedures, refetch: proceduresRefetch } = useProcedures(
        currentSearch
    );

    const onCreateProcedureBtnClick = () => setShowNewProcedureModal(true);

    const handleSearchProceduresSubmit = (event: any) => {
        event.preventDefault();
        setCurrentSearch(searchProcedures);
    };

    return (
        <>
            {showNewProcedureModal && (
                <NewProcedureModel
                    showModal={showNewProcedureModal}
                    setShowModal={setShowNewProcedureModal}
                    refetch={proceduresRefetch}
                />
            )}
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                data-testid="procedures"
                className="relative max-w-5xl mx-auto px-8"
            >
                <div className="py-16 flex flex-col space-y-8">
                    <div>
                        <h2 className="text-3xl font-medium tracking-tighter">
                            Procedures
            </h2>
                        <p className="text-gray-600">
                            Manage procedures in the health care system
            </p>
                    </div>

                    <div className="flex justify-between align-center">
                        <form className="w-1/2" onSubmit={handleSearchProceduresSubmit}>
                            <input
                                type="text"
                                placeholder="Search Procedures"
                                className="p-10 w-full h-6 px-4 py-5 bg-gray-200 rounded tracking-tighter"
                                onChange={(event) =>
                                    setSearchProcedures(event.target.value.trim())
                                }
                            />
                        </form>
                        <button
                            onClick={onCreateProcedureBtnClick}
                            className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-800 hover:text-white text-bold font-semibold"
                        >
                            New Procedure
            </button>
                    </div>

                    <div className="relative">
                        <ProcedureTable procedures={procedures} />
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Procedures;
