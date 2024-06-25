import { createAction } from '@reduxjs/toolkit';
import { FilmBriefly } from '../types/film';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction<{genre: string}>('films/changeGenre');

export const showMoreFilms = createAction('welcomePage/showMoreFilms');

export const loadFilms = createAction<FilmBriefly[]>('data/loadFilms');

export const requiredAuthorization = createAction<AuthorizationStatus>('user/requiredAuthorization');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
