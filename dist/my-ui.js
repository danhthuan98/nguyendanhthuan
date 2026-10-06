import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/Button.tsx
var r = e(function({ variant: e = "primary", size: r = "md", fullWidth: i = !1, leftIcon: a, rightIcon: o, className: s, type: c = "button", children: l, ...u }, d) {
	let f = [
		"my-ui-btn",
		`my-ui-btn--${e}`,
		`my-ui-btn--${r}`,
		i && "my-ui-btn--full",
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n("button", {
		ref: d,
		type: c,
		className: f,
		...u,
		children: [
			a && /* @__PURE__ */ t("span", {
				className: "my-ui-btn__icon",
				children: a
			}),
			l,
			o && /* @__PURE__ */ t("span", {
				className: "my-ui-btn__icon",
				children: o
			})
		]
	});
});
//#endregion
export { r as Button };

//# sourceMappingURL=my-ui.js.map