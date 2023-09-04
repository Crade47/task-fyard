import moment from "moment";
import type {
  CasesDataType,
  GraphDataType,
  MapData,
  MapDataApiResponse,
} from "../types/types";

// Main api url is in the .env


//Function for getting all cases for the graph data in the dashboard
export const getAllCases = async (): Promise<CasesDataType[]> => {
  const result = await fetch(
    `${process.env.REACT_APP_DATA_API}/historical/all?lastdays=all`
  );
  const data: GraphDataType = await result.json();
  const cases: CasesDataType[] = [];
  //Formatting data for easier and cleaner use in LineGraph component
  for (const [date, value] of Object.entries(data.cases)) {
    const year = moment(date, "MM/DD/YY").format("YYYY");
    cases.push({
      date,
      Cases: value,
      year,
    });
  }
  return cases;
};

//Function for getting all map data by countries
export const getMapData = async (): Promise<MapData[]> => {
  const result = await fetch(`${process.env.REACT_APP_DATA_API}/countries`);
  const mapData: MapDataApiResponse[] = await result.json();
  const formattedMapData: MapData[] = mapData.map(
    ({ active, country, countryInfo, deaths, recovered }) => ({
      geocode: [countryInfo.lat, countryInfo.long],
      country,
      active: numberFormatter(active),
      deaths: numberFormatter(deaths),
      recovered: numberFormatter(recovered),
    })
  );
  return formattedMapData;
};

// Formatter function using the Internationalization API
export const numberFormatter = (number: number) => {
  // Create a number formatter instance for English with compact notation
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};
