import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useForm, useFormResponses } from "../../hooks/services";

import ResponseService from "../../services/ResponseService";
import { useRef } from "react";
import { Model } from "@dateam/shared";
import { sunburst } from "./Sunburst";
import * as d3 from "d3";

function StatPanel() {
  const { formId } = useParams<{
    formId: string;
  }>();

  const { data: formTemplate } = useForm(formId);
  const { data: formResponses } = useFormResponses(formId);
  const [data, setData] = useState<any>({});
  const [chartData, setChartData] = useState<any>();
  const [isSet, setIsSet] = useState(false);
  const [idMap, setIdMap] = useState<object>();
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (formResponses && formTemplate && chartRef.current) {
      d3.select(chartRef.current).selectAll("*").remove();
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
                  ? ansIdData[ans.questionID]
                  : "No Answer"
              );
            });
          });
          return ansIdData;
        })
        .then((data) => {
          if (!formTemplate) {
            return;
          }
          const dataArr = Object.keys(data).map((key: string) => {
            const countedChildren: any = {};
            data[key].forEach((key: string) => {
              countedChildren[key] = countedChildren[key]
                ? countedChildren[key] + 1
                : 1;
            });
            const children = Object.keys(countedChildren).map(
              (child: string) => {
                return { name: child, value: countedChildren[child] };
              }
            );
            return { name: key, children };
          });

          const chartData = { name: formTemplate.title, children: dataArr };
          return chartData;
        })
        .then((chartData) => {
          let obj: object = {};
          const formIdMap = (node: Model.SDCNode, obj: any) => {
            const id = node.id;
            const title = node.title ? node.title : "ID: " + node.id;
            obj[id] = title;
            if (node.children) {
              node.children.forEach((cnode) => formIdMap(cnode, obj));
            }
            if (node instanceof Model.SDCListField) {
              node.options.forEach((onode) => formIdMap(onode, obj));
            }
          };

          formIdMap(formTemplate, obj);
          return { chartData, idMap: obj };
        })
        .then((info) => {
          sunburst(info.chartData, chartRef.current, info.idMap);

          console.log(formResponses, formTemplate, chartRef);
        });
    }
  }, [formResponses, formTemplate, chartRef]);

  return (
    <div className="w-3/4 h-full p-8 ">
      <svg className="flex w-full h-full font-bold" ref={chartRef} />
    </div>
  );
}

export default StatPanel;
