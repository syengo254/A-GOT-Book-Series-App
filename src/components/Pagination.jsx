import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ onPageChange, total_pages }) => {
    const [ c, sc ] = useState(1);
    const [ step, setStep ] = useState(0);

    function handleClick(e, p){
        if(e.preventDefault){
            e.preventDefault();
        }
        
        sc(p);
        onPageChange(p);
    }

    function handleNav(e, a){
        if(e.preventDefault){
            e.preventDefault();
        }

        if( a === 'prev' && c > 1){
            let nc = c - 1;
            sc(nc);
            if( c - 1 === step){
                handleStep(e, 'back')
            }
            else{
                onPageChange(nc);
            }
        }
        else if(a === 'next' && total_pages > 1 && c < total_pages){
            let nc = c + 1;
            sc( nc );
            if( c + 1 > (step + 10)){
                handleStep(e, 'forward')
            }
            else{
                onPageChange(nc);
            }
        }
        else{
            return;
        }
    }
    
    let tp = 0;
    let isGreat = false;

    if(total_pages > 10)
    {
        tp = 9;
        isGreat  =true;
    }
    else{
        tp = total_pages;
    }

    const showBackStepper = isGreat && step > 0;
    const showForwardStepper = isGreat && c < total_pages;

    function handleStep(e, action) {
        if(e.preventDefault){
            e.preventDefault();
        }

        if(action === 'forward'){
            setStep( step + 10 );
            handleClick(e, step + 10 )
        }
        else if(action === 'back'){
            setStep( step - 10 );
            handleClick(e, step - 10 )
        }
        else{
            return;
        }
    }

    const links = [...Array(tp)].map((_, i) => (<a 
                    className={ (i + 1 + step) === c ? 'active' : '' } 
                    key={`page-${i + 1 + step}`} 
                    href={`#${i + 1 + step}`}
                    onClick={ (e) => handleClick(e, i + 1 + step) }
                >{i + 1 + step}</a>) );

    return ( 
        <div className="pagination">
            <nav className="pagination-links">
                {
                    showBackStepper && (
                        <a
                            href={`#cc`}
                            onClick={ (e) => handleStep(e, 'back') }
                        >...</a>
                    )
                }
                <a href="#p" onClick={ (e) => handleNav(e, "prev")} >Previous</a>
                { links }
                {
                    showForwardStepper && (
                        <a
                            href={`#cc`}
                            onClick={ (e) => handleStep(e, 'forward') }
                        >...</a>
                    )
                }
                <a href="#c" onClick={ (e) => handleNav(e, "next")} >Next</a>
            </nav>
        </div>
     );
}
 
export default Pagination;