import { CSSProperties, forwardRef } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { getRatio, Ratio } from "./get-ratio";

interface ImageProps extends Omit<NextImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  objectFit?: CSSProperties["objectFit"];
}

export const Image = forwardRef<HTMLSpanElement, ImageProps>(
  ({ ratio, className = "", objectFit = "cover", ...other }, ref) => {
    const hasRatio = Boolean(ratio);

    const image = (
      <NextImage
        fill
        style={{ objectFit }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...other}
      />
    );

    if (hasRatio) {
      return (
        <span
          ref={ref}
          className={`block relative overflow-hidden leading-[0] ${className}`}
          style={{ paddingTop: getRatio(ratio!) }}
        >
          {image}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={`block relative overflow-hidden leading-[0] ${className}`}
      >
        {image}
      </span>
    );
  }
);

Image.displayName = "Image";
