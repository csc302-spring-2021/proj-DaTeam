import { parseSQL } from "../../../utils/SQLParser";

const sdcFormPath = "./SDCForm/sql/"

export default {
  create: parseSQL(sdcFormPath + "create.sql"),
  add: parseSQL(sdcFormPath + "add.sql"),
};
