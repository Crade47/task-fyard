// Import the 'LatLngTuple' type from the 'leaflet' library
import { LatLngTuple } from "leaflet"

// Type for the structure of API response data related to cases, deaths, and recovered numbers
export type GraphDataType = {
    cases: {
        [key: string]: number // An object with keys as strings and values as numbers
    }
    deaths: {
        [key: string]: number // An object with keys as strings and values as numbers
    }
    recovered: {
        [key: string]: number // An object with keys as strings and values as numbers
    }
}

// Type for the formatted data structure you need for cases
export type CasesDataType = {
    date: string; // A string representing a date
    Cases: number; // A number representing cases
    year: string; // A string representing the year
}

// Type for the API response data related to map data
export type MapDataApiResponse = {
    country: string; // A string representing the country
    countryInfo: {
        lat: number; // A number representing latitude
        long: number; // A number representing longitude
    }
    active: number; // A number representing active cases
    deaths: number; // A number representing deaths
    recovered: number; // A number representing recovered cases
}

// Type for the formatted map data structure
export type MapData = {
    geocode: LatLngTuple; // A 'LatLngTuple' from the 'leaflet' library representing geolocation
    country: string; // A string representing the country
    active: string; // A string representing active cases (note: consider using a number if needed)
    deaths: string; // A string representing deaths (note: consider using a number if needed)
    recovered: string; // A string representing recovered cases (note: consider using a number if needed)
}
 