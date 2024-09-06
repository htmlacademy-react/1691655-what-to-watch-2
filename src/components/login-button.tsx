import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutAction } from '../store/api-actions';
import { getAuthorizationStatus, getAvatarUrl } from '../store/user-process/selectors';
import { cleanFavoriteFilms } from '../store/app-data/app-data';

export function LoginButton (): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate =useNavigate();

  const onSignOut = async () => {
    await dispatch(logoutAction());
    dispatch(cleanFavoriteFilms());
  };

  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const avatarUrl = useAppSelector(getAvatarUrl);

  return isAuth ?
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img
            src={avatarUrl ? avatarUrl : ''}
            alt="User avatar"
            width="63"
            height="63"
            onClick={() => navigate(AppRoute.MyList)}
          />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          onClick={() => onSignOut()}
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
