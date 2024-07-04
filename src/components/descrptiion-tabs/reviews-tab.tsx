import dayjs from "dayjs";
import { FilmComment } from "../../types/film";

type RewiewTabProps = {
  filmComments: FilmComment[];
}

function ReviewsTab ({filmComments}: RewiewTabProps): JSX.Element {
  const halfCommentsArray = Math.ceil(filmComments.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          filmComments.slice(0, halfCommentsArray).map((review) => (
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{ review.comment }</p>

                <footer className="review__details">
                  <cite className="review__author">{ review.user }</cite>
                  <time className="review__date" dateTime="2016-12-24">{ dayjs(review.date).format('MMMM DD, YYYY') }</time>
                </footer>
              </blockquote>

              <div className="review__rating">{ review.rating }</div>
            </div>
          ))
        }
      </div>

      <div className="film-card__reviews-col">
        {
          filmComments.slice(halfCommentsArray).map((review) => (
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{ review.comment }</p>

                <footer className="review__details">
                  <cite className="review__author">{ review.user }</cite>
                  <time className="review__date" dateTime="2016-12-24">{ review.date }</time>
                </footer>
              </blockquote>

              <div className="review__rating">{ dayjs(review.date).format('MMMM DD, YYYY') }</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReviewsTab;
