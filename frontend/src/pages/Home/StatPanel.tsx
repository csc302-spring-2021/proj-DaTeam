import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useForm, useFormResponses } from "../../hooks/services";

import ResponseService from "../../services/ResponseService";
import * as d3 from "d3";
import { useRef } from "react";
import { Model } from "@dateam/shared";
import { sunburst } from "./Sunburst";

function StatPanel() {
  const { formId } = useParams<{
    formId: string;
  }>();

  const { data: formTemplate } = useForm(formId);
  const { data: formResponses } = useFormResponses(formId);
  const [data, setData] = useState<any>({});
  const [chartData, setChartData] = useState<any>();
  const [idMap, setIdMap] = useState<object>();
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
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
    if (formTemplate) {
      formIdMap(formTemplate, obj);
      setIdMap(obj);
      console.log(obj);
    }
  }, [formTemplate]);

  useEffect(() => {
    if (!formResponses) {
      return;
    }
    const responses = formResponses.map(async (res) => {
      return await ResponseService.read(res.uid!);
    });
    Promise.all(responses)
      .then((resps) => {
        console.log(resps);
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
  }, [formResponses]);

  useEffect(() => {
    if (data && formTemplate) {
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

      const chartData = { name: formTemplate.title, children: dataArr };
      setChartData(chartData);
    }
  }, [data, chartRef, formTemplate]);

  useEffect(() => {
    if (
      idMap &&
      chartRef.current &&
      chartData &&
      chartData.children.length > 0
    ) {
      sunburst(chartData, chartRef.current, idMap);
    }
  }, [chartData, chartRef, idMap]);

  return (
    <div key={formId} className="w-full h-full py-8 overflow-scroll">
      <svg
        className="flex w-full h-full overflow-scroll font-bold"
        ref={chartRef}
      />
    </div>
  );
}

export default StatPanel;
