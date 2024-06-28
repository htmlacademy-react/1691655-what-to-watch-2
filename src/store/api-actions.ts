import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { FilmBriefly } from '../types/film';
import { APIRoute } from '../const';
import { loadFilms, setFilmsDataLoadingStatus } from './actions';

export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_args, { dispatch, extra: api }) => {
  dispatch(setFilmsDataLoadingStatus(true));

  const { data } = await api.get<FilmBriefly[]>(APIRoute.Films);

  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadFilms(data));
});
