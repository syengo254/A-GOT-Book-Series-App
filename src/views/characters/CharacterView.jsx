import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import userIcon from '../../assets/img/user_512.webp';
import './CharacterView.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterView = () => {
    const { id } = useParams();
    const [ character, setCharacter ] = useState({});
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    
    async function getCharacter(){
        const url = process.env.REACT_APP_API_URL;

        setLoading(true);

        const action = await axios.get(`${ url }/characters/${id}`);
        const { success, data, message, metadata } = action.data;

        setLoading(false);

        if(success === 1){
            data.age = metadata.total_age.in_years;
            setCharacter(data);
        }
        else{
            setError(true);
            setMsg(message);
        }
    }

    useEffect(() => {
        getCharacter();
    }, []);

    return ( 
        <MainLayout>
            <main>
                <div className="app-title">
                    <h1>A GOT Book Series App</h1>
                </div>
                { loading && 'Loading...'}
                { error && msg }
                <div className="character-info" style={{ width: '400px', margin: '0 auto'}}>
                    <form>
                        <div>
                            <img src={userIcon} width="120" height="120" alt="user-icon" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={character.name} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <input type="text" id="gender" value={character.gender} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input type="text" id="age" value={character.age} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="titles">Titles:</label>
                            <input type="text" id="titles" value={character.titles} readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="aliases">Aliases:</label>
                            <input type="text" id="aliases" value={character.aliases} readOnly/>
                        </div>
                    </form>
                </div>
            </main>
        </MainLayout>
     );
}
 
export default CharacterView;