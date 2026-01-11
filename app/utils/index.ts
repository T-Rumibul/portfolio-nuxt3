import type { RouteLocationNormalized } from "vue-router";


export const imageToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const HexToRgb = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1]!, 16),
            g: parseInt(result[2]!, 16),
            b: parseInt(result[3]!, 16),
        }
        : null;
};



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
