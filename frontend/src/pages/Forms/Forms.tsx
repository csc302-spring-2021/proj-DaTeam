import { motion } from "framer-motion";
import { pageVariants } from "../../App";

function Forms() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="forms"
    >
      Forms Page
    </motion.div>
  );
}

export default Forms;
