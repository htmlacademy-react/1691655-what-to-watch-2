import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, addMoreFilms } from './actions';
import { filmsBrieflyList } from '../mock/filmsBrieflyList';
import { ALL_GENRES, Setting } from '../const';

const initialState = {
  genre: ALL_GENRES,
  genreFilteredFilms: filmsBrieflyList,
  genresList: [ALL_GENRES].concat([...new Set(filmsBrieflyList.map((film) => film.genre))]),
  showedFilmsNumber: Setting.filmCardsNumber,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMoreFilms, (state) => {
      if (state.showedFilmsNumber + Setting.filmCardsNumber < filmsBrieflyList.length) {
        state.showedFilmsNumber += Setting.filmCardsNumber;
      } else {
        state.showedFilmsNumber = filmsBrieflyList.length;
      }
    })
    .addCase(changeGenre, (state, action) => {
      state.showedFilmsNumber = Setting.filmCardsNumber;
      state.genre = action.payload.genre;
      state.genreFilteredFilms = filmsBrieflyList.filter((film) => {
        if (action.payload.genre === ALL_GENRES) {
          return true;
        } else {
          return film.genre === action.payload.genre;
        }
      });
    });
});
