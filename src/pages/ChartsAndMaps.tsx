import React from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { getAllCases } from "../utils/utils";

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
];
const numberFormatter = (number: number) =>{
  let formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
} 

export default function ChartsAndMaps() {
  const { data: casesData, isLoading } = useQuery({
    queryKey: ["casesData"],
    queryFn: getAllCases,
  });
  console.log(casesData);
  return (
    <div className="px-2 md:px-4">
      {isLoading && !casesData ? (
        <div>Loading</div>
      ) : (
        <Card className="mt-10 bg-zinc-400/30 rounded-md">
          <Title className="p-2 font-semibold">COVID-19 Cases</Title>
          <LineChart
            className=""
            data={casesData || []}
            index="year"
            categories={["Cases"]}
            colors={["rose"]}
            valueFormatter={numberFormatter}
            style={{ height: "25rem", width: "95%", padding: "1rem" }}
            autoMinValue={true}
            showXAxis={false}
            yAxisWidth={50}
          />
        </Card>
      )}
    </div>
  );
}
