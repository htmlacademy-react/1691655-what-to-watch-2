import { Link } from "react-router-dom";
import SvgIcon from "./icon";
import { LoginButton } from "./login-button";
import Logo from "./logo";
import { getFavoriteFilms } from "../store/app-data/selectors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FilmInDetails } from "../types/film";
import { fetchFavoriteFilms, fetchFilmDetail, postFavoriteStatus } from "../store/api-actions";

type FilmPageHeaderProps = {
  currentFilm: FilmInDetails;
}

function FilmPageHeader ({currentFilm}: FilmPageHeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteFilmsNumber = useAppSelector(getFavoriteFilms).length;

  const onClickFavorite = () => {
    if (currentFilm.id) {
      dispatch(
        postFavoriteStatus({
          id: currentFilm.id,
          status: currentFilm.isFavorite ? 0 : 1,
        })
      );
      dispatch(fetchFavoriteFilms());
      dispatch(fetchFilmDetail(currentFilm.id));
    }
  };

  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />
        <LoginButton />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{currentFilm.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{currentFilm.genre}</span>
            <span className="film-card__year">{currentFilm.released}</span>
          </p>
          <div className="film-card__buttons">
            <Link
              className="btn btn--play film-card__button"
              to={`/player/${currentFilm.id}`}
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
              {currentFilm.isFavorite ? (
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
                {favoriteFilmsNumber}
              </span>
            </Link>
            <Link
              to={`/film/${currentFilm.id}/review`}
              className="btn film-card__button"
            >
              Add review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmPageHeader;