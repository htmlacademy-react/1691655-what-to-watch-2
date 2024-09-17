import { ReviewGrades } from '../../const';
import { FilmInDetails } from '../../types/film';

const getGradeDescription = (grade: number) => {
  switch (true) {
    case grade === ReviewGrades.Awesome:
      return 'Awesome';
    case grade >= ReviewGrades.VeryGood:
      return 'Very good';
    case grade >= ReviewGrades.Good:
      return 'Good';
    case grade >= ReviewGrades.Normal:
      return 'Normal';
    default:
      return 'Bad';
  }
};

function OverviewTab(currentFilm: FilmInDetails): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm.rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {getGradeDescription(currentFilm.rating)}
          </span>
          <span className="film-rating__count">
            {currentFilm.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{currentFilm.description}</p>

        <p className="film-card__director">
          <strong>Director: {currentFilm.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {currentFilm.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}

export default OverviewTab;
