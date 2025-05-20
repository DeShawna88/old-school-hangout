// src/components/GameForm/GameForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as gameService from '../../services/gameService';
import styles from './GameForm.module.css'


const GameForm = (props) => {
    const { gameId } = useParams();
    console.log(gameId);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        genres: 'Action',
        releaseDate: '',
        developer: '',
        publisher: '',
        platforms: [''],  // Array of supported platforms
        rating: '',
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (gameId) {
            props.handleUpdateGame(gameId, formData);
        } else {
            props.handleAddGame(formData);
        }
    };

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const gameData = await gameService.show(gameId);
                setFormData(gameData);
            } catch (error) {
                console.error("Error fetching game:", error);
            }
        };

        if (gameId) fetchGame();
    }, [gameId]);



    return (
        <main className={styles.container}>
            <h1>{gameId ? 'Edit Game' : 'New Game'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title-input'>Title</label>
                <input
                    required
                    type='text'
                    name='title'
                    id='title-input'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='image-input'>Image</label>
                <input
                    type='text'
                    name='image'
                    id='image-input'
                    value={formData.image}
                    onChange={handleChange}
                />
                <label htmlFor='genres-input'>Genres</label>
                <select
                    required
                    name='genres'
                    id='genres-input'
                    value={formData.genres}
                    onChange={handleChange}
                >
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Platform'>Platform</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='Shooting'>Shooting</option>
                    <option value='Simulation'>Simulation</option>
                </select>
                <label htmlFor='releaseDate-input'>Release Date</label>
                <input
                    type='date'
                    name='releaseDate'
                    id='releaseDate-input'
                    value={formData.releaseDate}
                    onChange={handleChange}
                />
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default GameForm;
