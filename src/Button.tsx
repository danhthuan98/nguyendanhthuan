import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Kiểu giao diện của nút. Mặc định: "primary" */
  variant?: ButtonVariant;
  /** Kích thước nút. Mặc định: "md" */
  size?: ButtonSize;
  /** Nút chiếm toàn bộ chiều ngang của container */
  fullWidth?: boolean;
  /** Icon hiển thị bên trái nội dung */
  leftIcon?: ReactNode;
  /** Icon hiển thị bên phải nội dung */
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      type = "button",
      children,
      ...rest
    },
    ref,
  ) {
    const classes = [
      "my-ui-btn",
      `my-ui-btn--${variant}`,
      `my-ui-btn--${size}`,
      fullWidth && "my-ui-btn--full",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classes} {...rest}>
        {leftIcon && <span className="my-ui-btn__icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="my-ui-btn__icon">{rightIcon}</span>}
      </button>
    );
  },
);
