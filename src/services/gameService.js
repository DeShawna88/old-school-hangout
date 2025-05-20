const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`;


const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (gameId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (gameFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (gameId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteGame = async (gameId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(gameId, gameFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (gameId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (gameId, reviewId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  createReview,
  deleteGame,
  update,
  deleteReview,
  updateReview
};