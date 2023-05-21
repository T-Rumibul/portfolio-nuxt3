import { RouteLocationNormalized } from "vue-router";

export function chooseSlideSide(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const pagesOrder = ["index", "about", "portfolio", "contacts"]
    console.log(to.name, from.name)
    if (to.meta.pageTransition) {
        const pageTransitionProps = to.meta.pageTransition
        if (typeof pageTransitionProps !== "boolean" && to.name && from.name) {
            console.log((pagesOrder.indexOf(to.name.toString()) > pagesOrder.indexOf(from.name.toString())))
            pageTransitionProps.name = (pagesOrder.indexOf(to.name.toString()) > pagesOrder.indexOf(from.name.toString())) ? "slide-right" : "slide-left"
        }

    }
}