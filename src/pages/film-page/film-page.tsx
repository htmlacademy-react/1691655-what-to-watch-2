import { Link, useParams } from 'react-router-dom';
import { FilmInDetails } from '../../types/film';
import NotFoundPage from '../not-found-page/not-found-page';
import SvgIcon from '../../components/icon';
import Logo from '../../components/logo';
import Tabs from '../../components/tabs/tabs-component';

type FilmPageProps = {
  filmsInDetailsList: FilmInDetails[];
  favoriteFilmsNumber: number;
}

function FilmPage({filmsInDetailsList, favoriteFilmsNumber}: FilmPageProps): JSX.Element {
  const { id } = useParams();
  const currentFilm = filmsInDetailsList.find((film) => film.id === id);
  if (!currentFilm) {
    return <NotFoundPage />;
  }

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

            <Tabs currentFilm={currentFilm} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <Link className="small-film-card__link" to="#">Fantastic Beasts: The Crimes of Grindelwald</Link>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Aviator</a>
              </h3>
            </article>
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

export default FilmPage;
