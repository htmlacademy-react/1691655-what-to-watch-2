import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/user-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

const loginRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex =/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?!.*[^ a-zA-Z0-9]).*$/;

function SignInPage(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (passwordRef.current && loginRef.current) {
      if (!loginRegex.test(loginRef.current.value)) {
        setErrorMessage(
          'Введите корректный адрес эл.почты'
        );
      } else {
        if (!passwordRegex.test(passwordRef.current.value)) {
          setErrorMessage(
            'Пароль должен состоять минимум из одной буквы и цифры.'
          );
        } else {
          onSubmit({
            login: loginRef.current.value,
            password: passwordRef.current.value,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [navigate, authStatus]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Root} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          className="sign-in__form"
          id="sigh-in-form"
          method="post"
          action=""
          onSubmit={handleSubmit}
        >
          {errorMessage !== null ? (
            <div className="sign-in__message">
              <p>{errorMessage}</p>
            </div>
          ) : (
            ''
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="login-element"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password-element"
                onChange={() => setErrorMessage(null)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;
