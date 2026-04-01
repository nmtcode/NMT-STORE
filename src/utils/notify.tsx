// utils/notify.ts
import toast from "react-hot-toast";
import MyToast from "../components/ui/Toast";
export const notify = (message: string, type: "success" | "error" | "info" = "success") => {
  toast.custom((t) => <MyToast t={t} message={message} type={type} />, {
    duration: 4000, 
    position: "bottom-right",
  });
};