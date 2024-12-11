import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooksAPI, addBookAPI } from '../services/api';

// Fetch books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params) => {
  return await fetchBooksAPI(params);
});

// Add a book
export const addBook = createAsyncThunk('books/addBook', async (book) => {
  return await addBookAPI(book);
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default booksSlice.reducer;
