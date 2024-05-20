import { FilmInDetails } from '../../types/film';

function OverviewTab(currentFilm: FilmInDetails): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{ currentFilm.rating }</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">250 ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{ currentFilm.description }</p>

        <p className="film-card__director"><strong>Director: { currentFilm.director }</strong></p>

        <p className="film-card__starring"><strong>Starring: { currentFilm.starring.join(', ') } and other</strong></p>
      </div>
    </>
  );
}

export default OverviewTab;
