import { GenericJsonSerializer, Model, Query } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/procedures route
 *
 * @param procedure A procedure object to create
 *
 */
async function create(procedure: Model.Procedure): Promise<string> {
  try {
    const procedureEncoded = GenericJsonSerializer.encode(procedure, Model.Procedure);
    const procedureResponse = await fetch(`/api/v1/procedures`, {
      method: "POST",
      body: JSON.stringify(procedureEncoded),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    const procedureId = await procedureResponse.text();

    if (procedureResponse.status != 201) {
      throw Error(
        `Could not get form by ID. Error: ${procedureResponse.statusText}`
      );
    }

    return procedureId;
  } catch (err) {
    throw err;
  }
}

/**
 * Perform a GET request to the /api/v1/procedures route
 *
 *
 *
 */
 async function list(): Promise<Model.Procedure[]> {
    try {
      const proceduresResponse = await fetch(`/api/v1/procedures`, {
        method: "GET",
      });
  
      if (proceduresResponse.status != 200) {
        throw Error(
          `Could not get procedures. Error: ${proceduresResponse.statusText}`
        );
      }
      const proceduresResponseJson = await proceduresResponse.json();
      return proceduresResponseJson;
    } catch (err) {
      throw err;
    }
  }

  /**
 * Perform a GET request to the /api/v1/procedures route
 *
 * @param searchTerm
 *
 */
 async function search(searchTerm: string): Promise<Model.Procedure[]> {
    try {
    const newQuery = Query.query(
        Model.Procedure,
        Query.contains("id", searchTerm)
    );
      const proceduresEncoded = GenericJsonSerializer.encode(newQuery, Query.Query);
      const proceduresResponse = await fetch(`/api/v1/procedures/search`, {
        method: "POST",
        body: JSON.stringify(proceduresEncoded),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
      },
      });
  
      if (proceduresResponse.status != 200) {
        throw Error(
          `Could not get patients. Error: ${proceduresResponse.statusText}`
        );
      }
      const proceduresResponseJson = await proceduresResponse.json();
      return proceduresResponseJson;
    } catch (err) {
      throw err;
    }
  }
export default { create, list, search };
