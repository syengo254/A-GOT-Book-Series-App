import React from 'react';
import './Books.css';
import Pagination from '../../components/Pagination';
import BookItem from './BookItem';

const Books = () => {
    return ( 
        <main className="section">
            <div className="app-title">
                <h1>A GOT Book Series App</h1>
            </div>
            <span>Available books</span>
            <div className="books-container">
                <BookItem />
            </div>
            <Pagination />
        </main>
     );
}
 
export default Books;