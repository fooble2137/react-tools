import { cn } from "#/lib/cn";

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-gray-200 rounded-md px-2 py-1 border-2 border-gray-200 transition-colors duration-200 text-sm",
        "focus:outline-none focus:border-[#39A95C]",
        "placeholder:text-gray-400 placeholder:text-sm",
        props.className,
      )}
    />
  );
};

export default Input;
