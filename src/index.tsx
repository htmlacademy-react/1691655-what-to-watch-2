import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { filmsBrieflyList } from './mock/filmsBrieflyList';
import { filmsInDetailsList } from './mock/filmsDetailList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmCardsNumber = {Setting.filmCardsNumber}
      filmsBrieflyList = {filmsBrieflyList}
      filmsInDetailsList = {filmsInDetailsList}
    />
  </React.StrictMode>
);
