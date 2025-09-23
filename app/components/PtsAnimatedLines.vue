<template>
  <div id="pts"></div>
</template>

<script setup lang="ts">
import { CanvasSpace, Group, Pt, Const, Line } from "pts";
import { HexToRgb } from "~/helpers";

// Function to generate a new group of points
const generateANewGroupOfPts = (count: number, space: CanvasSpace) => {
  const pts = new Group();
  const pointBrightness: number[] = [];
  const r = Math.min(space.size.x, space.size.y);

  // Generate random points within the space
  for (let i = 0; i < count; i++) {
    const p = new Pt(
      Math.random() * space.size.x - Math.random() * space.size.x,
      Math.random() * space.size.y - Math.random() * space.size.y
    );
    pts.push(p);
    pointBrightness.push(0.5);
  }

  // Move points to the center of the space
  pts.moveBy(space.center);
  return { pts, pointBrightness };
};

// Execute code when mounted
onMounted(() => {

  const colors = ["#2196F3", "#FF5D56", "#FF00FF", "#9ACD32"];
  const dotColor = "#c2c2c2";
  const backgroundColor = "#111217";

  // Create a canvas space
  const space = new CanvasSpace("#pts").setup({
    bgcolor: backgroundColor,
    resize: true,
    retina: true,
  });

  const form = space.getForm();
  let ptsAndBrightness = generateANewGroupOfPts(55, space);

  // Add resize and animation functions to the canvas space
  space.add({
    resize: () => {
      ptsAndBrightness = generateANewGroupOfPts(55, space);
    },
    animate: (time, ftime) => {
      const angle = -(window.innerWidth * 0.3);
      const line = [new Pt(0, angle), new Pt(space.size.x, 0)];
      const mouse = space.pointer;

      // Rotate the points
      ptsAndBrightness.pts.rotate2D(Const.one_degree / 15, space.center);

      // Iterate over the points
      ptsAndBrightness.pts.forEach((pt, i) => {
        const ln = [pt, Line.perpendicularFromPt(line, pt)];
        const distFromMouse = Math.abs(Line.distanceFromPt(ln, mouse));

        const rgb = HexToRgb(colors[i % 3]!);
        let color = `rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, ${ptsAndBrightness.pointBrightness[i]})`;
        
        // Adjust point brightness based on distance from the mouse
        if (distFromMouse < 50) {
          ptsAndBrightness.pointBrightness[i]! += 0.3;
          color = `rgba(255, 255, 255, ${ptsAndBrightness.pointBrightness[i]})`;
        } else if (ptsAndBrightness.pointBrightness[i]! > 0.5) {
          ptsAndBrightness.pointBrightness[i]! -= 0.1;
        }

        // Draw the points and lines
        form.fill(dotColor).point(pt, 2, "circle");

        form.strokeOnly(color).fill(true).line(ln);
      });
    },
  });

  // Bind mouse and touch events to the canvas space
  space.bindMouse().bindTouch().play();
});
</script>

<style lang="sass" scoped></style>
