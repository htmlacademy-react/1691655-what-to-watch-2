import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuth, loginAction, logoutAction } from '../api-actions';
import { dropToken, saveToken } from '../../services/token';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  login: null,
  avatarUrl: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.login = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { name, token, avatarUrl } = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.login = name;
        state.avatarUrl = avatarUrl;
        if (token) {
          saveToken(token);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.avatarUrl = null;
        dropToken();
      });
  },
});
