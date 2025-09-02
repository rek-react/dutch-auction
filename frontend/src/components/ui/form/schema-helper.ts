import dayjs from "dayjs";
import { RawCreateParams, z as zod, ZodTypeAny } from "zod";

// ----------------------------------------------------------------------

type RawCreateParamsProps = RawCreateParams & {
  isValid?: (data: string) => boolean;
  min?: number;
  max?: number;
  allowedTypes?: string[];
  minFiles?: number;
};

export const schemaHelper = {
  phoneNumber: (props: RawCreateParamsProps) =>
    zod
      .string({
        required_error: props?.required_error ?? "Phone number is required!",
        invalid_type_error:
          props?.invalid_type_error ?? "Invalid phone number!",
      })
      .min(1, { message: props?.message ?? "Phone number is required!" })
      .refine((data) => props?.isValid?.(data) ?? true, {
        message: props?.invalid_type_error ?? "Invalid phone number!",
      }),

  date: (props: RawCreateParamsProps) =>
    zod.coerce
      .date()
      .nullable()
      .transform((dateString, ctx) => {
        if (!dateString) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: props?.message ?? "Date is required!",
          });
          return null;
        }

        const date = dayjs(dateString).toDate();
        if (!dayjs(date).isValid()) {
          ctx.addIssue({
            code: zod.ZodIssueCode.invalid_date,
            message: props?.invalid_type_error ?? "Invalid Date!",
          });
          return null;
        }

        return date;
      })
      .pipe(zod.union([zod.date(), zod.null()])),

  editor: (props: RawCreateParamsProps) =>
    zod.string().min(8, { message: props?.message ?? "Content is required!" }),

  nullableInput: <T extends ZodTypeAny>(
    schema: T,
    options: RawCreateParamsProps
  ) =>
    schema.nullable().transform((val, ctx) => {
      if (val === null || val === undefined) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: options?.message ?? "Field cannot be null!",
        });
      }
      return val;
    }),

  boolean: (props: RawCreateParamsProps) =>
    zod.boolean({ coerce: true }).refine((val) => val === true, {
      message: props?.message ?? "Field is required!",
    }),

  sliderRange: (props: RawCreateParamsProps) =>
    zod
      .array(zod.number())
      .refine(
        (data) =>
          data.length === 2 &&
          data[0] >= (props.min ?? 0) &&
          data[1] <= (props.max ?? Infinity),
        {
          message:
            props.message ??
            `Range must be between ${props?.min} and ${props?.max}`,
        }
      ),

  file: (props: RawCreateParamsProps) =>
    zod.custom<File | string | null>().transform((data, ctx) => {
      const allowedTypes = props?.allowedTypes;

      const hasFile =
        data instanceof File || (typeof data === "string" && !!data.length);

      if (!hasFile) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message ?? "File is required!",
        });
        return null;
      }

      if (
        data instanceof File &&
        allowedTypes &&
        !allowedTypes.includes(data.type)
      ) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: `Only the following file types are allowed: ${allowedTypes.join(
            ", "
          )}`,
        });
        return null;
      }

      return data;
    }),

  files: (props: RawCreateParamsProps) =>
    zod.array(zod.custom<File | string>()).transform((data, ctx) => {
      const minFiles = props?.minFiles ?? 2;

      if (!data.length) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: props?.message ?? "Files are required!",
        });
      } else if (data.length < minFiles) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: `Must have at least ${minFiles} items!`,
        });
      }

      return data;
    }),
};
