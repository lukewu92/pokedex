import { InputHTMLAttributes } from 'react';

export const Input = ({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={
      `bg-slate-900 w-full transition-all outline-0 p-3 rounded focus:outline focus:outline-2 ${className}`
    }
    {...rest}
  />
)