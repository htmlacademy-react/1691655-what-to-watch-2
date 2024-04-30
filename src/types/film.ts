export type Film_Briefly = {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}

export type Film_In_Details = {
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
}