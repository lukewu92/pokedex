import { SelectHTMLAttributes } from 'react';

export const Select = ({
  className,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={`p-3 bg-slate-900 rounded w-full text-center cursor-pointer focus-within:outline ${className}`}
    {...rest}
  />
)