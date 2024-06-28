import { Link } from 'react-router-dom';
import { store } from '../store';
import { useAppDispatch } from '../hooks';
import { changeGenre } from '../store/actions';

export function GenresList({genresList}: {genresList: string[]}): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {
        genresList.map((genre) => (
          <li key={genre} className="catalog__genres-item">
            <Link
              to="#"
              className={`catalog__genres-link ${genre === store.getState().genre ? 'catalog__genres-item--active' : ''}`}
              onClick={ (evt) => {
                if (evt.target instanceof HTMLElement) {
                  dispatch(changeGenre({ genre: (evt.target).innerText }));
                }
              }}
            >
              {genre}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
