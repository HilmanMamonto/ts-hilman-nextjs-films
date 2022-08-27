interface ButtonType {
  label: string;
  variant?: string;
}

const Button = ({ label = "label", variant = "primary" }: ButtonType) => {
  interface Variants {
    [key: string]: string;
  }

  const variants: Variants = {
    primary:
      "w-fit px-7 py-2 bg-gradient-to-r from-red-500 to-red h-fit rounded-xl whitespace-nowrap",
    secondary:
      "w-fit px-7 py-2 bg-white bg-opacity-10 backdrop-blur-sm  h-fit rounded-xl whitespace-nowrap",
  };
  return <button className={variants[variant]}>{label}</button>;
};

export default Button;
