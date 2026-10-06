import { jsx as e } from "react/jsx-runtime";
//#region src/Button.tsx
function t({ variant: t = "primary", size: n = "md", className: r = "", children: i, ...a }) {
	return /* @__PURE__ */ e("button", {
		className: `
        inline-flex
        items-center
        justify-center
        rounded-md
        font-medium
        transition-colors
        disabled:pointer-events-none
        disabled:opacity-50
        ${{
			primary: "bg-blue-600 text-white hover:bg-blue-700",
			secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
			danger: "bg-red-600 text-white hover:bg-red-700"
		}[t]}
        ${{
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-sm",
			lg: "px-5 py-3 text-base"
		}[n]}
        ${r}
      `,
		...a,
		children: i
	});
}
//#endregion
export { t as Button };
