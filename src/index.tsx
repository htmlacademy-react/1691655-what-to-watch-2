import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmsBrieflyList } from './mock/filmsBrieflyList';
import { filmsInDetailsList } from './mock/filmsDetailList';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchFilms } from './store/api-actions';
import { ErrorMessage } from './components/error-message/error-message';

store.dispatch(fetchFilms());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        filmsBrieflyList = {filmsBrieflyList}
        filmsInDetailsList = {filmsInDetailsList}
      />
    </Provider>
  </React.StrictMode>
);
