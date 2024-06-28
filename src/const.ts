export const enum Setting {
  filmCardsNumber = 8,
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/my-list',
  Review = '/film/:id/review',
  Player = '/player/:id',
  Film = '/film/:id',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum Tabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}

export const ALL_GENRES = 'All genres';
export const BACKEND_URL = 'https://13.design.htmlacademy.pro/wtw';
export const REQUEST_TIMEOUT = 5000;
