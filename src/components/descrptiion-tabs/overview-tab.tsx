import { FilmInDetails } from '../../types/film';

const getGradeDecription = (grade: number) => {
  switch(true) {
    case (grade === 10):
      return 'Awesome';
    case (grade >= 8): 
      return 'Very good';
    case (grade >= 5):
      return 'Good';
    case (grade >= 3):
      return 'Normal';
    default:
      return 'Bad';

  }
}

function OverviewTab(currentFilm: FilmInDetails): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{ currentFilm.rating }</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ getGradeDecription(currentFilm.rating) }</span>
          <span className="film-rating__count">{ currentFilm.scoresCount } ratings</span>
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
