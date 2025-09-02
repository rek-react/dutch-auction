import { toast } from "react-toastify";

type Type = "default" | "success" | "error" | "info" | "warn";

export const notify = (message: string, type: Type = "default") => {
  const id = message;

  const options = {
    toastId: id,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
  }
};
