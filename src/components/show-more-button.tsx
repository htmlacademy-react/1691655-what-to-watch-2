import { useAppDispatch } from "../hooks"
import { addMoreFilms } from "../store/actions";

export function ShowMoreButton (): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={ () => { dispatch(addMoreFilms()) } }
      >
        Show more
      </button>
    </div>
  )
}