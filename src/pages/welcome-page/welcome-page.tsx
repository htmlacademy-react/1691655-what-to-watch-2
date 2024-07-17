import { Link } from 'react-router-dom';
import FilmsList from '../../components/films-list';
import { FilmInDetails } from '../../types/film';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import { useAppSelector } from '../../hooks';
import { GenresList } from '../../components/genres-list';
import { ShowMoreButton } from '../../components/show-more-button';
import { APIRoute } from '../../const';
import { useEffect, useState } from 'react';
import { createApi } from '../../services/api';
import { LoginButton } from '../../components/login-button';


function WelcomePage(): JSX.Element {
  const [welcomeRandomFilm, setWelcomeRandomFilm] = useState<FilmInDetails>({} as FilmInDetails);
  const currentFilms = useAppSelector((state) => state.filmsToShow);

  useEffect(() => {
    async function getRandomFilmDetail() {
      const api = createApi();
      const id = currentFilms[Math.floor(Math.random() * currentFilms.length)].id;
      const { data } = await api.get<FilmInDetails>(`${APIRoute.Films}/${id}`);

      setWelcomeRandomFilm(data);
    }

    if (Object.keys(welcomeRandomFilm).length === 0) {
      getRandomFilmDetail();
    }
  }, []);

  const favoriteFilms = useAppSelector((state) => state.favoriteFilms);
  const genresList = useAppSelector((state) => state.genresList);
  const showedFilmsNumber = useAppSelector((state) => state.showedFilmsNumber);
  const totalFilmsNumber = useAppSelector((state) => state.filmsToShow.length);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={welcomeRandomFilm.backgroundImage} alt={welcomeRandomFilm.name} />
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
                src={welcomeRandomFilm.posterImage}
                alt={`${welcomeRandomFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{welcomeRandomFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{welcomeRandomFilm.genre}</span>
                <span className="film-card__year">{welcomeRandomFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  to={`/player/${welcomeRandomFilm.id}`}
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
