import { faker } from '@faker-js/faker';
import { randomIntFromInterval } from './utils';
import { MAX_FILM_LENTH } from '../const';
import { FilmBriefly, FilmInDetails } from '../types/film';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createApi } from '../services/api';

const MAX_GENRES_NUMBER = 8;
const MIN_RELEASE_YEAR = 1990;
const MAX_RELEASE_YEAR = 2024;
const MAX_ACTORS_NUMBER = 6;

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const makeFakeBrieflyFilm = (): FilmBriefly => ({
  id: faker.number.int().toString(),
  name: faker.music.songName(),
  previewImage: faker.image.url(),
  previewVideoLink: faker.internet.url(),
  genre: faker.music.genre(),
});

export const makeFakeFilmInDetails = (): FilmInDetails => ({
  id: faker.number.int().toString(),
  name: faker.music.songName(),
  posterImage: faker.image.url(),
  backgroundImage: faker.image.url(),
  backgroundColor: faker.color.rgb(),
  videoLink: faker.image.url(),
  description: faker.lorem.sentences(),
  rating: Math.floor(Math.random() * 5),
  scoresCount: faker.number.int(),
  director: faker.person.fullName(),
  starring: Array.from(
    { length: randomIntFromInterval(0, MAX_ACTORS_NUMBER) },
    () => faker.person.fullName()
  ),
  runTime: randomIntFromInterval(1, MAX_FILM_LENTH),
  genre: faker.music.genre(),
  released: randomIntFromInterval(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR),
  isFavorite: Math.random() > 0.5,
});

export const makeFakeGenres = () => [
  ...new Set(
    Array.from({ length: MAX_GENRES_NUMBER }, () => faker.music.genre())
  ),
];
