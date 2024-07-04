import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { FilmBriefly, FilmComment, FilmInDetails } from '../types/film';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {
  loadComments,
  loadFilmDetails,
  loadFilms,
  loadSimilarFilms,
  requireAuthorization,
  saveAvatarUrl,
  setError,
  setFilmsDataLoadingStatus,
} from './actions';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';


// Запрашивает список фильмов с краткой информацией
export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_args, { dispatch, extra: api }) => {
  // Показывает спиннер на время загрузки
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmBriefly[]>(APIRoute.Films);
  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadFilms(data));
});

// Запрашивает детальную информацию о фильме
export const fetchFilmDetail = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmDetail', async (id: string, {dispatch, extra: api}) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmInDetails>(`${APIRoute.Films}/${id}`);
  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadFilmDetails(data));
});

// Запрашивает список похожих фильмов
export const fetchSimilarFilms = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (id: string, {dispatch, extra: api}) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmBriefly[]>(`${APIRoute.Films}/${id}/similar`);
  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadSimilarFilms(data));
});

// Запрашивает список комментариев к фильму
export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id: string, {dispatch, extra: api}) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmComment[]>(`${APIRoute.Comments}/${id}`);
  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadComments(data));
})

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_args, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token, avatarUrl },
    } = await api.post<UserData>(APIRoute.Login, { email, password });

    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(saveAvatarUrl(avatarUrl));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(saveAvatarUrl(null));
});

export const clearErrorAction = createAsyncThunk('server/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
