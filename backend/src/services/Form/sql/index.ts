import { parseSQL } from "../../../utils/SQLParser";

const sdcFormPath = "./Form/sql/"

export default {
  create: parseSQL(sdcFormPath + "create.sql"),
  add: parseSQL(sdcFormPath + "add.sql"),
};
