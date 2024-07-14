import { ButtonHTMLAttributes } from "react";
import s from "./button.module.less";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button {...props} className={s.button}>
      Click me
    </button>
  );
};

export default Button;
