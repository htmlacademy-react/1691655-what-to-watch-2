import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { FilmInDetails } from '../../types/film';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { HelmetProvider } from 'react-helmet-async';
import { createApi } from '../../services/api';
import { useEffect, useState } from 'react';

// type AppScreenProps = {
//   filmsBrieflyList: FilmBriefly[];
//   filmsInDetailsList: FilmInDetails[];
// }

function App(): JSX.Element {
  const [welcomeRandomFilm, setWelcomeFilm] = useState<FilmInDetails>({} as FilmInDetails);

  useEffect(() => {
    async function getRandomFilmDetail() {
      const api = createApi();
      const id = currentFilms[Math.floor(Math.random() * currentFilms.length)].id;
      const { data } = await api.get<FilmInDetails>(`${APIRoute.Films}/${id}`);
  
      setWelcomeFilm(data);
    };

    if (!welcomeRandomFilm) {
      getRandomFilmDetail();
    }
  }, []);
  
  const currentFilms = useAppSelector((state) => state.filmsToShow);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsLoading);

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
              <WelcomePage
                welcomeFilm={welcomeRandomFilm}
                // favoriteFilmsNumber={favoriteBrieflyFilms.length}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<SignInPage />}
          />
          <Route path={AppRoute.MyList} element=
            {
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListPage favoriteFilmsList = {favoriteBrieflyFilms}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film} element={
            <FilmPage
              favoriteFilmsNumber={favoriteBrieflyFilms.length}
            />
          }
          />
          <Route path={AppRoute.Review} element={<AddReviewPage filmsInDetailsList={filmsInDetailsList}/>} />
          <Route path={AppRoute.Player} element={<PlayerPage filmsForPlay={filmsBrieflyList}/>} />
          <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
