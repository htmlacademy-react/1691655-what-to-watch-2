import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { ALL_GENRES, NameSpace } from '../../const';
import {
  fetchComments,
  fetchFavoriteFilms,
  fetchFilmDetail,
  fetchFilms,
  fetchPromoFilm,
  fetchSimilarFilms,
} from '../api-actions';
import { FilmInDetails } from '../../types/film';

const initialState: AppData = {
  allFilms: [],
  favoriteFilms: [],
  currentFilmDetails: {} as FilmInDetails,
  similarFilms: [],
  promoFilm: {} as FilmInDetails,
  reviews: [],
  isFilmsLoading: false,
  genresList: [],
  hasError: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    cleanFavoriteFilms: (state) => {
      state.favoriteFilms = [];
    },
    clearError: (state) => {
      state.hasError = false;
    }
  },
  extraReducers(builder) {
    builder
    // СПИСОК ФИЛЬМОВ
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.allFilms = action.payload;
        state.genresList = [ALL_GENRES].concat([
          ...new Set(action.payload.map((film) => film.genre)),
        ]);
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })
      // СПИСОК ФИЛЬМОВ К ПРОСМОТРУ
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.favoriteFilms = action.payload;
      })
      // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ФИЛЬМЕ
      .addCase(fetchFilmDetail.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmDetail.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.currentFilmDetails = action.payload;
        state.hasError = false;
      })
      .addCase(fetchFilmDetail.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })
      // СПИСОК ПОХОЖИХ ФИЛЬМОВ
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.similarFilms = action.payload;
        state.hasError = false;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })
      // СПИСОК КОММЕНТАРИЕВ К ФИЛЬМУ
      .addCase(fetchComments.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.reviews = action.payload;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })
      // ИНФОРМАЦИЯ О ПРОМО ФИЛЬМЕ
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.isFilmsLoading = false;
        state.promoFilm = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPromoFilm.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      });
  },
});

export const {cleanFavoriteFilms, clearError} = appData.actions;
