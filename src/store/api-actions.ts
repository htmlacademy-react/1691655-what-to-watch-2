import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { FilmBriefly, FilmComment, FilmInDetails } from '../types/film';
import { APIRoute } from '../const';
import { AuthData, UserData } from '../types/user-data';
import { addComment, loadFilmDetails } from './actions';

// ЗАПРАШИВАЕТ СПИСОК ФИЛЬМОВ С КРАТКОЙ ИНФОРМАЦИЕЙ
export const fetchFilms = createAsyncThunk<
  FilmBriefly[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_args, { extra: api }) => {
  const { data } = await api.get<FilmBriefly[]>(APIRoute.Films);

  return data;
});

// ЗАПРАШИВАЕТ СПИСОК ФИЛЬМОВ К ПРОСМОТРУ
export const fetchFavoriteFilms = createAsyncThunk<
  FilmBriefly[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteFilms', async (_args, { extra: api }) => {
  const { data } = await api.get<FilmBriefly[]>(APIRoute.Favorite);

  return data;
});

// ЗАПРАШИВАЕТ ДЕТАЛЬНУЮ ИНФОРМАЦИЮ О ФИЛЬМЕ
export const fetchFilmDetail = createAsyncThunk<
  FilmInDetails,
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmDetail', async (id: string, { extra: api }) => {
  const { data } = await api.get<FilmInDetails>(`${APIRoute.Films}/${id}`);

  return data;
});

// ЗАПРАШИВАЕТ СПИСОК ПОХОЖИХ ФИЛЬМОВ
export const fetchSimilarFilms = createAsyncThunk<
  FilmBriefly[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (id: string, { extra: api }) => {
  const { data } = await api.get<FilmBriefly[]>(
    `${APIRoute.Films}/${id}/similar`
  );

  return data;
});

// ЗАПРАШИВАЕТ ПРОМО ФИЛЬМ
export const fetchPromoFilm = createAsyncThunk<
  FilmInDetails,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromo', async (_args, { extra: api}) => {
  const { data } = await api.get<FilmInDetails>(APIRoute.Promo);

  return data;
});

// ИЗМЕНЯЕТ СТАТУС ФИЛЬМА К ПРОСМОТРУ
export const postFavoriteStatus = createAsyncThunk<
  void,
  {
    id: string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postFavoriteStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<FilmInDetails>(
      `${APIRoute.Favorite}/${id}/${status}`
    );

    dispatch(loadFilmDetails(data));
  }
);

// ЗАПРАШИВАЕТ СПИСОК КОММЕНТАРИЕВ К ФИЛЬМУ
export const fetchComments = createAsyncThunk<
  FilmComment[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id: string, { extra: api }) => {
  const { data } = await api.get<FilmComment[]>(`${APIRoute.Comments}/${id}`);

  return data;
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
>(
  'data/postReview',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<FilmComment>(
      `${APIRoute.Comments}/${filmId}`,
      { comment, rating }
    );

    dispatch(addComment(data));
  }
);

export const checkAuth = createAsyncThunk<
  UserData,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_args, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<
  {
    name: string;
    token: string | null;
    avatarUrl: string | null;
  },
  AuthData,
  {
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const {
      data: { name, token, avatarUrl },
    } = await api.post<UserData>(APIRoute.Login, { email, password });

    return {
      name: name,
      token: token,
      avatarUrl: avatarUrl,
    };
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
});
