import { useState } from "react";
import { songProps } from "../types/song.type";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addToPlaylist,
  setCurrentSong,
  removeFromPlaylist,
} from "../redux/actions/song";
import { userProps } from "../types/user.type";
import { useNavigate } from "react-router";

export const SongCard = ({ name, artist, url, img, id }: songProps) => {
  const [isSongAddedToQueue, setIsSongAddedToQueue] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var user: userProps;
  var localStorageJson = localStorage.getItem("user");

  if (typeof localStorageJson === "string") {
    user = JSON.parse(localStorageJson);
  }

  const addToCurrentPlaylist = () => {
    if (user !== undefined) {
      if (isSongAddedToQueue) {
        dispatch(addToPlaylist({ name, artist, url, img }));
        setIsSongAddedToQueue(false);
      } else {
        dispatch(removeFromPlaylist(name));
        setIsSongAddedToQueue(true);
      }
    } else {
      navigate("/signin");
    }
  };

  const addSongToState = () => {
    dispatch(setCurrentSong({ name, artist, url, img, id }));
  };

  return (
    <div className="me-4 d-flex flex-column">
      <div
        style={{ cursor: "pointer", width: "200px" }}
        onClick={addSongToState}
      >
        <img
          style={{
            width: "100%",
            height: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          src={img}
          alt={""}
          className="bg-dark rounded"
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="mt-2">{name}</div>
          <div className="mt-1">{artist}</div>
        </div>
        <div style={{ cursor: "pointer" }}>
          {!isSongAddedToQueue ? (
            <MdPlaylistAddCheck color="1DB954" onClick={addToCurrentPlaylist} />
          ) : (
            <MdPlaylistAdd onClick={addToCurrentPlaylist} />
          )}
        </div>
      </div>
    </div>
  );
};
