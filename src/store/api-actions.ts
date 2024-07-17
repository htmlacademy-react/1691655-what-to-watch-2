import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { FilmBriefly, FilmComment, FilmInDetails } from '../types/film';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {
  addComment,
  loadComments,
  loadFavoriteFilms,
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


// ЗАПРАШИВАЕТ СПИСОК ФИЛЬМОВ С КРАТКОЙ ИНФОРМАЦИЕЙ
export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_args, { dispatch, extra: api }) => {
  // ПОКАЗЫВАЕТ СПИННЕР НА ВРЕМЯ ЗАГРУЗКИ
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmBriefly[]>(APIRoute.Films);
  dispatch(setFilmsDataLoadingStatus(false));

  dispatch(loadFilms(data));
});

// ЗАПРАШИВАЕТ СПИСОК ФИЛЬМОВ К ПРОСМОТРУ
export const fetchFavoriteFilms = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteFilms', async(_args, { dispatch, extra: api}) => {
  const { data } = await api.get<FilmBriefly[]>(APIRoute.Favorite);

  dispatch(loadFavoriteFilms(data));
});

// ЗАПРАШИВАЕТ ДЕТАЛЬНУЮ ИНФОРМАЦИЮ О ФИЛЬМЕ
export const fetchFilmDetail = createAsyncThunk<
  FilmInDetails,
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

  // console.log('fetch films details..');

  dispatch(loadFilmDetails(data));
  return data;
});

// ЗАПРАШИВАЕТ СПИСОК ПОХОЖИХ ФИЛЬМОВ
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

  // console.log('fetch similar films..');

  dispatch(loadSimilarFilms(data));
});

// ИЗМЕНЯЕТ СТАТУС ФИЛЬМА К ПРОСМОТРУ
export const postFavoriteStatus = createAsyncThunk<
  void,
  {
    id:string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postFavoriteStatus', async ({id, status}, {dispatch, extra: api}) => {
  const { data } = await api.post<FilmInDetails>(`${APIRoute.Favorite}/${id}/${status}`);

  dispatch(loadFilmDetails(data));
});

// ЗАПРАШИВАЕТ СПИСОК КОММЕНТАРИЕВ К ФИЛЬМУ
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

  // console.log('fetch comments.. ');

  dispatch(loadComments(data));
});

// ОТПРАВЛЯЕТ НОВЫЙ КОММЕНТАРИЙ К ФИЛЬМУ
export const postReview = createAsyncThunk<
  void,
  {
    filmId: string;
    comment: string;
    rating: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postReview', async ({filmId, comment, rating}, {dispatch, extra: api}) => {
  const { data } = await api.post<FilmComment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});

  dispatch(addComment(data));
});

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
