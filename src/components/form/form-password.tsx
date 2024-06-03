'use client';

import { InputProps, Password } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends InputProps {
  id?: string;
  name: string;
}

export default function FormPassword({ id, name, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Password
            id={id}
            error={!!fieldState.error?.message}
            {...field}
            {...rest}
          />
        );
      }}
    />
  );
}
