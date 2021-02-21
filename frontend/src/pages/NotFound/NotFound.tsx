import { motion } from "framer-motion";
import { pageVariants } from "../../App";

function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    ></motion.div>
  );
}

export default NotFound;
