import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/welcome-page/welcome-screen';
import SignInPage from '../../pages/sign-in-page/sign-in';
import MyListPage from '../../pages/my-list-page/my-list';
import FilmPage from '../../pages/film-page/film';
import AddReviewPage from '../../pages/add-review-page/add-review';
import PlayerPage from '../../pages/player-page/player';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppScreenProps = {
  filmCardsNumber: number;
}


function App({ filmCardsNumber }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage filmCardsNumber={filmCardsNumber} />} />
        <Route path={AppRoute.Login} element={<SignInPage />}/>
        <Route path='/mylist' element={
          <PrivateRoute 
            authorizationStatus={AuthorizationStatus.NoAuth}
          >
            <MyListPage />
          </PrivateRoute>} />
        <Route path='/film/:id' element={<FilmPage />} />
        <Route path='/film/:id/review' element={<AddReviewPage />} />
        <Route path='/player/:id' element={<PlayerPage />} />
        <Route path='*' element={<h1>Ошибка 404. Страница не существует.</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
