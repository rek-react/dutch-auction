import { notify } from "./notify";

export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
  notify("Text copied successfully", "success");
};
