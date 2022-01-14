import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { SongCard } from "../../component/SongCard";
import Base from "../../layout/Base";
import { FaAngleRight } from "react-icons/fa";

export const Home = (props: any): JSX.Element => {
  const [songs, setSongs] = useState([{}]);

  useEffect(() => {
    var fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "songs"));
      var arr: Array<{}> = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().url}`);
        var id = doc.id;
        console.log({ ...doc.data(), id });

        arr.push({ ...doc.data(), id });
      });

      setSongs(arr);
    };

    fetchSongs();
  }, []);

  const test = {
    id: "ksdjf",
    url: "https://firebasestorage.googleapis.com/v0/b/e-music-544bd.appspot.com/o/07_Thean_Kudika_-_Teejay%2C_Pragathi_Guru.mp3?alt=media&token=96d24e04-6172-4f25-b1c8-55ca4746bc49",
    img: "data:image/jpeg;base64,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",
    name: "Thean Kudika",
    artist: "Teejay, Pragathi Guru",
  };

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
              id={songs.length >= 6 ? "songScroll" : ""}
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
              <li>
                <SongCard
                  name={test.name}
                  url={test.url}
                  artist={test.artist}
                  img={test.img}
                  id={test.id}
                />
              </li>
              <li>
                <SongCard
                  name={test.name}
                  url={test.url}
                  artist={test.artist}
                  img={test.img}
                  id={test.id}
                />
              </li>
              <li>
                <SongCard
                  name={test.name}
                  url={test.url}
                  artist={test.artist}
                  img={test.img}
                  id={test.id}
                />
              </li>
              <li>
                <SongCard
                  name={test.name}
                  url={test.url}
                  id={test.id}
                  artist={test.artist}
                  img={test.img}
                />
              </li>
              <li>
                <span id="end"></span>
              </li>
            </ul>
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
          </div>
        </div>
      </div>
    </Base>
  );
};
