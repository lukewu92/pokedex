import { OptionHTMLAttributes } from 'react';

export const Option = ({
  className,
  ...rest
}: OptionHTMLAttributes<HTMLOptionElement>) => (
  <option className={`te`} {...rest} />
)
