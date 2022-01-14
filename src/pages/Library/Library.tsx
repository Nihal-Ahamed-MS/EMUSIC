import { useEffect, useState } from "react";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SongExpandedCard } from "../../component/SongExpandedCard";
import Base from "../../layout/Base";
import { setCurrentPlaylist, setCurrentSong } from "../../redux/actions/song";
import { fetchLikedSongs } from "./helper/libraryHelper";
import { userProps } from "../../types/user.type";
import { useNavigate } from "react-router-dom";

export const Library = () => {
  const navigator = useNavigate();
  var user: userProps = {
    apiKey: null,
    email: "",
    uid: "",
  };
  const [likeSongPlaylist, setLikeSongPlaylist] = useState([{}]);
  const dispatch = useDispatch();

  var localStorageJson = localStorage.getItem("user");

  if (typeof localStorageJson === "string") {
    user = JSON.parse(localStorageJson);
    console.log(user);
  }

  useEffect(() => {
    if (user.apiKey !== null) {
      fetchLikedSongs(user.uid).then((playlist: any) => {
        var arr: Array<{}> = [];
        playlist.forEach((doc: any) => {
          arr.push(doc.data());
        });
        setLikeSongPlaylist(arr);
      });
    }
  });

  const songHandler = () => {
    dispatch(setCurrentSong(likeSongPlaylist[0]));
    dispatch(setCurrentPlaylist(likeSongPlaylist));
  };

  return (
    <Base>
      <div className="container w-100 text-light ">
        <div className="d-flex w-100 justify-content-start align-items-end">
          <img
            className="shadow"
            src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            alt="library"
          />
          <div className="d-flex w-100 justify-content-between align-items-end">
            <div className="d-flex  flex-column ms-3">
              <div className="fs-5 fw-bolder">PLAYLIST</div>
              <div style={{ fontSize: "5rem" }} className="fw-bold">
                Library Songs
              </div>

              {user.apiKey == null ? (
                <div
                  onClick={() => {
                    navigator("/signup");
                  }}
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-center align-items-center rounded text-center bg-warning text-light"
                >
                  <FaInfoCircle className="me-2" />
                  <div>LOGIN IN CONTINUE</div>
                </div>
              ) : (
                <div className="text-muted">
                  {likeSongPlaylist.length} songs
                </div>
              )}
            </div>

            <div
              onClick={songHandler}
              className="text-dark text-center "
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                backgroundColor: "#1DB954",
              }}
            >
              <FaPlay color={"#fff"} className="fs-5 ps-1 h-100 my-auto" />
            </div>
          </div>
        </div>
        <div>
          <ul className="my-5 list-unstyled">
            {likeSongPlaylist.length > 1
              ? likeSongPlaylist.map((song: any, id: number) => (
                  <li key={id}>
                    <SongExpandedCard
                      name={song.name}
                      url={song.url}
                      artist={song.artist}
                      img={song.img}
                      id={song.id}
                    />
                  </li>
                ))
              : ""}
            <li
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#030303",
              }}
            ></li>
          </ul>
        </div>
      </div>
    </Base>
  );
};
