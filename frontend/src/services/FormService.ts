import { Model } from "@dateam/shared";

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
    const form: Model.SDCForm = await formResponse.json();
    return form;
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
    body: JSON.stringify(form)
  });
  if (formResponse.status != 200) {
    throw Error(
      `Could not get form by ID. Error: ${formResponse.statusText}`
    );
  }
}

export default { read, create };
