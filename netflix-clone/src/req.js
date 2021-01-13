const api_key = 'a54618fe0fbb1c35737e9a35ec28e5de';

const req = {
  fetchTrending: `/trending/all/week?api_key=${api_key}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${api_key}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${api_key}&with_networks=213`,
  fetchActionMovies: `/discover/movie?api_key=${api_key}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${api_key}&with_genres=35`,
  fetcHorrorMovies: `/discover/movie?api_key=${api_key}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${api_key}&with_genres=10794`,
  fetchDocumentaries: `/discover/movie?api_key=${api_key}&with_genres=99`,
}
export default req;