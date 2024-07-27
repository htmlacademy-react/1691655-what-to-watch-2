import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeGenre } from '../store/app-process/app-process';
import { getGenre } from '../store/app-process/selectors';

export function GenresList({genresList}: {genresList: string[]}): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getGenre);

  console.log('genresList is: ', genresList);
  console.log('current genre is: ', currentGenre)

  return (
    <ul className="catalog__genres-list">
      {
        genresList.map((genre) => (
          <li key={genre} className="catalog__genres-item">
            <Link
              to="#"
              className={`catalog__genres-link ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}
              onClick={ (evt) => {
                if (evt.target instanceof HTMLElement) {
                  dispatch(changeGenre((evt.target).innerText));
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
