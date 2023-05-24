import { WritableComputedRef } from "nuxt/dist/app/compat/capi";
import { RouteLocationNormalized } from "vue-router";

export function ChooseSlideSide(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const toName = to.name?.toString().replace("___en", "").replace("___ru", "");
  const fromName = from.name
    ?.toString()
    .replace("___en", "")
    .replace("___ru", "");

  if (toName === fromName) {
    from.meta.pageTransition = {
      name: "none",
    };
    to.meta.pageTransition = {
      name: "none",
    };
    return;
  }

  const pagesOrder = ["index", "about", "portfolio", "contacts"];
  if (from.meta.pageTransition) {
    const fromTransition = from.meta.pageTransition;
    if (typeof fromTransition === "boolean" || !toName || !fromName) return;
    fromTransition.name =
      pagesOrder.indexOf(toName) > pagesOrder.indexOf(fromName)
        ? "slide-left"
        : "slide-right";
  }
}
