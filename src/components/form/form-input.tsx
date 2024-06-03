'use client';

import { Input, InputProps } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends InputProps {
  id?: string;
  name: string;
  transform?: (
    value: string,
    cursorPosition: number
  ) => { outputValue: string; newCursorPosition: number };
}

export default function FormInput({ id, name, transform, ...rest }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field }, fieldState }) => {
        return (
          <Input
            id={id}
            error={!!fieldState.error?.message}
            onChange={(e) => {
              const value = e.target.value;
              if (transform) {
                const { outputValue, newCursorPosition } = transform(
                  value,
                  e.target.selectionStart || 0
                );
                e.target.value = outputValue;
                e.target.selectionEnd = newCursorPosition;
              }
              onChange(e);
            }}
            {...field}
            {...rest}
          />
        );
      }}
    />
  );
}
