import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
});

export const getNote = createAsyncThunk(
  "notes/getNote",
  async (noteId: number) => {
    const response = await axios.get(`${API_URL}/notes/${noteId}`);
    return response.data;
  },
);

export const createNot = createAsyncThunk("notes/createNote", async () => {});
