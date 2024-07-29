import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALL_GENRES, NameSpace, Setting } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  genre: ALL_GENRES,
  showedFilmsNumber: Setting.filmCardsNumber,
};

const appProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    defaultShowedFilmsNumber: (state) => {state.showedFilmsNumber = Setting.filmCardsNumber},
    showMoreFilms: (state) => {
      state.showedFilmsNumber += Setting.filmCardsNumber;
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.showedFilmsNumber = Setting.filmCardsNumber;
      state.genre = action.payload;
    },
  },
});

export default appProcess;

export const {changeGenre, showMoreFilms, defaultShowedFilmsNumber} = appProcess.actions;
