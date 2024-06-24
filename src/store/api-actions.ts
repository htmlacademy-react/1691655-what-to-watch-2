import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/store";
import { AxiosInstance } from "axios";
import { FilmBriefly } from "../types/film";
import { APIRoute } from "../const";
import { loadFilms } from "./actions";

export const fetchFilms = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchFilms',
    async (_args, {dispatch, extra: api}) => {
        const {data} = await api.get<FilmBriefly[]>(APIRoute.Films);

        console.log(data);
        
        dispatch(loadFilms(data));
    }
)