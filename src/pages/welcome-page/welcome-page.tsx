import { Link, useLocation } from 'react-router-dom';
import FilmsList from '../../components/films-list';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresList } from '../../components/genres-list';
import { ShowMoreButton } from '../../components/show-more-button';
import { useEffect } from 'react';
import { LoginButton } from '../../components/login-button';
import {
  getProcessedFilms,
  getShowedFilmsNumber,
} from '../../store/app-process/selectors';
import {
  getFavoriteFilms,
  getGenresList,
  getPromoFilm,
} from '../../store/app-data/selectors';
import { defaultShowedFilmsNumber } from '../../store/app-process/app-process';
import {
  fetchFavoriteFilms,
  fetchPromoFilm,
  postFavoriteStatus,
} from '../../store/api-actions';
import { clearError } from '../../store/app-data/app-data';

function WelcomePage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentFilms = useAppSelector(getProcessedFilms);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const genresList = useAppSelector(getGenresList);
  const promoFilm = useAppSelector(getPromoFilm);
  const showedFilmsNumber = useAppSelector(getShowedFilmsNumber);

  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(defaultShowedFilmsNumber());
  }, [pathname]);

  const onClickFavorite = () => {
    if (promoFilm.id) {
      dispatch(
        postFavoriteStatus({
          id: promoFilm.id,
          status: promoFilm.isFavorite ? 0 : 1,
        })
      );
      dispatch(fetchFavoriteFilms());
      dispatch(fetchPromoFilm());
    }
  };

  dispatch(clearError());

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <LoginButton />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt={`${promoFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  to={`/player/${promoFilm.id}`}
                >
                  <SvgIcon
                    viewBoxSize={[19, 19]}
                    iconRes={[19, 19]}
                    linkHref="#play-s"
                  />
                  <span>Play</span>
                </Link>

                <Link
                  className="btn btn--play film-card__button"
                  to={{}}
                  onClick={onClickFavorite}
                >
                  {promoFilm.isFavorite ? (
                    <SvgIcon
                      viewBoxSize={[19, 19]}
                      iconRes={[19, 20]}
                      linkHref="#in-list"
                    />
                  ) : (
                    <SvgIcon
                      viewBoxSize={[19, 19]}
                      iconRes={[19, 20]}
                      linkHref="#add"
                    />
                  )}
                  <span>My list</span>
                  <span className="film-card__count">
                    {favoriteFilms.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genresList={genresList} />

          <FilmsList filmsList={currentFilms.slice(0, showedFilmsNumber)} />

          {showedFilmsNumber < currentFilms.length ? <ShowMoreButton /> : null}
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

export default WelcomePage;
