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

  const { data: form, isLoading: isLoadingForm } = useForm(formId);
  const {
    data: formResponses,
    isLoading: isLoadingFormResponses,
  } = useFormResponses(formId);

  const chartRef = useRef<SVGSVGElement>(null);

  const isLoading = isLoadingForm || isLoadingFormResponses;

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    // Clear existing D3 elements
    d3.select(chartRef.current).selectAll("*").remove();

    if (isLoading) {
      return;
    }

    async function generateChart() {
      if (!form || !formResponses) {
        return;
      }

      const responses = await Promise.all(
        formResponses.map(async (res) => {
          return await ResponseService.read(res.uid!);
        })
      );

      const ansIdData = {} as any;
      responses.forEach((res) => {
        res.answers.forEach((ans) => {
          ansIdData[ans.questionID] = [...ans.responses].concat(
            ansIdData[ans.questionID] ? ansIdData[ans.questionID] : "No Answer"
          );
        });
      });
      const dataArr = Object.keys(ansIdData).map((key: string) => {
        const countedChildren: any = {};
        ansIdData[key].forEach((key: string) => {
          countedChildren[key] = countedChildren[key]
            ? countedChildren[key] + 1
            : 1;
        });
        const children = Object.keys(countedChildren).map((child: string) => {
          return { name: child, value: countedChildren[child] };
        });
        return { name: key, children };
      });

      const chartData = { name: form.title, children: dataArr };

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
      formIdMap(form, obj);

      const info = { chartData, idMap: obj };
      sunburst(info.chartData, chartRef.current, info.idMap);

      console.log(formResponses, form, chartRef);
    }

    generateChart();

    return () => {
      d3.select(chartRef.current).selectAll("*").remove();
    };
  }, [chartRef, isLoading, formId]);

  return (
    <div className="w-3/4 h-full p-8 ">
      <svg className="flex w-full h-full font-bold" ref={chartRef} />
    </div>
  );
}

export default StatPanel;
