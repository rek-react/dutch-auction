import { Button, Image, Typography } from "../ui";

interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center text-center gap-4">
        <Image
          className="size-40"
          src="/images/no-search-result.webp"
          alt={title}
        />
        <Typography variant="h3">{title}</Typography>
        {description && (
          <Typography className="text-caption">{description}</Typography>
        )}
        {buttonText && onButtonClick && (
          <Button variant="outlined" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
