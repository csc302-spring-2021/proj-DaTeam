import { GenericJsonSerializer, Model, Query } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/patients route
 *
 * @param patient A patient object to create
 *
 */
async function create(patient: Model.Patient): Promise<string> {
  try {
    const patientEncoded = GenericJsonSerializer.encode(patient, Model.Patient);
    const patientResponse = await fetch(`/api/v1/patients`, {
      method: "POST",
      body: JSON.stringify(patientEncoded),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    const patientId = await patientResponse.text();

    if (patientResponse.status != 201) {
      throw Error(
        `Could not get form by ID. Error: ${patientResponse.statusText}`
      );
    }

    return patientId;
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

/**
 * Perform a GET request to the /api/v1/patients route
 *
 *
 *
 */
 async function list(): Promise<Model.Patient[]> {
    try {
      const patientResponse = await fetch(`/api/v1/patients`, {
        method: "GET",
      });
  
      if (patientResponse.status != 200) {
        throw Error(
          `Could not get patients. Error: ${patientResponse.statusText}`
        );
      }
      const patientResponseJson = await patientResponse.json();
      return patientResponseJson;
    } catch (err) {
      throw err;
    }
  }

  /**
 * Perform a GET request to the /api/v1/patients route
 *
 * @param searchTerm
 *
 */
 async function search(searchTerm: string): Promise<Model.Patient[]> {
    try {
    const newQuery = Query.query(
        Model.Patient,
        Query.contains("name", searchTerm).or(
            Query.equals("id", searchTerm)
        )
    );
      const patientEncoded = GenericJsonSerializer.encode(newQuery, Query.Query);
      const patientResponse = await fetch(`/api/v1/patients/search`, {
        method: "POST",
        body: JSON.stringify(patientEncoded),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
      },
      });
  
      if (patientResponse.status != 200) {
        throw Error(
          `Could not get patients. Error: ${patientResponse.statusText}`
        );
      }
      const patientResponseJson = await patientResponse.json();
      return patientResponseJson;
    } catch (err) {
      throw err;
    }
  }
  

  

export default { create, read, list, search };
