# React Book List App

This project is a simple React application to display a list of books. It uses Redux for state management and organizes API calls in a `services` folder.

## Project Structure

    src/ 
    ├── assets/ # Static assets 
    ├── components/ # React components 
    │ └── BookList.jsx # Component to display a list of books 
    ├── redux/ # Redux configuration 
    │ ├── booksSlice.js # Redux slice for book state 
    │ └── store.js # Redux store setup 
    ├── services/ # API service layer 
    │ └── api.js # Handles API calls 
    ├── App.jsx # Main application component 
    ├── Router.jsx # Application routing 
    ├── index.js # Entry point for React app 
    └── index.css # Global styles


## Prerequisites

- Node.js (v14+)
- npm or yarn package manager

## Setup

1. Clone the repository:
   git clone https://github.com/your-repo/react-book-list.git
   cd react-book-List

2. Install dependencies:
    npm install

3. Start the development server:
    npm start

4. Open the app in your browser:
    http://localhost:3000

## Scripts
-npm start: Start the development server.
-npm run build: Build the project for production.
-npm test: Run tests.

## Technologies Used
-React: Frontend library.
-Redux: State management.
-Axios: API calls.
-React Router: Navigation.

## API Setup
The services/api.js file contains the base API URL and methods to interact with the backend. Update the base URL as needed.

## Folder Highlights
redux/booksSlice.js: Defines the actions and reducers for managing the book list.
services/api.js: Centralizes all API interactions.