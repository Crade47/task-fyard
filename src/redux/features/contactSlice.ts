import { ContactData } from "../../types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ContactState {
  deletePending: boolean;
  editPending: boolean;
  loading: boolean;
  data: ContactData[];
  error: string;
  editError:string; 
}

const initialState: ContactState = {
  deletePending: false,
  editPending: false,
  loading: false,
  data: [],
  error: "",
  editError: "",
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
  },
});

export default contactSlice.reducer;
