import MovieCard from "../components/MovieCard"
import {useState, useEffect} from "react"
import {searchMovies, getPopularMovies} from "../services/api"
import '../css/Home.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadPopularMovies = async () =>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch(error){
                console.log(error)
                setError('failed to load Movies...')
            }
            finally{
                setLoading(false)
            }
        }
        
        loadPopularMovies()
    },[])
        
  const handleSearch = (e) => {
    e.preventDefault()
        alert(searchQuery)
  }

  return (
    <div className="home">
        <form onSubmit={handleSearch} className='search-form'>
            <input type="text" placeholder="Search movies" className="search-input" value={searchQuery} onChange={(e => setSearchQuery(e.target.value))}/>
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) =>
              movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                <MovieCard key={movie.id} movie={movie} />
              )
            )}
          </div>
        )}
    </div>
  );
}

export default Home;