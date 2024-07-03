import { createAction } from '@reduxjs/toolkit';
import { FilmBriefly, FilmInDetails } from '../types/film';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction<{genre: string}>('films/changeGenre');

export const showMoreFilms = createAction('welcomePage/showMoreFilms');

export const loadFilms = createAction<FilmBriefly[]>('data/loadFilms');

export const loadFilmDetails = createAction<FilmInDetails>('data/loadFilmDetails');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setError = createAction<string | null>('server/setError');

export const saveAvatarUrl = createAction<string | null>('user/saveAvatar');
