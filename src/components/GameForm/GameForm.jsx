// src/components/GameForm/GameForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as gameService from '../../services/gameService';
import styles from './GameForm.module.css'


const GameForm = (props) => {
    const { gameId } = useParams();
    // console.log(gameId);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        genres: 'Action',
        releaseDate: '',
        developer: '',
        publisher: '',
        platforms: [''],  // Array of supported platforms
        rating: 5,
    });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     if (gameId) {
    //         props.handleUpdateGame(gameId, formData);
    //     } else {
    //         props.handleAddGame(formData);
    //     }
    // };

    const validateImageURL = (url) => {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/.test(url);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Submitting:", formData);
        if (!validateImageURL(formData.image)) {
            alert("Please enter a valid image URL!");
            return;
        }
        if (gameId) {
            props.handleUpdateGame(gameId, formData);
        } else {
            props.handleAddGame(formData);
        }
    };

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await gameService.show(gameId);
            setFormData(gameData);
        };
        if (gameId) fetchGame();

        // Add a cleanup function
        return () => setFormData({
            title: '',
            image: '',
            genres: 'Action',
            releaseDate: '',
            developer: '',
            publisher: '',
            platforms: [''],
            rating: 5,
        });
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
                <label htmlFor="image-url-input">Image URL</label>
                <input
                    type="url"
                    name="image"
                    id="image-url-input"
                    placeholder="Enter image URL"
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
                    value={formData.releaseDate ? new Date(formData.releaseDate).toISOString().split("T")[0] : ""}
                    onChange={handleChange}
                />
                <label htmlFor='developer-input'>Developer</label>
                <input
                    required
                    type='text'
                    name='developer'
                    id='developer-input'
                    value={formData.developer}
                    onChange={handleChange}
                />
                <label htmlFor='publisher-input'>Publisher</label>
                <input
                    required
                    type='text'
                    name='publisher'
                    id='publisher-input'
                    value={formData.publisher}
                    onChange={handleChange}
                />
                <label htmlFor='platforms-input'>Platforms</label>
                <input
                    required
                    type='text'
                    name='platforms'
                    id='platforms-input'
                    value={formData.platforms}
                    onChange={handleChange}
                />
                <label htmlFor="rating-input">Rating</label>
                <select
                    name="rating"
                    id="rating-input"
                    value={formData.rating}
                    onChange={handleChange}
                >
                    {Array.from({ length: 11 }, (_, i) => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default GameForm;
