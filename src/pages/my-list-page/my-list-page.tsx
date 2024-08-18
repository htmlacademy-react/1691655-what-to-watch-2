import Logo from '../../components/logo';
import withVideoPlayer from '../../hocs/with-video-player';
import FilmCard from '../../components/film-card';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/app-data/selectors';

const FilmCardWrapped = withVideoPlayer(FilmCard);

function MyListPage(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            favoriteFilms
              .map(
                (film) => (
                  <FilmCardWrapped
                    key={`${film.id}`}
                    filmBriefly={film}
                    filmsList={favoriteFilms}
                  />)
              )
          }
        </div>
      </section>

      <footer className="page-footer">
        <Logo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListPage;
