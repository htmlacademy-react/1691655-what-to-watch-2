import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES, NameSpace, Setting } from '../../const';
import { FilmInDetails } from '../../types/film';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  genre: ALL_GENRES,
  filmsToShow: [],
  showedFilmsNumber: Setting.filmCardsNumber,
};

const appProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    showMoreFilms: (state) => {
      if (
        state.showedFilmsNumber + Setting.filmCardsNumber <
        state.filmsToShow.length
      ) {
        state.showedFilmsNumber += Setting.filmCardsNumber;
      } else {
        state.showedFilmsNumber = state.filmsToShow.length;
      }
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.showedFilmsNumber = Setting.filmCardsNumber;
      state.genre = action.payload;
    },
  },
});

export default appProcess;

export const {changeGenre, showMoreFilms} = appProcess.actions;
