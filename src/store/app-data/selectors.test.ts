import { NameSpace } from '../../const';
import {
  makeFakeBrieflyFilm,
  makeFakeFilmInDetails,
  makeFakeGenres,
} from '../../utils/mock';
import { randomIntFromInterval } from '../../utils/utils';
import { getAllFilms } from './selectors';

describe('AppData selectors', () => {
  const state = {
    [NameSpace.Data]: {
      allFilms: Array.from({ length: randomIntFromInterval(0, 20) }, () =>
        makeFakeBrieflyFilm()
      ),
      favoriteFilms: Array.from({ length: randomIntFromInterval(0, 20) }, () =>
        makeFakeBrieflyFilm()
      ),
      currentFilmDetails: makeFakeFilmInDetails(),
      similarFilms: Array.from({ length: randomIntFromInterval(0, 20) }, () =>
        makeFakeBrieflyFilm()
      ),
      promoFilm: makeFakeFilmInDetails(),
      reviews: [],
      isFilmsLoading: false,
      genresList: makeFakeGenres(),
      hasError: false,
    },
  };

  it('should return all films', () => {
    const { allFilms } = state[NameSpace.Data];
    const result = getAllFilms(state);

    expect(result).toEqual(allFilms);
  });
});
