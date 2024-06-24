import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { filmsBrieflyList } from './mock/filmsBrieflyList';
import { filmsInDetailsList } from './mock/filmsDetailList';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFilms } from './store/api-actions';

store.dispatch(fetchFilms());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmCardsNumber = {Setting.filmCardsNumber}
        filmsBrieflyList = {filmsBrieflyList}
        filmsInDetailsList = {filmsInDetailsList}
      />
    </Provider>
  </React.StrictMode>
);
