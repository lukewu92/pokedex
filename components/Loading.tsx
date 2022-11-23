import { PokeballIcon } from '@icons/pokeball';

type ILoading = React.HTMLAttributes<HTMLDivElement> & {
  overlay?: boolean
}

export const Loading = ({ overlay, className, ...rest }: ILoading) => (
  <div
    className={`mx-auto animate-pulse ${
      overlay
        ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        : ""
    }`}
    {...rest}
  >
    <PokeballIcon className="animate-bounce text-7xl" />
  </div>
)
