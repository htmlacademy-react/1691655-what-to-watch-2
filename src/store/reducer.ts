import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadFilms, requireAuthorization, setError, setFilmsDataLoadingStatus, showMoreFilms } from './actions';
import { ALL_GENRES, AuthorizationStatus, Setting } from '../const';
import { FilmBriefly } from '../types/film';

type InitialState = {
  genre: string;
  allFilms: FilmBriefly[];
  filmsToShow: FilmBriefly[];
  genresList: string[];
  showedFilmsNumber: number;
  authorizationStatus: AuthorizationStatus;
  isFilmsLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  allFilms: [],
  filmsToShow: [],
  genresList: [],
  showedFilmsNumber: Setting.filmCardsNumber,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false,
  error: null,
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

    .addCase(requireAuthorization, (state, action) => {
      console.log('reducer action requireAuthorization..', action.payload);

      state.authorizationStatus = action.payload;
    })

    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsLoading = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
