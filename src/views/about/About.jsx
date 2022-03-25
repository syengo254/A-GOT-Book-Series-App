import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const About = () => {
    return ( 
        <MainLayout>
            <main className='section'>
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <p>A consumer app for the 'An Extended API of Ice &amp; Fire'</p>
                <Link to="/">Home</Link>
            </main>
        </MainLayout>
     );
}
 
export default About;