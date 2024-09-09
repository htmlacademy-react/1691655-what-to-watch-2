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
import { checkAuth, fetchFavoriteFilms, fetchFilms, fetchPromoFilm } from '../../store/api-actions';
import { useEffect } from 'react';
import { getLoadingStatus } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import PlayerPage from '../../pages/player-page/player-page';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(checkAuth());
    dispatch(fetchPromoFilm());
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
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
          <Route path={AppRoute.Film} element={<FilmPage />} />
          <Route
            path={AppRoute.Review}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Player} element={<PlayerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
