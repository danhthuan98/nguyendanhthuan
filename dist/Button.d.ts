import { ButtonHTMLAttributes, ReactNode } from 'react';
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
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
