import type { ButtonHTMLAttributes } from "react";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}
export declare function Button({ variant, className, ...props }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map