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
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum NameSpace {
  Data = 'DATA',
  Process = 'PROCESS',
  User = 'USER',
}

export const ALL_GENRES = 'All genres';
export const BACKEND_URL = 'https://13.design.htmlacademy.pro/wtw';
export const REQUEST_TIMEOUT = 5000;
export const MAXIMUM_REVIEW_STARS = 10;
export const MINIMUM_REVIEW_LENGTH = 50;
