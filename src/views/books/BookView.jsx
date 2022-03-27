import React, { useState } from 'react';
import './BookView.css';
import { Link, useParams } from 'react-router-dom';
import bookIcon from '../../assets/img/book_icon.png';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import useBooks from '../../hooks/useBooks';

const Book = ({ book }) => {
    return ( 
        <div className="book">
            <div className="b-icon">
                <img src={bookIcon} alt="book-icon" />
            </div>
            <div className="b-meta">
                <div className="a-date">
                    <span><b>Title:</b> { book.name }</span>
                    <span><b>Authors:</b> { book.authors && book.authors.join(', ') }</span>
                    <span><b>ISBN:</b> { book.isbn }</span>
                    <span><b>Released on:</b> { book.released }</span>
                </div>
                <div className="comments-link">
                    <Link to={`/books/${book.id}/characters`}>View characters</Link>
                </div>
            </div>
        </div>
     );
}

const BookView = () => {
    const { id }= useParams();
    const [ commentText, setCommentText ] = useState('');
    const url = process.env.REACT_APP_API_URL + '/books/' + id;
    const { data: book, loading, error, msg, setData } = useBooks(url);
    const [ commentError, setCommentError ] = useState('');

    function handleCommentChange(e){
        setCommentText(e.target.value);
    }

    async function submitComment(e) {
        e.preventDefault();

        const url = process.env.REACT_APP_API_URL;
        const formData = { isbn: book.isbn, comment: commentText };

        try {
            const action = await axios.post(`${url}/comments`, formData, { headers: {
                'Accepts': 'Application/json',
            }});
    
            const { success, data, message } = action.data;
    
            if(success){
                alert(`${message}`);
                setCommentText('');
                const comments = book.comments;
                comments.unshift({...data, username: 'Me'});
                setData( old => ({...old, comments, comments_count: comments.length}));
            }
            else{
                alert(message);
            }
        } catch (error) {
            if(error.response.status === 422){
                const response = error.response.data.comment.join(', ');
                setCommentError(response);
            }
            else{
                alert( error.message );
            }
        }
    }

    return ( 
        <MainLayout>
            <main className="section">
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <span style={{color: 'var(--bg-color)', textDecoration: 'underline'}}>Viewing: <b>{ book.name }</b></span>
                {
                    loading ? 'loading...' : <Book book={book} />
                }
                {
                    error && msg
                }
                <div className="comments">
                    <div className="comment-form">
                        <form onSubmit={ submitComment }>
                            <label>Add your comment:</label>
                            <textarea id="comment" cols="20" rows="4" onChange={ handleCommentChange } value={commentText} maxLength='500' required />
                            <small>Min 10 &amp; max. characters is 500</small>
                            { commentError.length ?? <div style={{color:'red'}}>{ commentError }</div> }
                            <input type="submit" value="Post" />
                        </form>
                    </div>
                    <h4 style={{marginBottom: '1rem'}}>Comments</h4>
                    <div>{ book.comments_count } Comments</div>
                    {
                        book.comments_count && book.comments.map( comment => {
                            return (
                                <div key={ `comment-${comment.id}` } className="comment-item">
                                    <div className="comment-user"><span>{comment.username}</span> on <span>{ comment.created_at }</span> said:</div>
                                    <p>{ comment.comment }</p>
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </MainLayout>
     );
}
 
export default BookView;