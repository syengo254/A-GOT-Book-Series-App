import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const About = () => {
    return ( 
        <MainLayout>
            <main style={{padding: '1rem'}}>
                <p>A consumer app for the 'An Extended API of Ice &amp; Fire'</p>
                <Link to="/">Home</Link>
            </main>
        </MainLayout>
     );
}
 
export default About;