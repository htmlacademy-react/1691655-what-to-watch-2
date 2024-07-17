import { Link } from 'react-router-dom';
import { FilmCardProps } from '../types/film';

function FilmCard({filmBriefly, onMouseLeave, onMouseOver, isPlayerActive, renderPlayer}: FilmCardProps): JSX.Element {

  return (
    <Link
      to={`/film/${filmBriefly.id}`}
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
            <span className="small-film-card__link">{filmBriefly.name}</span>
          </h3>
        </>}
    </Link>
  );
}

export default FilmCard;
