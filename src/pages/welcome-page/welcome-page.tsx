import { Link } from 'react-router-dom';
import FilmsList from '../../components/films-list';
import { FilmInDetails } from '../../types/film';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import { useAppSelector } from '../../hooks';
import { GenresList } from '../../components/genres-list';

type WecomeScreenProps = {
  filmCardsNumber: number;
  welcomeFilm: FilmInDetails;
  favoriteFilmsNumber: number;
}

function WelcomePage({ filmCardsNumber, welcomeFilm, favoriteFilmsNumber }: WecomeScreenProps): JSX.Element {
  const currentFilms = useAppSelector((state) => state.films);
  const genresList = useAppSelector((state) => state.genresList);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={welcomeFilm.backgroundImage} alt={welcomeFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to="/" className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={welcomeFilm.posterImage} alt={`${welcomeFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{welcomeFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{welcomeFilm.genre}</span>
                <span className="film-card__year">{welcomeFilm.released}</span>
              </p>
              <div className="film-card__buttons">

                <Link className='btn btn--play film-card__button' to={`/player/${welcomeFilm.id}`}>
                  <SvgIcon viewBoxSize={[19, 19]} iconRes={[19, 19]} linkHref='#play-s' />
                  <span>Play</span>
                </Link>

                <Link className='btn btn--play film-card__button' to={'/my-list'}>
                  <SvgIcon viewBoxSize={[19, 19]} iconRes={[19, 20]} linkHref='#add' />
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

          <FilmsList filmCardsNumber = {filmCardsNumber} filmsList={currentFilms} />
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
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
