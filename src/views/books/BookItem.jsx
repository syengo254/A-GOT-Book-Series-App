import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookIcon from '../../assets/img/book_icon.png';

const BookItem = ({book}) => {
    const { id, name, released, authors, comments_count } = book;
    const bookUrl = `/books/${id}`;

    let navigate = useNavigate();

    return ( 
        <div className="book-item">
            <div className="book-title" onClick={ () => navigate(bookUrl) }>
                { name }
            </div>
            <div className="book-icon">
                <img src={ bookIcon } alt="book-icon" />
            </div>
            <div className="book-meta">
                <div className="authors-date">
                    <span>Authors: { authors.join(', ') }</span>
                    <span>Released on: { released }</span>
                </div>
                <div className="comments-link">
                    <Link to={`${bookUrl}/characters`}>Show characters</Link>
                </div>
            </div>
            <div className="view-link">
                <Link to={`${bookUrl}`}>View comments: { comments_count }</Link>
            </div>
        </div>
     );
}
 
export default BookItem
;