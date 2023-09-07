import { ContactData } from "../../types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ContactState {
  deletePending: boolean;
  editPending: boolean;
  creationPending: boolean;
  loading: boolean;
  data: ContactData[];
  error: string;
  editError:string; 
  creationError:string; 
}

const initialState: ContactState = {
  deletePending: false,
  editPending: false,
  creationPending: false,
  loading: false,
  data: [],
  error: "",
  editError: "",
  creationError:"", 
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const response = await fetch("/api/contacts/all");
    const contacts: ContactData[] = await response.json();
    return contacts;
  }
);

export const editContact = createAsyncThunk(
  "contact/editContact",
  async (body: ContactData) => {
    const reqOption: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`/api/contacts/contact/update`, reqOption);
    return response.json();
  }
);


export const addContact = createAsyncThunk(
  "contact/addContact",
  async (body: Omit<ContactData,"id">) => {
    const reqOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`/api/contacts/contact/create`, reqOption);
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id:number) => {
    const reqOption: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/contacts/contact/${id}`, reqOption);
    return response.json();
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {


    //Fetch Contacts Cases
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });


    //Edit Contact Cases
    builder.addCase(editContact.pending, (state) => {
      state.editPending = true;
    });
    builder.addCase(editContact.fulfilled, (state) => {
      state.editPending = false;
    });
    builder.addCase(editContact.rejected, (state, action) => {
      state.editPending = false;
      state.editError = action.payload as string
    });


    //Contact creating Cases
    builder.addCase(addContact.pending, (state) => {
      state.creationPending = true;
    });
    builder.addCase(addContact.fulfilled, (state) => {
      state.creationPending = false;
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.creationPending = false;
      state.creationError = action.payload as string
    });
  },
});

export default contactSlice.reducer;
