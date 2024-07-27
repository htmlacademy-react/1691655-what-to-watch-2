import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { FilmBriefly, FilmComment, FilmInDetails } from './film';

export type AppData = {
    allFilms: FilmBriefly[];
    favoriteFilms: FilmBriefly[];
    similarFilms: FilmBriefly[];
    currentFilmDetails: FilmInDetails;
    reviews: FilmComment[];
    isFilmsLoading: boolean;
    genresList: string[];
    hasError: boolean;
}

export type AppProcess = {
    genre: string;
    filmsToShow: FilmBriefly[];
    showedFilmsNumber: number;
}
export type UserProcess = {
    login: string | null;
    avatarUrl: string | null;
    authorizationStatus: AuthorizationStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
