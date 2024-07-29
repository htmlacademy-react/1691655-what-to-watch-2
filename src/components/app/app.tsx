import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import { checkAuth, fetchFavoriteFilms, fetchFilms } from '../../store/api-actions';
import { useEffect } from 'react';
import {
  getFavoriteFilms,
  getFilmsLoadingStatus,
} from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loadingStatus = useAppSelector(getFilmsLoadingStatus);
  const favoriteFilmsNumber = useAppSelector(getFavoriteFilms).length;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || loadingStatus) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<WelcomePage />} />
          <Route path={AppRoute.Login} element={<SignInPage />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<FilmPage favoriteFilmsNumber={favoriteFilmsNumber} />}
          />
          <Route
            path={AppRoute.Review}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewPage />
              </PrivateRoute>
            }
          />
          {/* <Route path={AppRoute.Player} element={<PlayerPage filmsForPlay={filmsBrieflyList}/>} /> */}
          <Route
            path="*"
            element={<h1>Ошибка 404. Страница не существует.</h1>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
