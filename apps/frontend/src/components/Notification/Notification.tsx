import toast, { Toaster } from "react-hot-toast";

function Notification() {
  return <Toaster />;
}

export default Notification;
export const notify = toast;
