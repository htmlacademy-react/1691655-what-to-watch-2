import { createAction } from "@reduxjs/toolkit";

export const changeGenre = createAction<{genre: string}>('films/changeGenre');

export const addMoreFilms = createAction('welcomePage/addMoreFilms');