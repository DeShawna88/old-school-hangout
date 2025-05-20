// src/components/ReviewForm/ReviewForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as gameService from '../../services/gameService';
// import styles from './ReviewForm.module.css';


const ReviewForm = (props) => {
    const [formData, setFormData] = useState({ comment: '' });
    const { gameId, reviewId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            const gameData = await gameService.show(gameId);
            // Find review in fetched game data
            setFormData(gameData.reviews.find((review) => review._id === reviewId));
        };
        if (gameId && reviewId) fetchGame();
    }, [gameId, reviewId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (gameId && reviewId) {
            gameService.updateReview(gameId, reviewId, formData);
            navigate(`/games/${gameId}`);
        } else {
            props.handleAddReview(formData);
        }
        setFormData({ comment: '' });
    };

    if (gameId && reviewId) return (
        <main className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Edit Review</h1>
                <label htmlFor='text-input'>Your review:</label>
                <textarea
                    required
                    type='text'
                    name='comment'
                    id='text-input'
                    value={formData.comment}
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

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your review:</label>
            <textarea
                required
                type='text'
                name='comment'
                id='text-input'
                value={formData.comment}
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
            <button type='submit'>SUBMIT COMMENT</button>
        </form>
    );
};

export default ReviewForm;