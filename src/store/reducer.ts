// import { createReducer } from '@reduxjs/toolkit';
// import { addComment, loadComments, loadFavoriteFilms, loadFilmDetails, loadSimilarFilms, requireAuthorization, setFilmsDataLoadingStatus } from './actions';

// export const reducer = createReducer(initialState, (builder) => {
//   builder

//     .addCase(

//     .addCase(loadFavoriteFilms, (state, action) => {
//       state.favoriteFilms = action.payload;
//     })

//     .addCase(loadFilmDetails, (state, action) => {
//       state.currentFilmDetails = action.payload;
//     })

//     .addCase(loadSimilarFilms, (state, action) => {
//       state.similarFilms = action.payload;
//     })

//     .addCase(loadComments, (state, action) => {
//       state.comments = action.payload;
//     })

//     .addCase(addComment, (state, action) => {
//       state.comments.push(action.payload);
//     })

//     .addCase(requireAuthorization, (state, action) => {
//       state.authorizationStatus = action.payload;
//     })

//     .addCase(setFilmsDataLoadingStatus, (state, action) => {
//       state.isFilmsLoading = action.payload;
//     })

//     .addCase();
// });
