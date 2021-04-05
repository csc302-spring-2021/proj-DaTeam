import { motion } from "framer-motion";
import { Route } from "react-router";

import { pageVariants } from "../../App";
import FormsPanel from "../../components/FormsPanel/FormsPanel";
import StatPanel from "./StatPanel";

export default function Home() {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            data-testid="home"
            className="h-screen mx-auto overflow-hidden"
        >
            <div className="flex h-full">
                <Route
                    exact
                    path={["/home", "/home/:formId"]}
                    component={FormsHomePanel}
                />
                <Route exact path={["/home/:formId"]} component={StatPanel} />
            </div>
        </motion.div>
    );
}

function FormsHomePanel() {
    return <FormsPanel baseUri="/home" />;
}
