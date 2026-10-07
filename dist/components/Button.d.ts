import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const button: (props?: ({
    variant?: "primary" | "secondary" | "outline" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
}
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
export {};
