export type FilmBriefly = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
};

export type FilmInDetails = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type FilmCardProps = {
  filmBriefly: FilmBriefly;
  filmsList: FilmBriefly[];
  isPlayerActive: boolean;
  renderPlayer: (src: string) => JSX.Element;
  onMouseOver: () => void;
  onMouseLeave: () => void;
};

export type FilmComment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};
