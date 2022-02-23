import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { SongCard } from "../../component/SongCard";
import Base from "../../layout/Base";
import { FaAngleRight } from "react-icons/fa";

export const Home = (props: any): JSX.Element => {
  const [songs, setSongs] = useState([{}]);
  const [dailyMix, setDailyMix] = useState([{}]);

  useEffect(() => {
    //Fetching songs from Db
    var fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "songs"));
      var arr: Array<{}> = [];
      querySnapshot.forEach((doc) => {
        var id = doc.id;
        console.log({ ...doc.data(), id });

        arr.push({ ...doc.data(), id });
      });

      setSongs(arr);
    };

    const fetchDailMix = async () => {
      const querySnapshot = await getDocs(collection(db, "dailMix"));
      var arr: Array<{}> = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().url}`);
        var id = doc.id;
        console.log({ ...doc.data(), id });

        arr.push({ ...doc.data(), id });
      });

      setDailyMix(arr);
    };

    fetchSongs();
    fetchDailMix();
  }, []);

  return (
    <Base>
      <div className="text-light">
        <div className="mt-5 container">
          <h5 className="mb-1 fw-normal">PEPPY MUSIC TO START YOUR DAY</h5>
          <h3 className="fw-bold">Easy Mornings</h3>
          <div
            className="mt-4 d-relative"
            style={{ transition: ".5s ease-in-out", position: "relative" }}
          >
            <ul
              style={{ transition: ".5s ease-in-out" }}
              id={songs.length >= 6 ? "songScroll" : "songMobileScroll"}
              className="d-flex list-unstyled pb-2"
            >
              {songs.length > 1
                ? songs.map((song: any, id: number) => (
                    <li key={id}>
                      <SongCard
                        name={song.name}
                        url={song.url}
                        artist={song.artist}
                        img={song.img}
                        id={song.id}
                      />
                    </li>
                  ))
                : ""}
              <span id="end"></span>
            </ul>
            {songs.length >= 6 ? (
              <a href="#end">
                <div
                  className="d-none d-sm-block bg-light text-dark text-center shadow"
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "-1%",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <span>
                    <FaAngleRight className="h-100 w-100 mx-auto px-3 py-2" />
                  </span>
                </div>
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="my-5" style={{ transition: ".5s ease-in-out" }}>
            <div>
              <h3 className="mb-2 fw-bold ">DAILY MIX</h3>
            </div>
            <ul
              style={{ transition: ".5s ease-in-out" }}
              id="songMobileScroll"
              className="d-flex list-unstyled pb-2 mb-5"
            >
              {dailyMix.length > 1
                ? dailyMix.map((mix: any, id: number) => (
                    <li key={id}>
                      <SongCard
                        name={mix.name}
                        url={mix.url}
                        artist={mix.artist}
                        img={mix.img}
                        id={mix.id}
                      />
                    </li>
                  ))
                : ""}
            </ul>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#030303",
              }}
            ></div>
          </div>
        </div>
      </div>
    </Base>
  );
};
