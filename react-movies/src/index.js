import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import RatingPage from "./pages/ratingsPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TopRatedMovies from "./pages/topRatesMovies";
import TrendingMovies from "./pages/trendingMovies";
import UserProfilePage from "./pages/userReviewPage";
import AllMovies from "./pages/allMovies";
import RecommendedMovies from "./components/recommendedMovies"; 
import MovieActors from "./components/movieActors"; 
import ActorMoviePage from "./pages/actorMoviePage";
import ProfilePage from "./pages/profilePage";
import HomePageLogIn from "./pages/homePageLogIn"; 
import theme from "./themes/theme";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContextProvider from './contexts/authContext';
import PrivateRoute from './protectedRoutes'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24, // Keep data in cache for a long time
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthContextProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/movies/home" element={<HomePage />} />
                <Route path="/" element={<HomePageLogIn />} />
                <Route path="/movies/homePageLogIn" element={<HomePageLogIn />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/topRated" element={<TopRatedMovies />} />
                <Route path="/movies/trending" element={<TrendingMovies />} />
                <Route path="/movies/profilePage" element={<ProfilePage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/rating/:id" element={<RatingPage />} />
                <Route path="/rating/user/:userId" element={<UserProfilePage />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                <Route path="/movies/all" element={<AllMovies />} />
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/:id/recommendations" element={<RecommendedMovies />} />
                <Route path="/movies/:id/actors" element={<MovieActors />} />
                <Route path="/actor/:actorId/movies" element={<ActorMoviePage />} />
                  
                  
                </Route>

              </Routes>
            </MoviesContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
