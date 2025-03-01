// Get movies from the backend
export const getMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
  return response.json();
};

// Get movie details by ID from the backend
export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get movie genres from the backend
export const getGenres = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/genres', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get movie images by movie ID from the backend
export const getMovieImages = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/images/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get movie reviews from the backend
export const getMovieReviews = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/reviews/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  const data = await response.json();
  return data.results;
};

// Get upcoming movies from the backend
export const getUpcomingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/upcoming', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get top-rated movies from the backend
export const getTopRatedMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/top_rated', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get trending movies from the backend
export const getTrendingMovies = async () => {
  const response = await fetch('http://localhost:8080/api/movies/tmdb/trending', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get recommended movies from the backend
export const getRecommendedMovies = async (movieId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/recommended/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get movie actors by movie ID from the backend
export const getMovieActors = async (movieId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actors/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get actor movies by actor ID from the backend
export const getActorMovies = async (actorId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor_movies/${actorId}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get actor details by name from the backend
export const getActorByName = async (actorName) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor/${actorName}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Search for movies by query from the backend
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/search?query=${query}&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Fetch actor details by name from the backend
export const fetchActorId = async (actorName) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor/${actorName}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};

// Get movies for a specific actor by actor ID from the backend
export const getMoviesForActor = async (actorId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor_movies/${actorId}`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(await response.json().message);
  }
  return response.json();
};


export const getMovieRatings = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/movies/${movieId}/ratings`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.json().message);
  }

  return response.json(); 
};



// Get movie ratings from users
export const getMovieRatingsFromUsers = async (movieId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`http://localhost:8080/api/rating/${movieId}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) throw new Error(`Failed to fetch ratings: ${response.statusText}`);

  const { ratings = [] } = await response.json();
  return ratings;
};



// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`http://localhost:8080/api/movies/${movieId}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) throw new Error(`Failed to fetch movie details: ${response.statusText}`);

  const data = await response.json();
  return data;
};


export const getUserDetails = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'User details not found');
  }
  return response.json();
};

export const getUserRatings = async (userId) => {
    const token = window.localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authorization token is missing. Please log in.');
    }
  
    const response = await fetch(`http://localhost:8080/api/rating/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'User reviews not found');
    }
  
    const data = await response.json();
    
    // Return the reviews directly from the 'ratings' key
    return data.ratings || [];
  };
  
  
  



// Fetch playlist movies function
export const getPlaylistMovies = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`http://localhost:8080/api/users/${userId}/playlist/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch movies. Status: ${response.status}`);
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    console.log('Fetched playlist data:', data); // Log the entire response to inspect it
    return data; // Assuming the data is already the array of movies
  } catch (error) {
    console.error('Error fetching playlist movies:', error);
    throw error;
  }
};




