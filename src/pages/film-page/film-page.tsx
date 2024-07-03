import { Link, useParams } from 'react-router-dom';
import { FilmBriefly, FilmInDetails } from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import DescriptionTabsComponent from '../../components/descrptiion-tabs/description-tabs-component';
import { shuffleArray } from '../../utils';
import FilmsList from '../../components/films-list';
import { fetchFilmDetail } from '../../store/api-actions';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';

type FilmPageProps = {
  currentFilm: FilmInDetails;
  favoriteFilmsNumber: number;
  // filmsList: FilmBriefly[];
}

function FilmPage({favoriteFilmsNumber}: FilmPageProps): JSX.Element {
  // const { id } = useParams();
  // if (id) {
  //   store.dispatch(fetchFilmDetail(id));
  // }
  const currentFilm = useAppSelector((state) => state.currentFilmDetails);

  console.log('Current film is: ', currentFilm);

  if (!currentFilm) {
    return <NotFoundPage />;
  }

  // const sameGenreFilms = shuffleArray(filmsList.filter((film) => film.genre === currentFilm.genre)).slice(0, 4);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
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
                <Link to="#" className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{ currentFilm.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ currentFilm.genre }</span>
                <span className="film-card__year">{ currentFilm.released }</span>
              </p>
              <div className="film-card__buttons">
                <Link className='btn btn--play film-card__button' to={`/player/${currentFilm.id}`}>
                  <SvgIcon viewBoxSize={[19, 19]} iconRes={[19, 19]} linkHref='#play-s' />

                  <span>Play</span>
                </Link>
                <Link className='btn btn--play film-card__button' to={'/my-list'}>
                  <SvgIcon viewBoxSize={[19, 19]} iconRes={[19, 20]} linkHref='#add' />

                  <span>My list</span>
                  <span className="film-card__count">{ favoriteFilmsNumber }</span>
                </Link>
                <Link to={`/film/${currentFilm.id}/review`} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327" />
            </div>

            <DescriptionTabsComponent currentFilm={currentFilm} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {/* <FilmsList filmsList={sameGenreFilms} /> */}

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
