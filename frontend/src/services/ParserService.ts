/**
 * Preform a POST request to the /api/v1/forms/parser route
 * This converts an XML file to a JSON parsed object
 * @param file
 * 
 */
async function parse(file: any): Promise<void> {
    const parserResponse = await fetch(`/api/v1/forms/parse`, {
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
}


export default { parse };