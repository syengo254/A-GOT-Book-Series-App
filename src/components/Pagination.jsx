import React from 'react';
import './Pagination.css';

const Pagination = () => {
    return ( 
        <div className="pagination">
            <nav className="pagination-links">
                <a href="">Previous</a>
                <a href="">1</a>
                <a href="">2</a>
                <a href="">...</a>
                <a href="">10</a>
                <a href="">Last</a>
            </nav>
        </div>
     );
}
 
export default Pagination;