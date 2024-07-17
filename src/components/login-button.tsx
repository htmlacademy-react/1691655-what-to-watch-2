import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutAction } from '../store/api-actions';

export function LoginButton (): JSX.Element {
  const dispatch = useAppDispatch();

  const onSignOut = () => {
    dispatch(logoutAction());
  };

  const isAuth = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;
  const avatarUrl = useAppSelector((state) => state.avatarUrl);

  return isAuth ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img
            src={avatarUrl ? avatarUrl : ''}
            alt="User avatar"
            width="63"
            height="63"
          />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          onClick={onSignOut}
          to={AppRoute.Root}
          className="user-block__link"
        >
          Sign out
        </Link>
      </li>
    </ul>
    :
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">
        Sign in
      </Link>
    </div>;
}
