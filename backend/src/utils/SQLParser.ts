import { QueryFile, IQueryFileOptions } from "pg-promise";
import { join } from "path";

// Helper for linking to external query files;
export function parseSQL(file: string): QueryFile {
  const fullPath: string = join(__dirname, "../services/", file); // generating full path;

  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // See also property 'params' for two-step template formatting
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
