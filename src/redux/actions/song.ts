import { Dispatch } from "redux";
import {
  SET_CURRENT_SONG,
  SET_CURRENT_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_TO_PLAYLIST,
} from "./actions.type";

export const setCurrentSong = (song: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_CURRENT_SONG,
      payload: song,
    });
  };
};

export const setCurrentPlaylist = (song: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_CURRENT_PLAYLIST,
      payload: song,
    });
  };
};

export const addToPlaylist = (song: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_TO_PLAYLIST,
      payload: song,
    });
  };
};

export const removeFromPlaylist = (songName: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_TO_PLAYLIST,
      payload: songName,
    });
  };
};
