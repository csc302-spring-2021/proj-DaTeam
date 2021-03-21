import { Model } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/responses route
 * Adds a response to the database
 * @param response
 * 
 */
async function create(response: Model.SDCFormResponse): Promise<void> {
    const parserResponse = await fetch(`/api/v1/patients`, {
      method: "POST",
      body: JSON.stringify(response),
    });
    if (parserResponse.status != 200) {
      throw Error(
        `Could not get parser. Error: ${parserResponse.statusText}`
      );
    }
}


export default { create };