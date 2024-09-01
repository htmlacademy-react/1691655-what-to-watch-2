import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRouter, withStore } from '../../utils/mock-components';
import SignInPage from './sign-in-page';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Comopnent: Sign-In-Page', () => {
  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'login-element';
    const passwordElementTestId = 'password-element';
    const expectedLoginValue = 'vetrov@mail.com';
    const expectedPasswordValue = '1234qwer';
    const state = {
      [NameSpace.User]: {
        login: expectedLoginValue,
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: 'www.asd.com/qwe.jpeg',
      },
    };
    const { withStoreComponent } = withStore(<SignInPage />, state);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
