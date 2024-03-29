import { useQuery } from "react-query";
import FormService from "../services/FormService";
import PatientService from "../services/PatientService";
import ResponseService from "../services/ResponseService";
import ProcedureService from "../services/ProcedureService";

export function usePatient(id?: string) {
  const { isLoading, error, data } = useQuery(
    ["patients", id],
    () => PatientService.read(id!),
    {
      enabled: Boolean(id),
    }
  );
  return { isLoading, error, data };
}

export function usePatients(searchTerm: string) {
  const { isLoading, error, data, refetch } = useQuery(
    ["search", "patients", searchTerm],
    () => PatientService.search(searchTerm)
  );
  return { isLoading, error, data, refetch };
}

export function useProcedures(searchTerm: string) {
  const { isLoading, error, data, refetch } = useQuery(
    ["procedures", searchTerm],
    () => ProcedureService.search(searchTerm)
  );
  return { isLoading, error, data, refetch };
}

export function useForms() {
  const { isLoading, error, data } = useQuery("forms", () =>
    FormService.list()
  );
  return { isLoading, error, data };
}

export function useForm(id?: string) {
  const { isLoading, error, data } = useQuery(
    ["forms", id],
    () => FormService.read(id!),
    {
      enabled: Boolean(id),
    }
  );
  return { isLoading, error, data };
}

export function useFormResponses(formId?: string) {
  const { isLoading, error, data } = useQuery(
    ["forms", formId, "responses"],
    () => ResponseService.list(formId!),
    {
      enabled: Boolean(formId),
    }
  );
  return { isLoading, error, data };
}

export function useFormResponse(responseId?: string) {
  const { isLoading, error, data } = useQuery(
    ["responses", responseId],
    () => ResponseService.read(responseId!),
    {
      enabled: Boolean(responseId),
    }
  );
  return { isLoading, error, data };
}
