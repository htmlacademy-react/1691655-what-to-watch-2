import { createReducer } from '@reduxjs/toolkit';
import { addComment, changeGenre, loadComments, loadFavoriteFilms, loadFilmDetails, loadFilms, loadSimilarFilms, requireAuthorization, saveAvatarUrl, setError, setFilmsDataLoadingStatus, showMoreFilms } from './actions';
import { ALL_GENRES, AuthorizationStatus, Setting } from '../const';
import { FilmBriefly, FilmComment, FilmInDetails } from '../types/film';

type InitialState = {
  genre: string;
  allFilms: FilmBriefly[];
  favoriteFilms: FilmBriefly[];
  filmsToShow: FilmBriefly[];
  currentFilmDetails: FilmInDetails;
  similarFilms: FilmBriefly[];
  comments: FilmComment[];
  genresList: string[];
  showedFilmsNumber: number;
  authorizationStatus: AuthorizationStatus;
  isFilmsLoading: boolean;
  error: string | null;
  avatarUrl: string | null;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  allFilms: [],
  favoriteFilms: [],
  filmsToShow: [],
  currentFilmDetails: {} as FilmInDetails,
  similarFilms: [],
  comments: [],
  genresList: [],
  showedFilmsNumber: Setting.filmCardsNumber,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false,
  error: null,
  avatarUrl: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showMoreFilms, (state) => {
      if (state.showedFilmsNumber + Setting.filmCardsNumber < state.filmsToShow.length) {
        state.showedFilmsNumber += Setting.filmCardsNumber;
      } else {
        state.showedFilmsNumber = state.filmsToShow.length;
      }
    })

    .addCase(changeGenre, (state, action) => {
      state.showedFilmsNumber = Setting.filmCardsNumber;
      state.genre = action.payload.genre;
      state.filmsToShow = state.allFilms.filter((film) => {
        if (action.payload.genre === ALL_GENRES) {
          return true;
        } else {
          return film.genre === action.payload.genre;
        }
      });
    })

    .addCase(loadFilms, (state, action) => {
      state.allFilms = action.payload;
      state.filmsToShow = action.payload;
      state.genresList = [ALL_GENRES].concat([...new Set(action.payload.map((film) => film.genre))]);
    })

    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })

    .addCase(loadFilmDetails, (state, action) => {
      state.currentFilmDetails = action.payload;
    })

    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })

    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })

    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsLoading = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    .addCase(saveAvatarUrl, (state, action) => {
      state.avatarUrl = action.payload;
    });
});
