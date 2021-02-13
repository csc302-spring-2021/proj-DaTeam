import { parseSQL } from "../../../utils/SQLParser";

export default {
  create: parseSQL("./create.sql"),
  add: parseSQL("./add.sql"),
};
