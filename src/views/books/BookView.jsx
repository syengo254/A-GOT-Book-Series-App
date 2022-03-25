import React from 'react';
import bookIcon from '../../assets/img/book_icon.png';
import MainLayout from '../layouts/MainLayout';
import './BookView.css';

const BookView = () => {
    return ( 
        <MainLayout>
            <main className="section">
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <span style={{color: 'var(--bg-color)', textDecoration: 'underline'}}>Viewing: <b>A Game of Thrones</b></span>
                <div className="book">
                    <div className="b-icon">
                        <img src={bookIcon} alt="book-icon" />
                    </div>
                    <div className="b-meta">
                        <div className="a-date">
                            <span><b>Title:</b> A Game of Thrones</span>
                            <span><b>Authors:</b> George RR. Martin, Weidorf Fckup, John Doe</span>
                            <span><b>ISBN:</b> 978-0553103540</span>
                            <span><b>Released on:</b> 1996-08-01</span>
                        </div>
                        <div className="comments-link">
                            <a href="#">Characters</a>
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <div className="comment-form">
                        <form>
                            <label>Add your comment:</label>
                            <textarea id="comment" cols="20" rows="4" maxlength="500"></textarea>
                            <small>Max. characters 500</small>
                            <input type="submit" value="Post" />
                        </form>
                    </div>
                    <h4 style={{marginBottom: '1rem'}}>Comments</h4>
                    <div><b>Total:</b> 2 Comments</div>
                    <div className="comment-item">
                        <div className="comment-user">Anonymous@192.168.0.1 says:</div>
                        <p>This is a sample comment</p>
                    </div>
                    <div className="comment-item">
                        <div className="comment-user">Anonymous@192.168.0.1 says:</div>
                        <p>This is a sample comment</p>
                    </div>
                    <div className="comment-item">
                        <div className="comment-user">Anonymous@192.168.0.1 says:</div>
                        <p>This is a sample comment</p>
                    </div>
                </div>
            </main>
        </MainLayout>
     );
}
 
export default BookView;