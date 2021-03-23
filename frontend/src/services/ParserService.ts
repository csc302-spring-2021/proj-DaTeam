import { Model, GenericJsonSerializer } from "@dateam/shared";
/**
 * Preform a POST request to the /api/v1/forms/parser route
 * This converts an XML file to a JSON parsed object
 * @param file
 * 
 */
async function parse(file: any): Promise<Model.SDCForm> {
    const parserResponse = await fetch(`/api/v1/parser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml"
      },
      body: file,
    });
    if (parserResponse.status != 200) {
      throw Error(
        `Could not get parser. Error: ${parserResponse.statusText}`
      );
    }
    const parserRes = await parserResponse.json();
    return GenericJsonSerializer.decode(parserRes, Model.SDCForm);
}

const ParserService = { parse };
export default ParserService;