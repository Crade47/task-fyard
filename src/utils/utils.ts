import moment from "moment";
import type { CasesDataType, GraphDataType } from "../types/types"

// Main api url is in the .env
export const getAllCases = async (): Promise<CasesDataType[]>  =>{
    const result = await fetch(`${process.env.REACT_APP_DATA_API}/historical/all?lastdays=all`)
    const data:GraphDataType = await result.json()
    const cases:CasesDataType[] = [];
    for(const [date, value] of Object.entries(data.cases)){
        const year = moment(date,"MM/DD/YY").format('YYYY')
        cases.push({
            date,
            Cases:value,
            year
        })
    }
    return cases
}