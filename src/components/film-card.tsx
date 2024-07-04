import { Link } from 'react-router-dom';
import { FilmCardProps } from '../types/film';
import { store } from '../store';
import { fetchComments, fetchFilmDetail, fetchSimilarFilms } from '../store/api-actions';

function FilmCard({filmBriefly, onMouseLeave, onMouseOver, isPlayerActive, renderPlayer}: FilmCardProps): JSX.Element {
  const filmId = filmBriefly.id;

  const handleClick = () => {
    store.dispatch(fetchFilmDetail(filmId));
    store.dispatch(fetchSimilarFilms(filmId));
    store.dispatch(fetchComments(filmId));
  }

  return (
    <Link
      to={`/film/${filmId}`}
      onClick={handleClick}
      className="small-film-card catalog__films-card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isPlayerActive
        ? renderPlayer(filmBriefly.previewVideoLink)
        :
        <>
          <div className="small-film-card__image">
            <img src={filmBriefly.previewImage} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
          </div>
          <h3 className="small-film-card__title">
            <Link className="small-film-card__link" to="#">{filmBriefly.name}</Link>
          </h3>
        </>}
    </Link>
  );
}

export default FilmCard;
