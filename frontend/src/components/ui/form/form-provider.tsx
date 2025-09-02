"use client";

import { PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider as RHFForm,
  UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

interface FormProps<T extends FieldValues = FieldValues> {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: UseFormReturn<T>;
}

export function Form<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  methods,
}: PropsWithChildren<FormProps<T>>) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
}
