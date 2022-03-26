import React, { useEffect, useState } from 'react';
import './CharactersList.css';
import Pagination from '../../components/Pagination';
import MainLayout from '../layouts/MainLayout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterRow = ({pos, character}) => {
    return ( 
        <tr>
            <td>{ pos }.</td>
            <td><Link to={character}>{character}</Link></td>
        </tr>
     );
}

const BookCharacters = () => {
    const { id } = useParams();
    const [ book, setBook ] = useState(null);
    const [ characters, setCharacters ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    
    async function getCharacters(){
        const url = process.env.REACT_APP_API_URL;

        setLoading(true);

        try {
            const action = await axios.get(`${ url }/books/${id}/characters`);
            const { success, data, message } = action.data;

            setLoading(false);

            if(success === 1){
                setCharacters(data.characters);
                setBook(data.book);
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

    useEffect(() => {
        getCharacters();
    }, []);

    function stripDomainOnURL(str){
        str = str.replace(process.env.REACT_APP_API_URL, "");

        return str;
    }

    return ( 
        <MainLayout>
            <main className="section">
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <span>Characters for the Book: { book && book.name }</span>
                <p>Click on the link to view character details</p>
                <div className="characters-list">
                    <table className="char-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Character URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loading && <tr><td colSpan="2">{`Loading...`}</td></tr>}
                            { error && <tr><td colSpan="2">{msg}</td></tr> }
                            {
                                characters.length && characters.map( (character, i) => <CharacterRow key={i} pos={i + 1} character={stripDomainOnURL(character)} />)
                            }
                        </tbody>
                    </table>
                    <Pagination />
                </div>
            </main>
        </MainLayout>
     );
}
 
export default BookCharacters;