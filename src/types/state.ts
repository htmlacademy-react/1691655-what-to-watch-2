import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { FilmBriefly, FilmComment, FilmInDetails } from './film';

export type AppData = {
    allFilms: FilmBriefly[];
    favoriteFilms: FilmBriefly[];
    similarFilms: FilmBriefly[];
    promoFilm: FilmInDetails;
    currentFilmDetails: FilmInDetails;
    reviews: FilmComment[];
    isLoading: boolean;
    genresList: string[];
    hasError: boolean;
}

export type AppProcess = {
    genre: string;
    showedFilmsNumber: number;
}
export type UserProcess = {
    login: string | null;
    avatarUrl: string | null;
    authorizationStatus: AuthorizationStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
