import React from 'react';
import './CharactersList.css';
import Pagination from '../../components/Pagination';
import MainLayout from '../layouts/MainLayout';

const CharactersList = () => {
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
                            <label for="filter_by">Show only:</label>
                            <select id="filter_by" className="input-field">
                                <option value="">--select gender--</option>
                                <option value="gender">Male</option>
                                <option value="gender">Female</option>
                            </select>
                        </div>
                        <div className="filter">
                            <label for="filter_by">Search name:</label>
                            <input type="text" id="sname" className="input-field" placeholder="type name" />
                            <button type="button" className="input-field">Search</button>
                        </div>
                    </div>
                    <table className="char-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Character Name</th>
                                <th>Aliases</th>
                                <th>Gender</th>
                                <th>Lifetime</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td><a href="http://localhost:8000/api/characters/1">Jon Snow</a></td>
                                <td>Stark Bastard</td>
                                <td>Male</td>
                                <td>870 AC to </td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination />
                </div>
            </main>
        </MainLayout>
     );
}
 
export default CharactersList;