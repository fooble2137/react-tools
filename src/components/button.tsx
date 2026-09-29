import { cn } from "#/lib/cn";
import type { Icon } from "@phosphor-icons/react";
import { type PropsWithChildren } from "react";

type ButtonProps = {
  icon: Icon;
  onClick?: () => void;
  className?: string;
} & PropsWithChildren;

const Button = ({ children, icon: Icon, onClick, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 px-4 py-2 bg-page-primary rounded-md text-white text-sm font-medium",
        "hover:bg-page-primary/90 transition-colors duration-200",
        className,
      )}
      onClick={onClick}
    >
      <Icon className="size-4" weight="duotone" aria-hidden="true" />
      {children}
    </button>
  );
};

export default Button;
