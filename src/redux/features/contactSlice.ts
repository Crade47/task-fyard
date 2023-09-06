import { ContactData } from "../../types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ContactState {
    loading: boolean,
    data: ContactData[]
    error: string
}

const initialState:ContactState = {
    loading: false,
    data: [],
    error: ''
}

export const fetchContacts = createAsyncThunk('contact/fetchContacts', async () =>{
    const response = await fetch('/api/contacts/all');
    const contacts: ContactData[] = await response.json()
    return contacts
})

const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchContacts.pending, (state)=>{
                state.loading = true 
        })        
        builder.addCase(fetchContacts.fulfilled, (state,action)=>{
                state.loading = false;
                state.data = action.payload;
                state.error = '';
        })
        builder.addCase(fetchContacts.rejected, (state,action)=>{
                state.loading = false;
                state.data = [];
                state.error = action.payload as string; 
        })
    }
})


export default contactSlice.reducer