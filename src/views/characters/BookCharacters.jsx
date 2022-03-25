import React, { useEffect, useState } from 'react';
import './CharactersList.css';
import Pagination from '../../components/Pagination';
import MainLayout from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterRow = ({pos, character}) => {
    return ( 
        <tr>
            <td>{ pos }.</td>
            <td><a href={character}>{character}</a></td>
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
    }

    useEffect(() => {
        getCharacters();
    }, []);

    return ( 
        <MainLayout>
            <main className="section">
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <span>Characters for the Book: { book && book.name }</span>
                <div className="characters-list">
                    <table className="char-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Character URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loading && <tr><td>Loading...</td></tr>}
                            { error && <tr><td>msg</td></tr> }
                            {
                                characters.length && characters.map( (character, i) => <CharacterRow key={i} pos={i + 1} character={character} />)
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