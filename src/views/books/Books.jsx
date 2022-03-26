import React, { useEffect, useState } from 'react';
import './Books.css';
import Pagination from '../../components/Pagination';
import BookItem from './BookItem';
import axios from 'axios';

const Books = () => {
    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    const [ params, setParams ] = useState({
        page: 1,
        pageSize: 10,
    });

    const [ pagination, setPagination ] = useState({});

    async function getBooks() {
        const url = process.env.REACT_APP_API_URL;
        let urlParams = '?';

        for(const k in params){
            urlParams += `${k}=${params[k]}&`;
        }
        
        urlParams = urlParams.substring(0, urlParams.length - 1);

        setLoading(true);

        try {
            const action = await axios.get(`${url}/books${ urlParams }`);
            const { success, data, message, pages } = action.data;

            setLoading(false);

            if(success === 1){
                setBooks(data);
                setPagination( pages );
            }
            else{
                setError(true);
                setMsg(message);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
            setMsg(error.message);
        }
    }

    function onPageChange(newPage){
        setParams(old => ( {...old, page: newPage } ));
    }

    useEffect(() => {
        getBooks();
    }, [params]);

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