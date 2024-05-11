import { Link } from 'react-router-dom';
import { FilmBriefly } from '../types/film';

type FilmCardProps = {
  filmBriefly: FilmBriefly;
  isPlayerActive: boolean;
  renderPlayer: (src: string) => JSX.Element;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

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
            <a className="small-film-card__link" href="film-page.html">{filmBriefly.name}</a>
          </h3>
        </>}
    </Link>
  );
}

export default FilmCard;
