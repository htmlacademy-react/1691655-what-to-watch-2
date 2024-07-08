import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsLoading);
  const favoriteFilmsNumber = useAppSelector((state) => state.favoriteFilms).length;

  if (authorizationStatus === AuthorizationStatus.Unknown || isFilmsLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <WelcomePage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<SignInPage />}
          />
          <Route path={AppRoute.MyList} element=
            {
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film} element={
            <FilmPage
              favoriteFilmsNumber={favoriteFilmsNumber}
            />
          }
          />
          {/* <Route path={AppRoute.Review} element={<AddReviewPage filmsInDetailsList={filmsInDetailsList}/>} />
          <Route path={AppRoute.Player} element={<PlayerPage filmsForPlay={filmsBrieflyList}/>} /> */}
          <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
