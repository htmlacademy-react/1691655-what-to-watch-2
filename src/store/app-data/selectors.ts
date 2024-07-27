import { NameSpace } from '../../const';
import { FilmBriefly, FilmComment, FilmInDetails } from '../../types/film';
import { State } from '../../types/state';

export const getFilmsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isFilmsLoading;

export const getAllFilms = (state: State): FilmBriefly[] =>
  state[NameSpace.Data].allFilms;

export const getErrorStatus = (state: State): boolean =>
  state[NameSpace.Data].hasError;

export const getFavoriteFilms = (state: State): FilmBriefly[] =>
  state[NameSpace.Data].favoriteFilms;

export const getGenresList = (state: State): string[] =>
  state[NameSpace.Data].genresList;

export const getCurrentFilm = (state: State): FilmInDetails =>
  state[NameSpace.Data].currentFilmDetails;

export const getSimilarFilms = (state: State): FilmBriefly[] =>
  state[NameSpace.Data].similarFilms;

export const getComments = (state: State): FilmComment[] =>
  state[NameSpace.Data].reviews;