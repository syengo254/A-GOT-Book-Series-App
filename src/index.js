import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import CharactersList from './views/characters/CharactersList';
import About from './views/about/About';
import BookView from './views/books/BookView';
import BookCharacters from './views/characters/BookCharacters';
import CharacterView from './views/characters/CharacterView';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/characters' element={<CharactersList />} />
        <Route path='/characters/:id' element={<CharacterView />} />
        <Route path='/about' element={<About />} />
        <Route path='/books/:id' element={<BookView />} />
        <Route path='/books/:id/characters' element={<BookCharacters />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
