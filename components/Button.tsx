import { ComponentType } from "react";

type ButtonType = {
  label: string;
  variant?: string;
  className?: string;
  onClick: () => void;
};

const Button: ComponentType<ButtonType> = ({
  label = "label",
  variant = "primary",
  className,
  onClick,
}) => {
  interface Variants {
    [key: string]: string;
  }

  const variants: Variants = {
    primary:
      "w-fit font-thin px-7 py-2 bg-gradient-to-r from-red-500 to-red h-fit rounded-xl whitespace-nowrap ",
    secondary:
      "w-fit font-thin px-7 py-2 bg-white bg-opacity-10 backdrop-blur-sm  h-fit rounded-xl whitespace-nowrap ",
  };
  return (
    <button onClick={onClick} className={variants[variant] + className}>
      {label}
    </button>
  );
};

export default Button;
