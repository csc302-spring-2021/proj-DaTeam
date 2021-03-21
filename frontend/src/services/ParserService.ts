import { Model } from "@dateam/shared";

/**
 * Preform a POST request to the /api/v1/parser route
 * This converts an XML file to a JSON parsed object
 * @param file
 * 
 */
async function parse(file: any): Promise<void> {
    const parserResponse = await fetch(`/api/v1/patients`, {
      method: "POST",
      body: file,
    });
    if (parserResponse.status != 200) {
      throw Error(
        `Could not get parser. Error: ${parserResponse.statusText}`
      );
    }
}


export default { parse };