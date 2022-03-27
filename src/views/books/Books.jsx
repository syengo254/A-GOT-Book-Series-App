import React, { useState } from 'react';
import './Books.css';
import Pagination from '../../components/Pagination';
import BookItem from './BookItem';
import useBooks from '../../hooks/useBooks';

const Books = () => {
    const [ params, setParams ] = useState({
        page: 1,
        pageSize: 10,
    });

    const url = process.env.REACT_APP_API_URL + '/books';

    const { data: books, loading, error, msg, pagination } = useBooks( url, params );
    
    function onPageChange(newPage){
        setParams(old => ( {...old, page: newPage } ));
    }

    return ( 
        <main className="section">
            <div className="app-title">
                <h1>A GOT Book Series App</h1>
            </div>
            <span>Available books</span>
            <div className="books-container">
                {
                   error ? msg : books.map( (book, index) => <BookItem key={`book-item-${index}`} book={ book } />)
                }
                {
                    loading && 'Loading...'
                }
            </div>
            <Pagination onPageChange={ onPageChange } {...pagination} />
        </main>
     );
}
 
export default Books;