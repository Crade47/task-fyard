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