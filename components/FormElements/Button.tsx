import { ButtonHTMLAttributes } from 'react';

type IButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean
}

export const Button = ({ className, secondary, ...rest }: IButton) => (
  <button
    className={`mt-auto mx-auto ${
      secondary ? "border border-white text-white" : "bg-white text-black"
    } py-2 px-4 rounded hover:opacity-70 ${className}`}
    {...rest}
  />
)
