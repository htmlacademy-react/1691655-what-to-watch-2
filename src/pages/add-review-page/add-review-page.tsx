import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MAXIMUM_REVIEW_STARS, MINIMUM_REVIEW_LENGTH } from '../../const';
import { postReview } from '../../store/api-actions';
import { LoginButton } from '../../components/login-button';
import Logo from '../../components/logo';

function AddReviewPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState<number>(0);

  const currentFilm = useAppSelector((state) => state.currentFilmDetails);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(
      postReview({
        filmId: currentFilm.id,
        comment: textAreaRef.current!.value,
        rating: starRating,
      })
    );

    navigate(`/film/${currentFilm.id}`);
  };

  const handleStarChange = (evt: FormEvent<HTMLInputElement>) => {
    setStarRating(MAXIMUM_REVIEW_STARS - Number(evt.currentTarget.value) + 1);
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value.length > MINIMUM_REVIEW_LENGTH) {
      textAreaRef.current?.setCustomValidity('');
    } else {
      textAreaRef.current?.setCustomValidity('Отзыв должен состоять из 50 символов минимум');
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
                <a href="film-page.html" className="breadcrumbs__link">
                  {currentFilm.name}
                </a>
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
        <form action="#" onSubmit={handleSubmit} className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {
                Array.from(Array(MAXIMUM_REVIEW_STARS), (el, index) => (
                  <React.Fragment key={index}>
                    <input
                      className="rating__input"
                      id={`star-${index + 1}`}
                      type="radio"
                      name="rating"
                      value={index + 1}
                      onChange={handleStarChange}
                    />
                    <label
                      className="rating__label"
                      htmlFor={`star-${index + 1}`}
                    >
                      Rating ${index + 1}
                    </label>
                  </React.Fragment>
                ))
              }
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
            >
            </textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
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
