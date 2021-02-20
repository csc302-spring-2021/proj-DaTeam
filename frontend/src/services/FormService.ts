import { Mocks, Model } from "@dateam/shared";

/**
 * Preform a GET request to the /api/v1/form/:formId route
 *
 * @param formId An ID for the SDC form that is to be recived.
 * @returns A SDC Form Object
 */
async function read(formId: number): Promise<Model.SDCForm> {
  try {
    const formResponse = await fetch(`/api/v1/form/${formId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (formResponse.status != 201) {
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

async function mockRead(): Promise<Model.SDCForm> {
  const sdcForm: Model.SDCForm = Mocks.buildFormComplete();
  return Promise.resolve(sdcForm);
}

export default { read, mockRead };
