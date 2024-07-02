import { Link } from 'react-router-dom';
import FilmsList from '../../components/films-list';
import { FilmInDetails } from '../../types/film';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { GenresList } from '../../components/genres-list';
import { ShowMoreButton } from '../../components/show-more-button';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';

type WecomeScreenProps = {
  welcomeFilm: FilmInDetails;
  favoriteFilmsNumber: number;
};

function WelcomePage({
  welcomeFilm,
  favoriteFilmsNumber,
}: WecomeScreenProps): JSX.Element {
  const currentFilms = useAppSelector((state) => state.filmsToShow);
  const genresList = useAppSelector((state) => state.genresList);
  const showedFilmsNumber = useAppSelector((state) => state.showedFilmsNumber);
  const totalFilmsNumber = useAppSelector((state) => state.filmsToShow.length);
  const avatarUrl = useAppSelector((state) => state.avatarUrl);
  const isAuth =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  const onSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={welcomeFilm.backgroundImage} alt={welcomeFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          {isAuth ? (
            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src={avatarUrl ? avatarUrl : ''}
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <Link
                  onClick={onSignOut}
                  to={AppRoute.Root}
                  className="user-block__link"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          ) : (
            <div className="user-block">
              <Link to={AppRoute.Login} className="user-block__link">
                Sign in
              </Link>
            </div>
          )}
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={welcomeFilm.posterImage}
                alt={`${welcomeFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{welcomeFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{welcomeFilm.genre}</span>
                <span className="film-card__year">{welcomeFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  to={`/player/${welcomeFilm.id}`}
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
                  to={'/my-list'}
                >
                  <SvgIcon
                    viewBoxSize={[19, 19]}
                    iconRes={[19, 20]}
                    linkHref="#add"
                  />
                  <span>My list</span>
                  <span className="film-card__count">
                    {favoriteFilmsNumber}
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

          {showedFilmsNumber < totalFilmsNumber ? <ShowMoreButton /> : null}
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
