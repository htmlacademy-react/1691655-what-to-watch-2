import { createReducer } from '@reduxjs/toolkit';
import { changeGenre } from './actions';
import { filmsBrieflyList } from '../mock/filmsBrieflyList';

const initialState = {
  genre: 'All genres',
	films: filmsBrieflyList,
	genresList: ['All genres'].concat([...new Set(filmsBrieflyList.map((film) => film.genre))]),
};

export const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(changeGenre, (state, action) => {
			state.genre = action.payload.genre;
			state.films = filmsBrieflyList.filter((film) => {
				if (action.payload.genre === 'All genres') {
					return true;
				} else {
					return film.genre === action.payload.genre;
				}
			});
		});
});
