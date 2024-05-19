import withVideoPlayer from '../hocs/with-video-player';
import { FilmBriefly } from '../types/film';
import FilmCard from './film-card';

type FilmsListProps = {
  filmCardsNumber : number;
  filmsList: FilmBriefly[];
}

const FilmCardWrapped = withVideoPlayer(FilmCard);

function FilmsList({filmCardsNumber, filmsList}: FilmsListProps): JSX.Element {
  const filmCardsList = filmsList
    .slice(0, filmCardsNumber - 1)
    .map(
      (film) => (
        <FilmCardWrapped
          key={film.name}
          filmBriefly = {film}
        />
      )
    );

  return (
    <div className="catalog__films-list">
      {filmCardsList}
    </div>
  );
}

export default FilmsList;
