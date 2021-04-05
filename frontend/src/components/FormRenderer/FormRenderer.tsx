import { useState, ReactNode, useEffect } from "react";
import { Model } from "@dateam/shared";
import { Section } from "../../components/Section";
import { DisplayItem } from "../../components/DisplayItem";
import { TextField } from "../../components/TextField";
import { ListField } from "../../components/ListField";
import { NotFound } from "../../pages/NotFound";
import { usePatients } from "../../hooks/services";
import PatientService from "../../services/PatientService";
import { notify } from "../Notification/Notification";
import ResponseService from "../../services/ResponseService";
import { useQueryClient } from "react-query";
import { PatientsSelect } from "./PatientsSelect";
interface IFormRendererProps {
  form?: Model.SDCForm;
  patient?: Model.Patient;
  sdcResponse?: Model.SDCFormResponse;
  readOnly?: boolean;
}

function FormRenderer(props: IFormRendererProps) {
  const {
    form: sdcform,
    patient: selectedPatient,
    sdcResponse,
    readOnly = false,
  } = props;
  const [patient, setPatient] = useState<Model.Patient>();
  const queryClient = useQueryClient();

  const { data: patients } = usePatients("");

  function handlePatientSelect(patientId: string) {
    setPatient(patients?.find((p) => p.uid === patientId));
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const patientId = urlParams.get("patient");
    if (patientId) {
      PatientService.read(patientId)
        .then((patient) => setPatient(patient))
        .catch(() => notify.error("Failed to fetch new patient."));
    } else if (selectedPatient) {
      setPatient(selectedPatient);
    }
  }, [window.location.search, selectedPatient, sdcform]);

  const [response, setResponse] = useState<{ [key: string]: any }>({});
  const BLANK_STRING = "-----";

  useEffect(() => {
    if (sdcResponse?.answers) {
      sdcResponse.answers.map((ans) => {
        const key = ans.questionID;
        const val = ans.responses ? ans.responses[0] : [];
        setResponse((r) => {
          r[key] = val;
          return r;
        });
      });
    } else {
      setResponse([]);
    }
  }, [sdcResponse]);

  const onSubmitForm = () => {
    if (!sdcform || !patient) {
      notify.error("Cannot create with a selected form or patient");
      return;
    }

    const sdcResponses = Object.keys(response).reduce((arr, key) => {
      const questionID = key;
      const res = response[key];
      if (res instanceof Array && res.length > 0) {
        arr.push(
          new Model.SDCAnswer({
            questionID,
            responses: res,
          })
        );
      } else if (typeof res === "string") {
        arr.push(
          new Model.SDCAnswer({
            questionID,
            responses: new Array(response[key]),
          })
        );
      }
      return arr;
    }, [] as Model.SDCAnswer[]);

    const formRes = new Model.SDCFormResponse({
      formId: sdcform.uid,
      patientID: patient.uid,
      answers: sdcResponses,
    });
    ResponseService.create(formRes, sdcform)
      .then((_) => {
        return queryClient.refetchQueries("forms");
      })
      .then(() => notify.success("Form Created"))
      .catch((err) => notify.error(err.message));
  };

  const RenderNode = (sdcnode: Model.SDCNode, readOnly: boolean = false) => {
    const childNodes = sdcnode.children.map((childnode) => {
      return <div key={childnode.id}>{RenderNode(childnode, readOnly)}</div>;
    });
    if (sdcnode instanceof Model.SDCSection) {
      return (
        <Section
          sdcSection={sdcnode as Model.SDCSection}
          children={childNodes}
        />
      );
    } else if (sdcnode instanceof Model.SDCDisplayItem) {
      return <DisplayItem sdcDisplayitem={sdcnode as Model.SDCDisplayItem} />;
    } else if (sdcnode instanceof Model.SDCTextField) {
      return (
        <TextField
          responseState={{ response, setResponse }}
          sdcTextField={sdcnode}
          children={childNodes}
          readOnly={readOnly}
        />
      );
    } else if (sdcnode instanceof Model.SDCListField) {
      const optionsNodes: {
        listFieldItem: Model.SDCListFieldItem;
        listFieldItemChildren: JSX.Element[];
      }[] = sdcnode.options.map((optionnode: Model.SDCListFieldItem) => {
        const optionChild = optionnode.children.map((childnode) => {
          return (
            <div key={childnode.id}>{RenderNode(childnode, readOnly)}</div>
          );
        });
        return {
          listFieldItem: optionnode,
          listFieldItemChildren: optionChild,
        };
      });

      return (
        <ListField
          responseState={{ response, setResponse }}
          sdcListField={sdcnode}
          optionNodes={optionsNodes}
          children={childNodes}
          readOnly={readOnly}
        />
      );
    } else {
      return <>{childNodes}</>;
    }
  };

  if (!sdcform) {
    return <NotFound />;
  }

  return (
    <div data-testid="form" className="p-12 space-y-8">
      <h2 data-testid="form-title" className="text-3xl tracking-tighter">
        Response of <span className="font-bold">{sdcform.title}</span> for{" "}
        <span className="font-bold"> {patient?.name || BLANK_STRING}</span>
      </h2>

      {patients && (
        <PatientsSelect
          patients={patients}
          selectedPatient={patient}
          onSelect={handlePatientSelect}
          readOnly={readOnly}
        />
      )}

      <div>{RenderNode(sdcform, readOnly)}</div>

      {!readOnly && (
        <div className="flex flex-row-reverse">
          <button
            onClick={onSubmitForm}
            className="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
          >
            <span>Submit </span>
            <svg
              className="w-8 h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default FormRenderer;
