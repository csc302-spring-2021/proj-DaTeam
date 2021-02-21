import { motion } from "framer-motion";
import { pageVariants } from "../../App";

function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="home"
    >
      Home Page
    </motion.div>
  );
}

export default Home;
