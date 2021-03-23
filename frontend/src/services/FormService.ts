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
async function create(form: Model.SDCForm): Promise<string> {
  console.log(GenericJsonSerializer.encode(form, Model.SDCForm));
  const encodedForm = GenericJsonSerializer.encode(form, Model.SDCForm);
  const formResponse = await fetch(`/api/v1/forms`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(encodedForm),
  });
  if (formResponse.status != 201) {
    //throw Error(`Could not get form by ID. Error: ${formResponse.statusText}`);
  }
  const id = await formResponse.text();
  console.log(id);
  return id;
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

const FormService = { read, create, list }
export default FormService;
