import { LatLngTuple } from "leaflet"

export type GraphDataType = {
    cases:{
        [key:string]: number
    }
    deaths:{
        [key:string]: number
    }
    recovered:{
        [key:string]: number
    }
}

export type CasesDataType = {
    date: string;
    Cases:number;
    year: string;
}

export type MapDataApiResponse = {
    country:string;
    countryInfo:{lat:number; long:number}
    active: number;
    deaths:number;
    recovered:number
}

export type MapData = {
    geocode:LatLngTuple
    country:string;
    active: string;
    deaths:string;
    recovered: string
} 