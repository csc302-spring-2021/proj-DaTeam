export function icicle(partition, data, d3, width, height, color, format) {
  const root = partition(data);

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font", "10px sans-serif");

  const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.y0},${d.x0})`);

  cell
    .append("rect")
    .attr("width", (d) => d.y1 - d.y0)
    .attr("height", (d) => d.x1 - d.x0)
    .attr("fill-opacity", 0.6)
    .attr("fill", (d) => {
      if (!d.depth) return "#ccc";
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    });

  const text = cell
    .filter((d) => d.x1 - d.x0 > 16)
    .append("text")
    .attr("x", 4)
    .attr("y", 13);

  text.append("tspan").text((d) => d.data.name);

  text
    .append("tspan")
    .attr("fill-opacity", 0.7)
    .text((d) => ` ${format(d.value)}`);

  cell.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .join("/")}\n${format(d.value)}`
  );

  return svg.node();
}
