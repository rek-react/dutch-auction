import { MdUpload } from "react-icons/md";
import { Typography } from "../typography";

export function UploadPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="text-gray-400 mx-auto">
        <MdUpload size={30} />
      </div>
      <div className="text-center">
        <Typography variant="span" className="text-blue-accent">
          Click to upload
        </Typography>{" "}
        <Typography variant="span">or drag and drop</Typography>
        <span className="text-caption text-xs inline-block">
          Only two files PNG, JPG or JPEG
        </span>
      </div>
    </div>
  );
}
