import { createSelector } from '@reduxjs/toolkit';
import { ALL_GENRES, NameSpace } from '../../const';
import { FilmBriefly } from '../../types/film';
import { State } from '../../types/state';

export const getProcessedFilms = createSelector(
  [
    (state: State): FilmBriefly[] => state[NameSpace.Data].allFilms,
    (state: State): string => state[NameSpace.Process].genre,
  ],
  (allFilms, genre) =>
    allFilms.filter((film) => {
      if (genre === ALL_GENRES) {
        return true;
      } else {
        return genre === film.genre;
      }
    })
);

export const getShowedFilmsNumber = (state: State): number =>
  state[NameSpace.Process].showedFilmsNumber;

export const getGenre = (state: State): string =>
  state[NameSpace.Process].genre;
