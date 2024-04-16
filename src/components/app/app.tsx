import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-screen';
import SignInPage from '../../pages/sign-in-page/sign-in';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film';
import AddReviewPage from '../../pages/add-review-page/add-review';
import PlayerPage from '../../pages/player-page/player';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found';

type AppScreenProps = {
  filmCardsNumber: number;
}

function App({ filmCardsNumber }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomePage filmCardsNumber={filmCardsNumber} />} />
        <Route path={AppRoute.Login} element={<SignInPage />}/>
        <Route path={AppRoute.MyList} element=
          {
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<FilmPage />} />
        <Route path={AppRoute.Review} element={<AddReviewPage />} />
        <Route path={AppRoute.Player} element={<PlayerPage />} />
<<<<<<< HEAD
        <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
=======
        <Route path='*' element={<NotFoundPage />} />
>>>>>>> module3-task1
      </Routes>
    </BrowserRouter>
  );
}

export default App;
