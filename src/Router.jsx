import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
