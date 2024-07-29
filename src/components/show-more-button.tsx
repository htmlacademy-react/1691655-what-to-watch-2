import { useAppDispatch } from '../hooks';
import { showMoreFilms } from '../store/app-process/app-process';

export function ShowMoreButton (): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => {
          dispatch(showMoreFilms());
        }}
      >
        Show more
      </button>
    </div>
  );
}
