import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MAXIMUM_REVIEW_LENGTH, MAXIMUM_REVIEW_STARS, MINIMUM_REVIEW_LENGTH } from '../../const';
import { fetchComments, postReview } from '../../store/api-actions';
import { LoginButton } from '../../components/login-button';
import Logo from '../../components/logo';
import { getCurrentFilm, getLoadingStatus } from '../../store/app-data/selectors';

function AddReviewPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState<number>(0);
  const [reviewTextValidity, setReviewTextValidity] = useState<boolean>(false);

  const currentFilm = useAppSelector(getCurrentFilm);
  const isLoading = useAppSelector(getLoadingStatus);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await dispatch(
      postReview({
        filmId: currentFilm.id,
        comment: textAreaRef.current!.value,
        rating: starRating,
      })
    );
    navigate(`/film/${currentFilm.id}`);
    dispatch(fetchComments(currentFilm.id));
  };

  const handleStarChange = (evt: FormEvent<HTMLInputElement>) => {
    setStarRating(MAXIMUM_REVIEW_STARS - Number(evt.currentTarget.value) + 1);
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const reviewLength = evt.target.value.length
    if (reviewLength >= MINIMUM_REVIEW_LENGTH && reviewLength <= MAXIMUM_REVIEW_LENGTH) {
      textAreaRef.current?.setCustomValidity('');
      setReviewTextValidity(true);
    } else {
      textAreaRef.current?.setCustomValidity(
        'Отзыв должен состоять из 50 символов минимум и 400 максимум'
      );
    }
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={currentFilm.backgroundImage}
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link 
                  className="breadcrumbs__link"
                  to={`/film/${currentFilm.id}`}
                >
                  {currentFilm.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <LoginButton />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={currentFilm.posterImage}
            alt={`${currentFilm.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          onSubmit={handleSubmit}
          className="add-review__form"
          id='add-review-form'
        >
          <div className="rating">
            <div className="rating__stars">
              {Array.from(Array(MAXIMUM_REVIEW_STARS), (el, index) => (
                <React.Fragment key={index}>
                  <input
                    className="rating__input"
                    id={`star-${index + 1}`}
                    type="radio"
                    name="rating"
                    value={index + 1}
                    onChange={handleStarChange}
                    disabled={isLoading}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${index + 1}`}
                  >
                    Rating ${index + 1}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              ref={textAreaRef}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              onChange={handleChangeText}
              disabled = {isLoading}
            ></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={!reviewTextValidity || starRating === 0 || isLoading}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReviewPage;
