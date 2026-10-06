import { jsx as e } from "react/jsx-runtime";
//#region src/Button.tsx
function t({ variant: t = "primary", className: n = "", ...r }) {
	return /* @__PURE__ */ e("button", {
		className: `myui-btn myui-btn--${t} ${n}`,
		...r
	});
}
//#endregion
export { t as Button };
