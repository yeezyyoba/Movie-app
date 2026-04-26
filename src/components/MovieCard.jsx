import '../css/MovieCard.css';

function MovieCard({ movie }) {
  function onFavoriteClick() {
    alert('You clicked the favorite button');
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster_url} alt={movie.title} />
        <div className="movie-overlay">
          <button className="favorite-button" onClick={onFavoriteClick}> ㅤ♡ㅤ</button>
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
