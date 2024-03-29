import {
  FormResponseValidator,
  GenericJsonSerializer,
  Model,
} from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/responses route
 * Adds a response to the database
 * @param response
 *
 */
async function create(
  response: Model.SDCFormResponse,
  form: Model.SDCForm
): Promise<string> {
  const errors = FormResponseValidator.validate(response, form);
  if (errors.length > 0) {
    throw Error(`Form is invalid, Error: ${errors[0]}`);
  }
  const responseDecoded = GenericJsonSerializer.encode(
    response,
    Model.SDCFormResponse
  );

  const responseFetch = await fetch(`/api/v1/responses`, {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseDecoded),
  });
  if (responseFetch.status != 201) {
    throw Error(`Could not get parser. Error: ${responseFetch.statusText}`);
  }
  const responseId = await responseFetch.text();
  return responseId;
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
