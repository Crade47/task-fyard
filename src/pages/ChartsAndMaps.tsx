import React from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { getAllCases, getMapData, numberFormatter } from "../utils/utils";
import { CgSpinner } from "react-icons/cg/";
import MapLeaflet from "../components/MapLeaflet";

// React component for rendering COVID-19 cases data
export default function ChartsAndMaps() {
  // Fetch COVID-19 cases data using the useQuery hook
  const { data: casesData, isLoading } = useQuery({
    queryKey: ["casesData"],
    queryFn: getAllCases,
  });

  const { data: mapData, isLoading: isMapDataLoading } = useQuery({
    queryKey: ["mapData"],
    queryFn: getMapData,
  });

  console.log(mapData);

  return (
    <div className="px-2 md:px-4">
      {/* ------------------------------LINE GRAPH SECTION------------------------------ */}
      <Card className="mt-10 bg-zinc-400/30 rounded-md">
        <Title className="p-4 font-semibold">COVID-19 Cases</Title>
        {isLoading ? (
          // Display a loading message while data is being fetched
          <div className="text-2xl flex border-lighterGray px-2 py-3 sm:gap-8  justify-center  items-center">
            <div className="animate-spin">
              <CgSpinner />
            </div>
          </div>
        ) : (
          // Render a card with the COVID-19 cases line chart when data is available
          <>
            <LineChart
              className=""
              data={casesData || []}
              index="year"
              categories={["Cases"]}
              colors={["rose"]}
              valueFormatter={numberFormatter}
              style={{ height: "15rem", width: "95%", padding: "1rem" }}
              autoMinValue={true}
              showXAxis={false}
              yAxisWidth={50}
            />
          </>
        )}
      </Card>

      <Card className="mt-10 mb-10 p-4 bg-zinc-400/30 rounded-md">
        <Title className="p-2 font-semibold">COVID-19 Status By Country</Title>
        {isMapDataLoading ? (
          <div className="text-2xl flex border-lighterGray px-2 py-3 sm:gap-8  justify-center  items-center">
            <div className="animate-spin">
              <CgSpinner />
            </div>
          </div>
        ) : (
          <MapLeaflet
            mapData={mapData || []}
            isMapDataLoading={isMapDataLoading}
          />
        )}
      </Card>
    </div>
  );
}
