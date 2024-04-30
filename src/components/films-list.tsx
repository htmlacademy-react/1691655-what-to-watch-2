import { Film_Briefly } from "../types/film";
import FilmCardScreen from "./film-card";

type FilmsListProps = {
  filmCardsNumber : number;
  filmsList: Film_Briefly[];
}

function FilmsList({filmCardsNumber, filmsList}: FilmsListProps): JSX.Element {
  const filmCardsList = filmsList
    .slice(0, filmCardsNumber - 1)
    .map(
      (film, id) => <FilmCardScreen key={id} filmBriefly = {film} />
    );

  return  (
      <div className="catalog__films-list">
        {filmCardsList}
      </div>
    )
};

export default FilmsList;
