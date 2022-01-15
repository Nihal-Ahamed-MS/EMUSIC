import React, { useState, useRef } from "react";
import { FaAngleDown, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import {
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeOff,
  MdFastForward,
  MdFastRewind,
} from "react-icons/md";
import { playlistState, currentSongState } from "../redux/store/songStore";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/actions/song";
import { addToLikedSongs } from "../pages/Library/helper/libraryHelper";
import {
  isPlayerInMobileView,
  playerImageControl,
  playlistProps,
  songProps,
} from "../types/song.type";
import { userProps } from "../types/user.type";
import { useNavigate } from "react-router-dom";

export const SongPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const navigate = useNavigate();
  const [isSeekerActive, setIsSeekerActive] = useState(false);
  const [likedSongSymbolColor, setLikedSongSymbolColor] = useState(false);
  const [miniPlayerHeight, setMiniPlayerHeight] = useState(false);
  const [seeker, setSeeker] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongItemNumber, setCurrentSongItemNumber] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const songPlayer = document.getElementById("songPlayer") as HTMLVideoElement;
  var user: userProps;
  var localStorageJson = localStorage.getItem("user");

  if (typeof localStorageJson === "string") {
    user = JSON.parse(localStorageJson);
  }

  const dispatch = useDispatch();

  const currentSong: songProps = useSelector(
    (state: currentSongState) => state.currentSongReducer
  );
  const currentSongPlaylist: playlistProps = useSelector(
    (state: playlistState) => state.playlistReducer
  );

  //Checking whether object is empty or not
  const checkObjIsEmptyOrNot = (object: songProps) => {
    if (Object.keys(object).length === 0) return true;
    else return false;
  };

  //To play and pause the song
  const songHandler = () => {
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
      setTotalTime(songPlayer.duration);
      setCurrentTime(videoRef.current?.currentTime);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  //To increase and decrease the volume
  const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVolume(Number(e.target.value));
    videoRef.current.volume = Number(e.target.value);
  };

  //To mute volume
  const muteHandler = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  //To update the currentTime of the song
  const _setCurrentTime = () => {
    setCurrentTime(videoRef.current?.currentTime);
  };

  if (videoRef.current != null) {
    videoRef.current.ontimeupdate = () => {
      _setCurrentTime();
      if (!isSeekerActive) {
        setSeeker(videoRef.current?.currentTime);
      }
    };
  }

  //To play the next song when the current song is ended.
  if (videoRef.current != null) {
    videoRef.current.onended = () => {
      setIsPlaying(false);
      if (currentSongPlaylist.length > currentSongItemNumber) {
        dispatch(
          setCurrentSong(currentSongPlaylist[currentSongItemNumber + 1])
        );

        setCurrentSongItemNumber((prev) => prev + 1);
        console.log(currentSongPlaylist[currentSongItemNumber]);
      } else {
        console.log("Playlist ended");
      }
    };
  }

  //To play next Song
  const nextSong = () => {
    if (currentSongPlaylist.length > currentSongItemNumber) {
      setIsPlaying(false);
      dispatch(setCurrentSong(currentSongPlaylist[currentSongItemNumber + 1]));

      setCurrentSongItemNumber((prev) => prev + 1);
      console.log(currentSongPlaylist[currentSongItemNumber]);
    } else {
      console.log("Playlist ended");
    }
  };

  //To play previous Song
  const prevSong = () => {
    if (currentSongItemNumber >= 0) {
      setIsPlaying(false);
      dispatch(setCurrentSong(currentSongPlaylist[currentSongItemNumber - 1]));

      setCurrentSongItemNumber((prev) => prev + 1);
      console.log(currentSongPlaylist[currentSongItemNumber]);
    } else {
      console.log("Playlist ended");
    }
  };

  //To fast forward the song
  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  //To rewind the song
  const reverse = () => {
    videoRef.current.currentTime -= 5;
  };

  //To Find whether the first frame of the song is loaded or not
  //If loaded then the song play will play and total time is set.
  var likedSongArr: Array<String> = [];
  var localStorageJsonForLikedSong = localStorage.getItem("likedSongArr");

  if (typeof localStorageJsonForLikedSong === "string") {
    likedSongArr = JSON.parse(localStorageJsonForLikedSong);
  }
  if (videoRef.current != null) {
    videoRef.current.onloadeddata = () => {
      if (likedSongArr.includes(currentSong.name)) {
        setLikedSongSymbolColor(true);
      } else {
        setLikedSongSymbolColor(false);
      }
      setTotalTime(songPlayer.duration);
      videoRef.current.play();
      setIsPlaying(true);
      console.log("loaded");
    };
  }

  //To add a song to library and store it in DB
  const addThisSongToLibrary = () => {
    if (user != null) {
      addToLikedSongs(currentSong, user.uid, currentSong.id);
      setLikedSongSymbolColor((prev) => !prev);
    } else {
      navigate("/signin");
    }
  };

  //To control the height of the player in mobile and desktop
  const musicPlayerRef = useRef<HTMLDivElement>(null!);

  const changeHeight = () => {
    if (
      musicPlayerRef.current.style.height === "" ||
      musicPlayerRef.current.style.height === "100%"
    ) {
      musicPlayerRef.current.style.height = "0%";
      setMiniPlayerHeight(false);
    } else {
      musicPlayerRef.current.style.height = "100%";
      setMiniPlayerHeight(true);
    }
  };

  //To control the player seek
  const seekHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSeeker(Number(e.target.value));
    if (videoRef.current != null) {
      videoRef.current.currentTime = seeker;
    }
  };

  //Media player control component for both Desktop and Mobile view.
  const PlayerControls = ({ mobileView }: isPlayerInMobileView) => {
    return (
      <div className="d-flex align-items-center flex-column">
        {mobileView ? <div className="mt-3"></div> : ""}
        <div className="d-flex align-items-center">
          <MdSkipPrevious
            style={{ cursor: "pointer" }}
            onClick={prevSong}
            className="fs-2"
          />
          <MdFastRewind
            style={{ cursor: "pointer" }}
            onClick={reverse}
            className="fs-2 mx-3"
          />
          <div
            onClick={songHandler}
            className="bg-light text-dark text-center "
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? (
              <FaPause
                style={{ cursor: "pointer" }}
                className="fs-4 h-100 my-auto"
              />
            ) : (
              <FaPlay
                style={{ cursor: "pointer" }}
                className="fs-4 ps-1 h-100 my-auto"
              />
            )}
          </div>
          <MdFastForward
            style={{ cursor: "pointer" }}
            onClick={fastForward}
            className="fs-2 mx-3"
          />
          <MdSkipNext
            style={{ cursor: "pointer" }}
            onClick={nextSong}
            className="fs-2 "
          />
        </div>
      </div>
    );
  };

  //Player Image Control for mobile and desktop
  const PlayerImageControl = ({ height, width, url }: playerImageControl) => {
    return (
      <img
        style={{
          width: width,
          height: height,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        src={url}
        alt={""}
        className="bg-dark rounded me-3"
      />
    );
  };

  return (
    <div>
      <video
        id="songPlayer"
        ref={videoRef}
        src={checkObjIsEmptyOrNot(currentSong) ? "" : `${currentSong.url}`}
        style={{ width: "0", height: "0" }}
      ></video>
      <div className="text-light bg-dark position-fixed bottom-0 start-0 d-lg-flex align-items-center flex-column w-100 bg-primary px-4 px-sm-5 py-sm-2">
        <div className="d-none d-lg-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center">
            <div>
              {checkObjIsEmptyOrNot(currentSong) ? (
                <div style={{ width: "200px" }}> </div>
              ) : (
                <PlayerImageControl
                  width="60px"
                  height="60px"
                  url={currentSong.img}
                />
              )}
            </div>
            <div className="d-flex  justify-content-between align-items-center ">
              <div className="d-flex  flex-column">
                <div>
                  {checkObjIsEmptyOrNot(currentSong)
                    ? ""
                    : `${currentSong.name}`}
                </div>
                <div>
                  {checkObjIsEmptyOrNot(currentSong)
                    ? ""
                    : `${currentSong.artist}`}
                </div>
              </div>
              {checkObjIsEmptyOrNot(currentSong) ? (
                ""
              ) : (
                <FaHeart
                  onClick={addThisSongToLibrary}
                  color={likedSongSymbolColor ? "#1DB954" : ""}
                  className="ms-4"
                />
              )}
            </div>
          </div>

          <div className="d-flex align-items-center flex-column">
            <PlayerControls mobileView={false} />

            <div className="d-flex align-items-center">
              <div className="px-3 py-1">
                {Math.floor(currentTime / 60) +
                  ":" +
                  ("0" + Math.floor(currentTime % 60)).slice(-2)}
              </div>
              <div
                onMouseEnter={() => {
                  setIsSeekerActive((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setIsSeekerActive((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="range"
                  min="0"
                  max={totalTime}
                  step="1"
                  value={seeker}
                  onChange={seekHandler}
                  id="seekScroll"
                />
              </div>

              <div className="px-3 py-1">
                {Math.floor(totalTime / 60) +
                  ":" +
                  ("0" + Math.floor(totalTime % 60)).slice(-2)}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            {isMuted ? (
              <MdVolumeOff onClick={muteHandler} className="fs-3 mx-1" />
            ) : (
              <MdVolumeDown onClick={muteHandler} className="fs-3 mx-1" />
            )}

            <input
              type="range"
              min="0"
              max={totalTime}
              step="0.0000001"
              value={seeker}
              onChange={seekHandler}
              id="seekScroll"
            />
          </div>
        </div>
      </div>

      {/* MINI PLAYER */}
      {miniPlayerHeight ? (
        ""
      ) : (
        <div
          style={{ transition: ".2s ease-in-out" }}
          className="position-fixed px-4 py-3 text-light bg-dark bottom-0 w-100 start-0 d-flex d-lg-none w-100 justify-content-between"
        >
          <div className="d-flex justify-content-start align-items-center ">
            <div onClick={changeHeight}>
              {checkObjIsEmptyOrNot(currentSong) ? (
                ""
              ) : (
                <PlayerImageControl
                  width="60px"
                  height="60px"
                  url={currentSong.img}
                />
              )}
            </div>
            <div className="d-flex flex-column">
              <div>
                {checkObjIsEmptyOrNot(currentSong) ? "" : `${currentSong.name}`}
              </div>
              <div>
                {checkObjIsEmptyOrNot(currentSong)
                  ? ""
                  : `${currentSong.artist}`}
              </div>
            </div>
          </div>

          {checkObjIsEmptyOrNot(currentSong) ? (
            ""
          ) : (
            <div onClick={songHandler}>
              {isPlaying ? (
                <FaPause className="fs-4 h-100 my-auto" />
              ) : (
                <FaPlay className="fs-4 ps-1 h-100 my-auto" />
              )}
            </div>
          )}
        </div>
      )}

      {/* MOBILE PLAYER */}
      <div
        ref={musicPlayerRef}
        style={{
          transition: ".5s ease-in-out",
          height: "0%",
        }}
        className=" bg-dark position-fixed bottom-0 start-0 text-light w-100  d-lg-none"
      >
        <div className="container p-2">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mt-4 text-end w-100">
              <FaAngleDown onClick={changeHeight} className="mt-5 fs-3" />
            </div>
            <div>
              {checkObjIsEmptyOrNot(currentSong) ? (
                ""
              ) : (
                <div className="mt-5">
                  <PlayerImageControl
                    width="300px"
                    height="300px"
                    url={currentSong.img}
                  />
                </div>
              )}
            </div>

            <div className="mt-5 w-100 d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <div>
                  {checkObjIsEmptyOrNot(currentSong)
                    ? ""
                    : `${currentSong.name}`}
                </div>
                <div>
                  {checkObjIsEmptyOrNot(currentSong)
                    ? ""
                    : `${currentSong.artist}`}
                </div>
              </div>
              {checkObjIsEmptyOrNot(currentSong) ? (
                ""
              ) : (
                <FaHeart
                  onClick={addThisSongToLibrary}
                  color={likedSongSymbolColor ? "#1DB954" : ""}
                  className="ms-4"
                />
              )}
            </div>
            <div className="d-flex  align-items-center flex-column">
              <PlayerControls mobileView={true} />

              <div
                className="d-flex w-100 align-items-center"
                style={{
                  order: "-1",
                  marginTop: "2rem",
                }}
              >
                <div className="px-3 py-1">
                  {Math.floor(currentTime / 60) +
                    ":" +
                    ("0" + Math.floor(currentTime % 60)).slice(-2)}
                </div>
                <div
                  onTouchStart={() => {
                    setIsSeekerActive((prev) => !prev);
                  }}
                  onTouchEnd={() => {
                    setIsSeekerActive((prev) => !prev);
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.001"
                    value={seeker}
                    onChange={seekHandler}
                    id="seekScroll"
                  />
                </div>

                <div className="px-3 py-1">
                  {Math.floor(totalTime / 60) +
                    ":" +
                    ("0" + Math.floor(totalTime % 60)).slice(-2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
