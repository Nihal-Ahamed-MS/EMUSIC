import { songProps } from "../../types/song.type";
import {
  SET_CURRENT_SONG,
  SET_CURRENT_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_TO_PLAYLIST,
} from "../actions/actions.type";

const initialState: any = [{}];

export const playlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_PLAYLIST:
      return action.payload;

    case ADD_TO_PLAYLIST:
      return [...state, action.payload];

    case REMOVE_TO_PLAYLIST:
      return state.filter((song: songProps) => song.name !== action.payload);
    default:
      return state;
  }
};

const songInitialState = {};
export const currentSongReducer = (state = songInitialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.payload;

    default:
      return state;
  }
};
