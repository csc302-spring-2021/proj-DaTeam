import { Model, GenericJsonSerializer } from "@dateam/shared";

/**
 * Preform a GET request to the /api/v1/forms/:formId route
 *
 * @param formId An ID for the SDC form that is to be recived.
 * @returns A SDC Form Object
 */
async function read(formId: number | string): Promise<Model.SDCForm> {
  try {
    const formResponse = await fetch(`/api/v1/forms/${formId}`, {
      method: "GET",
    });

    if (formResponse.status != 200) {
      throw Error(
        `Could not get form by ID. Error: ${formResponse.statusText}`
      );
    }
    /* TODO: Validate form response json */
    const formRes = await formResponse.json();

    return GenericJsonSerializer.decode(formRes, Model.SDCForm);
  } catch (err) {
    throw err;
  }
}

/**
 * Preform a POST request to the /api/v1/forms route
 *
 * @form A SDC Form Object
 */
async function create(form: Model.SDCForm): Promise<void> {
  const formResponse = await fetch(`/api/v1/forms/`, {
    method: "POST",
    body: GenericJsonSerializer.encode(form, Model.SDCForm),
  });
  if (formResponse.status != 200) {
    throw Error(`Could not get form by ID. Error: ${formResponse.statusText}`);
  }
}

/**
 * Preform a POST request to the /api/v1/forms route
 *
 * @form A SDC Form Object
 */
async function list(): Promise<Model.SDCForm[]> {
  const formResponseRaw = await fetch(`/api/v1/forms`, {
    method: "GET",
  });
  if (formResponseRaw.status != 200) {
    throw Error(
      `Could not get form by ID. Error: ${formResponseRaw.statusText}`
    );
  }
  const formResponse = await formResponseRaw.json();
  return formResponse.map((res: any) =>
    GenericJsonSerializer.decode(res, Model.SDCForm)
  );
}

export default { read, create, list };
