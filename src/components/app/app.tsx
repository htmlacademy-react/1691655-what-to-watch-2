import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { FilmBriefly, FilmInDetails } from '../../types/film';

type AppScreenProps = {
  filmCardsNumber: number;
  filmsBrieflyList: FilmBriefly[];
  filmsInDetailsList: FilmInDetails[];
}

function App({ filmCardsNumber, filmsBrieflyList, filmsInDetailsList }: AppScreenProps): JSX.Element {
  const favoriteFilmsInDetails = filmsInDetailsList.filter((film) => film.isFavorite);
  const findBrieflyFilmById = (id: string) => filmsBrieflyList.find((brieflyFilm) => brieflyFilm.id === id) as FilmBriefly;
  const favoriteBrieflyFilms = favoriteFilmsInDetails.map((film) => findBrieflyFilmById(film.id));
  const welcomeRandomFilm = filmsInDetailsList[Math.floor(Math.random() * filmsInDetailsList.length)];

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={
          <WelcomePage
            filmCardsNumber={filmCardsNumber}
            welcomeFilm={welcomeRandomFilm}
            favoriteFilmsNumber={favoriteBrieflyFilms.length}
          />
        }
        />
        <Route path={AppRoute.Login} element={<SignInPage />}/>
        <Route path={AppRoute.MyList} element=
          {
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <MyListPage favoriteFilmsList = {favoriteBrieflyFilms}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={
          <FilmPage
            filmsInDetailsList={filmsInDetailsList}
            favoriteFilmsNumber={favoriteBrieflyFilms.length}
            filmsList={filmsBrieflyList}
          />
        }
        />
        <Route path={AppRoute.Review} element={<AddReviewPage filmsInDetailsList={filmsInDetailsList}/>} />
        <Route path={AppRoute.Player} element={<PlayerPage filmsForPlay={filmsBrieflyList}/>} />
        <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
