import React, { useEffect, useState } from 'react';
import './CharactersList.css';
import Pagination from '../../components/Pagination';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharactersTable = ({ characters }) => {
    return ( 
        <table className="char-table">
            <thead>
                <tr>
                    <th className='hide-sm'>#</th>
                    <th>Character Name</th>
                    <th className='hide-sm'>Aliases</th>
                    <th>Gender</th>
                    <th className='hide-sm'>Lifetime</th>
                </tr>
            </thead>
            <tbody>
                {
                    characters.map( ({ id, name, gender, aliases, born, died }, i) => {
                        return (
                            <tr key={`character-${id}`}>
                                <td className='hide-sm'>{ i + 1 }.</td>
                                <td><Link to={`/characters/${id}`}>{ name === "" ? "blank" : name  }</Link></td>
                                <td className='hide-sm' style={{wordWrap:'break-word', maxWidth:'250px'}}>{ aliases.join(', ') }</td>
                                <td>{ gender }</td>
                                <td className='hide-sm' style={{wordWrap:'break-word', maxWidth:'100px'}}>{ born === "" ? "unknown" : born } to { died === "" ? "unknown" : died }</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
     );
}

const CharactersList = () => {
    const [ characters, setCharacters ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ params, setParams ] = useState({
        gender: '',
        name: '',
        page: 1,
        pageSize: 10,
    });
    const [ totalPages, setTotalPages ] = useState(1); //for pagination

    async function getCharacters(){
        const url = process.env.REACT_APP_API_URL;
        let urlParams = '?';

        for(const k in params){
            urlParams += `${k}=${params[k]}&`;
        }
        
        urlParams = urlParams.substring(0, urlParams.length - 1);

        setLoading(true);

        try {
            const action = await axios.get(`${ url }/characters${ urlParams }`);
            const { success, data, message, pages } = action.data;

            setLoading(false);

            if(success === 1){
                setCharacters(data);
                setTotalPages(pages.total_pages);
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

    async function genderChanged(e){
        const { value } = e.target;
        setParams( old => ({...old, gender: value }));
    }

    function handleSearchChange(e){
        setSearch(e.target.value);

        if(e.target.value === "" && params.name !== e.target.value){
            setParams( old => ({...old, name: e.target.value, page: 1 }));
        }
    }

    function onSearch(e){
        e.preventDefault();
        
        if(search.length > 2){
            setParams( old => ({...old, name: search, page: 1 }));
        }
    }

    function onPageChange(newPage){
        setParams( old => ({...old, page: newPage}) );
    }

    useEffect(() => {
        getCharacters();
    }, [params]);

    return ( 
        <MainLayout>
            <main className="section">
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                <span>Book series characters:</span>
                <div className="characters-list">
                    <div className="filters-container">
                        <div className="filter">
                            <label htmlFor="filter_by">Show only:</label>
                            <select id="filter_by" className="input-field" onChange={ genderChanged }>
                                <option value="">--select gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="filter">
                            <form onSubmit={ onSearch } id="search-form">
                                <label htmlFor="filter_by">Search name:</label>
                                <input type="text" id="sname" className="input-field" placeholder="type name" onChange={ handleSearchChange } required />
                                <button type="submit" className="input-field">Search</button>
                            </form>
                        </div>
                    </div>
                    { loading ? 'Loading...' : (error ? msg : <CharactersTable characters={ characters } />) }
                    <Pagination onPageChange={ onPageChange } total_pages={ totalPages } />
                </div>
            </main>
        </MainLayout>
     );
}
 
export default CharactersList;