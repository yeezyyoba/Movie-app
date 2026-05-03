import { useEffect, useState } from 'react'
import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import {Routes, Route} from 'react-router-dom'
import NavBar from "./components/NavBar"

const FAVORITES_STORAGE_KEY = 'favoriteMovies';

function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.id === movie.id)) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  };

  return (

    <div>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route
          path='/'
          element={<Home isFavorite={isFavorite} onFavoriteClick={toggleFavorite} />}
        />
        <Route
          path='/favorites'
          element={
            <Favorites
              favorites={favorites}
              isFavorite={isFavorite}
              onFavoriteClick={toggleFavorite}
            />
          }
        />
      </Routes>
    </main>
    </div>
  )
}

export default App
