import { APIHOST, APIKEY, LANGUAGE } from '../utils/constants'

export const getNewMovies = async (page = 1) => {
  try {
    const url = `${APIHOST}/movie/now_playing?api_key=${APIKEY}&language=${LANGUAGE}&page=${page}`;

    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export const getGenreMovie = async (genreID: any) => {
  try {
    const url = `${APIHOST}/genre/movie/list?api_key=${APIKEY}&language=${LANGUAGE}`;
    const response = await fetch(url);
    const result = await response.json();

    const arrayGenres: any = [];

    genreID.forEach((id: any) => {
      result.genres.forEach((item: any) => {
        if (item.id === id) arrayGenres.push(item.name);
      });
    });

    return arrayGenres;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const getAllGenres = async () => {
  try {
    const url = `${APIHOST}/genre/movie/list?api_key=${APIKEY}&language=${LANGUAGE}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
}

export const getGenreMovies = async (genreID: any) => {
  try {
    const url = `${APIHOST}/discover/movie?api_key=${APIKEY}&with_genres=${genreID}&language=${LANGUAGE}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const getMovieByID = async (movieID: any) => {
  try {
    const url = `${APIHOST}/movie/${movieID}?api_key=${APIKEY}&language=${LANGUAGE}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const getVideoMovie = async (movieID: any) => {
  try {
    const url = `${APIHOST}/movie/${movieID}/videos?api_key=${APIKEY}&language=${LANGUAGE}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const getPopularMovies = async (page = 1) => {
  try {
    const url = `${APIHOST}/movie/popular?api_key=${APIKEY}&language=${LANGUAGE}&page=${page}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const searchMovies = async (search: string) => {
  try {
    const url = `${APIHOST}/search/movie?api_key=${APIKEY}&language=${LANGUAGE}&query=${search}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}
