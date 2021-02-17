import {Form} from "../../components/Form"

function Responses() {
  return (
    <div data-testid="responses" className="mx-auto px-4">
    <div className="-mx-4 flex h-screen">
      <div className="z-20 overflow-y-auto w-full p-4 sm:w-1/2 lg:w-1/4 bg-gray-50 rounded-lg shadow-2xl">
        <div className=" px-10 py-12 bg-white rounded-lg shadow-lg text-center text-2xl font-sans ">
            Temporary "Choose a Form" Component
        </div>
      </div>
      <div className="z-10 overflow-y-auto w-full p-4 sm:w-1/2 lg:w-1/4 bg-gray-50 rounded-lg shadow-2xl">
        <div className="px-10 py-12 bg-white rounded-lg shadow-lg text-center text-2xl font-sans">
            Temporary "Response" Component
        </div>
      </div>
      <div className="z-0 overflow-y-auto w-full p-4 sm:w-1/2 lg:w-1/2 bg-gray-50 rounded-lg shadow-2xl">
        <div className="px-10 py-12 bg-white rounded-lg shadow-lg font-sans">
        <Form/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Responses;
