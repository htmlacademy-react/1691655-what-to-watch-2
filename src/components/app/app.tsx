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
        <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
