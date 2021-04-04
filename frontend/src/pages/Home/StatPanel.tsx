import { Model } from "@dateam/shared";
import { SDCAnswer } from "@dateam/shared/build/ClassDef";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { notify } from "../../components/Notification/Notification";

import { useFormResponses } from "../../hooks/services";
import FormService from "../../services/FormService";
import ResponseService from "../../services/ResponseService";
import * as d3 from "d3";
import { useRef } from "react";
import { icicle } from "./Icicle";

function StatPanel() {
  const { formId } = useParams<{
    formId: string;
  }>();

  const { data: formResponses } = useFormResponses(formId);
  const [data, setData] = useState<any>({});
  const [chartData, setChartData] = useState<any>();
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!formResponses) {
      return;
    }
    const responses = formResponses.map(async (res) => {
      return await ResponseService.read(res.uid!);
    });
    Promise.all(responses)
      .then((resps) => {
        const ansIdData = {} as any;
        resps.forEach((res) => {
          res.answers.forEach((ans) => {
            ansIdData[ans.questionID] = [...ans.responses].concat(
              ansIdData[ans.questionID]
            );
          });
        });

        return ansIdData;
      })
      .then((ansIdData) => {
        setData(ansIdData);
      });
  }, [formId]);

  useEffect(() => {
    if (data) {
      const dataArr = Object.keys(data).map((key: string) => {
        const countedChildren: any = {};
        data[key].forEach((key: string) => {
          countedChildren[key] = countedChildren[key]
            ? countedChildren[key] + 1
            : 1;
        });
        const children = Object.keys(countedChildren).map((child: string) => {
          return { name: child, value: countedChildren[child] };
        });
        return { name: key, children };
      });

      const chartData = { name: formId, children: dataArr };
      setChartData(chartData);

      /* chartRef.current?.replaceWith(svgNode) */
    }
  }, [data, chartRef]);

  useEffect(() => {
    if (chartRef.current && chartData && chartData.children.length > 0) {
      const width = 1200;
      const height = 970;
      const format = d3.format(",d");
      const color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, chartData.children.length + 1)
      );
      const partition = (data: any) => {
        const root = d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.height - a.height || b.value! - a.value!);
        return d3.partition().size([height, ((root.height + 1) * width) / 3])(
          root
        );
      };

      const rectHeight = (d: any) => {
        return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
      };

      const labelVisible: any = (d: any) => {
        return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
      };

      const root = partition(chartData);
      let focus = root;
      const svg = d3.select(chartRef.current);
      const cell = svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.y0},${d.x0})`);

      const text = cell
        .append("text")
        .style("user-select", "none")
        .attr("pointer-events", "none")
        .attr("x", 4)
        .attr("y", 13)
        .attr("fill-opacity", (d) => +labelVisible(d));

      text.append("tspan").text((d) => (d.data as any).name);

      const tspan = text
        .append("tspan")
        .attr("fill-opacity", (d) => labelVisible(d) * 0.7)
        .text((d) => ` ${format(d.value!)}`);

      cell.append("title").text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => (d.data as any).name)
            .reverse()
            .join("/")}\n${format(d.value!)}`
      );

      const clicked = (event: any, p: any) => {
        focus = focus === p ? (p = p.parent) : p;
        if (!p) {
          return;
        }

        root.each(
          (d) =>
            ((d as any).target = {
              x0: ((d.x0 - p.x0) / (p.x1 - p.x0)) * height,
              x1: ((d.x1 - p.x0) / (p.x1 - p.x0)) * height,
              y0: d.y0 - p.y0,
              y1: d.y1 - p.y0,
            })
        );
        const t = cell
          .transition()
          .duration(750)
          .attr(
            "transform",
            (d: any) => `translate(${d.target.y0},${d.target.x0})`
          );

        rect.transition(t).attr("height", (d: any) => rectHeight(d.target));
        text
          .transition(t)
          .attr("fill-opacity", (d: any) => +labelVisible(d.target));
        tspan
          .transition(t)
          .attr("fill-opacity", (d: any) => labelVisible(d.target) * 0.7);
      };

      const rect = cell
        .append("rect")
        .attr("width", (d) => d.y1 - d.y0 - 1)
        .attr("height", (d) => rectHeight(d))
        .attr("fill-opacity", 0.6)
        .attr("fill", (d) => {
          if (!d.depth) return "#ccc";
          while (d.depth > 1) d = d.parent!;
          return color((d.data as any).name);
        })
        .style("cursor", "pointer")
        .on("click", clicked);

      console.log(chartData);
    }
  }, [chartData, chartRef]);

  return (
    <div className="w-full h-full">
      <svg className="w-full h-full font-bold" ref={chartRef} />
    </div>
  );
}

export default StatPanel;
