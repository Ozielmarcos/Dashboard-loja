import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  adornment?: React.ReactElement;
  rightAdornment?: React.ReactElement;
  text?: string;
}

const cloneAdornment = (adornment: React.ReactElement, error?: boolean) => {
  const props = adornment.props;
  const element = React.cloneElement(adornment, {
    size: '22',
    color: error ? '#D92D20' : props.color ?? '#9B9178',
  });
  return element;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const PrimitiveInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex max-h-10 w-full text-gray-700 font-normal box-border text-sm rounded-md border border-input bg-transparent px-4 py-4 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-blue-300 focus-visible:ring-ring data-[error=true]:ring-1 ring-error-600 disabled:bg-gray-100 placeholder:text-gray-400',
          className
        )}
        ref={ref}
        data-error={error}
        {...props}
      />
    );
  }
);

PrimitiveInput.displayName = 'PrimitiveInput';

const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, adornment, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const Adornment = adornment ? cloneAdornment(adornment, props.error) : null;

    const toggleShow = () => {
      setShow((prev) => !prev);
    };

    return (
      <div className="relative">
        {Adornment && (
          <span className="absolute left-4 top-2/4 translate-y-[-50%]">
            {Adornment}
          </span>
        )}
        <PrimitiveInput
          autoComplete="false"
          type={show ? 'text' : 'password'}
          className={cn('pr-12', adornment ? 'pl-12' : '', className)}
          ref={ref}
          {...props}
        />
        <span className="absolute right-4 top-2/4 translate-y-[-50%]">
          <Button
            className="bg-transparent shadow-none hover:bg-slate-200"
            size={'icon'}
            variant={'ghost'}
            onClick={toggleShow}
          >
            {show ? (
              <EyeOff size={'22'} color={'#344054'} />
            ) : (
              <Eye color={'#344054'} />
            )}
          </Button>
        </span>
      </div>
    );
  }
);

Password.displayName = 'Password';

export { Input, Password };
