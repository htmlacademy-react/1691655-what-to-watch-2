import { Film_Briefly } from "../types/film";

type FilmCardProps = {
  filmBriefly: Film_Briefly; 
}

function FilmCardScreen({filmBriefly}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={filmBriefly.previewImage} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{filmBriefly.name}</a>
      </h3>
    </article>
  );
}

export default FilmCardScreen;
