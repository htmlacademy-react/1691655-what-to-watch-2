import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import Logo from '../../components/logo';
import DescriptionTabsComponent from '../../components/descrptiion-tabs/description-tabs-component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmsList from '../../components/films-list';
import {
  fetchComments,
  fetchFilmDetail,
  fetchSimilarFilms,
} from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';
import { getComments, getCurrentFilm, getSimilarFilms } from '../../store/app-data/selectors';
import FilmPageHeader from '../../components/film-page-header';

function FilmPage(): JSX.Element {
  const { id: filmId } = useParams();
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getCurrentFilm);
  const currentFilmComments = useAppSelector(getComments);
  const sameGenreFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    if (filmId && filmId !== currentFilm.id) {
      dispatch(fetchFilmDetail(filmId));
      dispatch(fetchSimilarFilms(filmId));
      dispatch(fetchComments(filmId));
    }
  }, []);

  if (!currentFilm) {
    return <NotFoundPage />;
  }

  if (Object.keys(currentFilm).length === 0) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <FilmPageHeader currentFilm={currentFilm} />

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={currentFilm.posterImage}
                alt={`${currentFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <DescriptionTabsComponent
              currentFilm={currentFilm}
              currentFilmComments={currentFilmComments}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList filmsList={sameGenreFilms} />
        </section>

        <footer className="page-footer">
          <Logo />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmPage;
