export const Label = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLLabelElement>) => (
  <label className={` leading-10`} {...rest} />
)
