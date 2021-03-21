import { GenericJsonSerializer, Model } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/patients route
 *
 * @param patient A patient object to create
 *
 */
async function create(patient: Model.Patient): Promise<void> {
  try {
    const patientResponse = await fetch(`/api/v1/patients`, {
      method: "POST",
      body: JSON.stringify(patient),
    });

    if (patientResponse.status != 201) {
      throw Error(
        `Could not get form by ID. Error: ${patientResponse.statusText}`
      );
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Preform a POST request to the /api/v1/patients route
 *
 * @param patientID A patient's UID
 *
 */
async function read(patientID: string): Promise<Model.Patient> {
  try {
    const patientResponse = await fetch(`/api/v1/patients/${patientID}`, {
      method: "GET",
    });

    if (patientResponse.status != 200) {
      throw Error(
        `Could not get form by ID. Error: ${patientResponse.statusText}`
      );
    }
    const patientResponseJson = await patientResponse.json();
    return GenericJsonSerializer.decode(patientResponseJson, Model.Patient);
  } catch (err) {
    throw err;
  }
}

export default { create, read };
