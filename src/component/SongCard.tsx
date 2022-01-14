import { useState } from "react";
import { playlistProps, songProps } from "../types/song.type";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { playlistState } from "../redux/store/songStore";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPlaylist,
  setCurrentSong,
  removeFromPlaylist,
} from "../redux/actions/song";

export const SongCard = ({ name, artist, url, img, id }: songProps) => {
  const [isSongAddedToQueue, setIsSongAddedToQueue] = useState(true);
  const dispatch = useDispatch();

  const currentSongPlaylist: playlistProps = useSelector(
    (state: playlistState) => state.playlistReducer
  );

  const addToCurrentPlaylist = () => {
    if (isSongAddedToQueue) {
      dispatch(addToPlaylist({ name, artist, url, img }));
      setIsSongAddedToQueue(false);
    } else {
      dispatch(removeFromPlaylist(name));
      setIsSongAddedToQueue(true);
    }
  };

  const addSongToState = () => {
    dispatch(setCurrentSong({ name, artist, url, img, id }));
  };

  console.log(currentSongPlaylist);

  return (
    <div className="me-4">
      <div onClick={addSongToState}>
        <img
          style={{
            width: "200px",
            height: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          src={img}
          alt={""}
          className="bg-dark rounded me-3"
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="mt-2">{name}</div>
          <div className="mt-1">{artist}</div>
        </div>
        {!isSongAddedToQueue ? (
          <MdPlaylistAddCheck color="1DB954" onClick={addToCurrentPlaylist} />
        ) : (
          <MdPlaylistAdd onClick={addToCurrentPlaylist} />
        )}
      </div>
    </div>
  );
};
