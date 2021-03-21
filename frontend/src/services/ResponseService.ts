import { GenericJsonSerializer, Model } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/responses route
 * Adds a response to the database
 * @param response
 *
 */
async function create(response: Model.SDCFormResponse): Promise<void> {
  const parserResponseRaw = await fetch(`/api/v1/patients`, {
    method: "POST",
    body: JSON.stringify(response),
  });
  if (parserResponseRaw.status != 200) {
    throw Error(`Could not get parser. Error: ${parserResponseRaw.statusText}`);
  }
}

/**
 * Preform a POST request to the /api/v1/responses route
 * Adds a response to the database
 * @param response
 *
 */
async function list(formId: string): Promise<Model.SDCFormResponse[]> {
  const parserResponseRaw = await fetch(`/api/v1/forms/${formId}/responses`, {
    method: "GET",
  });
  if (parserResponseRaw.status != 200) {
    throw Error(`Could not get parser. Error: ${parserResponseRaw.statusText}`);
  }
  const parserResponse = await parserResponseRaw.json();
  return parserResponse.map((res: any) =>
    GenericJsonSerializer.decode(res, Model.SDCFormResponse)
  );
}

/**
 * Preform a GET request to the /api/v1/forms/:formId route
 *
 * @param formId An ID for the SDC form that is to be recived.
 * @returns A SDC Form Object
 */
async function read(responseId: string): Promise<Model.SDCFormResponse> {
  try {
    const formResponse = await fetch(`/api/v1/responses/${responseId}`, {
      method: "GET",
    });

    if (formResponse.status != 200) {
      throw Error(
        `Could not get form by ID. Error: ${formResponse.statusText}`
      );
    }
    /* TODO: Validate form response json */
    const formRes = await formResponse.json();

    return GenericJsonSerializer.decode(formRes, Model.SDCFormResponse);
  } catch (err) {
    throw err;
  }
}

export default { create, list, read };
