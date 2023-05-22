import { RouteLocationNormalized } from "vue-router";

export function ChooseSlideSide(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const pagesOrder = ["index", "about", "portfolio", "contacts"];
  console.log(to.name, from.name);
  if (from.meta.pageTransition) {
    const pageTransitionProps = from.meta.pageTransition;
    if (typeof pageTransitionProps !== "boolean" && to.name && from.name) {
      pageTransitionProps.name =
        pagesOrder.indexOf(to.name.toString()) >
        pagesOrder.indexOf(from.name.toString())
          ? "slide-left"
          : "slide-right";
      console.log(pageTransitionProps.name);
    }
  }
}
