import React from 'react';
import bookIcon from '../../assets/img/book_icon.png';

const BookItem = () => {
    return ( 
        <div className="book-item">
            <div className="book-title">
                A Game of Thrones
            </div>
            <div className="book-icon">
                <img src={ bookIcon } alt="book-icon" />
            </div>
            <div className="book-meta">
                <div className="authors-date">
                    <span>Authors: George RR. Martin, Weidorf Fckup, John Doe</span>
                    <span>Released on: 1996-08-01</span>
                </div>
                <div className="comments-link">
                    <a href="#">Characters</a>
                </div>
            </div>
            <div className="view-link">
                <a href="#">Comments: 1</a>
            </div>
        </div>
     );
}
 
export default BookItem
;