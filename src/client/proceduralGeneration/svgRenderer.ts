import SVG from "svg.js";

const renderSvg = (element: HTMLElement, radius: number, color: string): void => {
  const draw = SVG(element);

  const lightColor = "#ddd";

  const lightGradientRadial = draw
    .gradient("radial", (stop: SVG.Gradient): void => {
      stop.at({ offset: 100, color: color });
      stop.at({ offset: 1, color: lightColor });
    })
    .radius(0.1)
    .attr("cx", 0.75)
    .attr("cy", 0.3);

  const gradient = draw.gradient("linear", (stop: SVG.Gradient): void => {
    stop.at(0, lightColor);
    stop.at(0.7, color);
  });

  const c1 = draw
    .circle(radius)
    .fill(gradient)
    .opacity(0.9);
  const c3 = draw
    .circle(radius)
    .opacity(0.4)
    .fill(lightGradientRadial)
    .attr("comp-op", "hard-light");

  draw
    .group()
    .add(c1)
    .add(c3)
    .rotate(60);
};

export default renderSvg;
