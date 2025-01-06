# Assignment 2 - Web API.

Name: Peter Woods

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Added Ratings Collection
 + Rate Movies
 + Reviews
 + Linked Movies to ratings
 + Added Playlist Feature
 + View users ratings
 + Addional endpoints


## Setup requirements.

Just run npm start on both backend and frontend

## API Configuration

-You will need to obtain mongo_db collection which can be done online at mongo Atlas
-Obtain a TMDB key from TMDM just create account and use API KEY
-Create secret for JWT AUTH any password

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________


## API Design

- /movies/home | GET | Displays the home page
- / | GET | Displays the login page (HomePageLogIn)
- /movies/homePageLogIn | GET | Displays the home page for logged-in users
- /movies/upcoming | GET | Displays upcoming movies
- /movies/topRated | GET | Displays top-rated movies
- /movies/trending | GET | Displays trending movies
- /movies/profilePage | GET | Displays user profile page
- /movies/:id | GET | Displays a specific movie by its ID
- /rating/:id | GET | Displays movie rating page by movie ID
- /rating/user/:userId | GET | Displays user profile page by user ID
- /movies/all | GET | Displays all movies
- /movies/favorites | GET | Displays favorite movies of the user
- /movies/:id/recommendations | GET | Displays movie recommendations for a specific movie
- /movies/:id/actors | GET | Displays actors associated with a specific movie
- /actor/:actorId/movies | GET | Displays movies associated with a specific actor
- /reviews/form | POST | Creates a new movie review




## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

JWT tokens for logged in users to access certain features last 1 day. 

- /movies/all
- /movies/favorites
- /reviews/form
- /movies/:id/recommendations
- /movies/:id/actors
- /actor/:actorId/movies

## Integrating with React App

I used React Query for managing API requests, caching, and data fetching. The integration involves fetching data from the Web API and providing it to various components in the app.
The Web API is used to handle movie data, reviews, user authentication, ratings, and recommendations, instead of relying on an external API like TMDB (The Movie Database).
For instance, movie details, reviews, ratings, and recommendations are fetched directly from the Web API using useQuery or useMutation hooks provided by React Query.


