import { useState } from 'react';
import '../css/MovieCard.css';

function MovieCard({ movie, isFavorite, onFavoriteClick }) {
  const [posterFailed, setPosterFailed] = useState(false);
  const hasPoster = movie.poster_url && !posterFailed;

  function handleFavoriteClick() {
    onFavoriteClick(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {hasPoster ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="movie-poster-fallback" aria-label={`Poster unavailable for ${movie.title}`}>
            <span>Poster unavailable</span>
            <strong>{movie.title}</strong>
          </div>
        )}
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites: ${movie.title}`}
            aria-pressed={isFavorite}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
