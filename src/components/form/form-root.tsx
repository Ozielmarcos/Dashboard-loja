'use client';

import {
  CriteriaMode,
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, ZodTypeDef } from 'zod';
import { FormResolver } from '@/utils/Classes';
import { FormHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type FormState = {
  isDirty: boolean;
};

interface Props<
  T extends FieldValues,
  F extends FieldValues | undefined = undefined
> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: DefaultValues<T>;
  children: React.ReactNode;
  criteriaMode?: CriteriaMode | undefined;
  mode?: 'onSubmit' | 'all' | 'onBlur' | 'onChange' | 'onTouched';
  schema?: ZodType<unknown, ZodTypeDef, unknown>;
  disabled?: boolean;
  onSubmit: (
    data: F extends FieldValues ? F : T,
    state: FormState
  ) => Promise<void> | void;
}

export default function FormRoot<
  T extends FieldValues,
  F extends FieldValues = T
>({
  initialValues,
  children,
  schema,
  onSubmit,
  mode,
  criteriaMode,
  disabled,
  className,
  ...rest
}: Props<T, F>) {
  const methods = useForm<T, unknown, F>({
    mode,
    criteriaMode,
    defaultValues: initialValues,
    disabled,
    resolver: schema
      ? zodResolver(schema, {
          errorMap: (error) => FormResolver.resolve(error),
        })
      : undefined,
  });

  const handleSubmit = async (data: F extends FieldValues ? F : T) => {
    const hasDirtyFields =
      Object.keys(methods.formState.dirtyFields).length > 0;
    await onSubmit(data, { isDirty: hasDirtyFields });
  };

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(handleSubmit as any)}
        className={cn('flex flex-col h-full', className)}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
