import { doc, setDoc, collection, getDocs } from "@firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { songProps } from "../../../types/song.type";

export const addToLikedSongs = async (
  likedSong: songProps,
  uid: string,
  id: string
) => {
  const likedSongRef = doc(db, "likedSongs", uid);
  var likedSongArr: Array<String> = [];
  var localStorageJson = localStorage.getItem("likedSongArr");

  if (typeof localStorageJson === "string") {
    likedSongArr = JSON.parse(localStorageJson);
    if (likedSongArr.includes(likedSong.name)) {
      var arr = likedSongArr.filter(
        (songName: any) => songName !== likedSong.name
      );
      localStorage.setItem("likedSongArr", JSON.stringify(arr));

      await deleteDoc(doc(likedSongRef, "song", id));
    } else {
      console.log("from else");
      likedSongArr.push(likedSong.name);
      localStorage.setItem("likedSongArr", JSON.stringify(likedSongArr));

      await setDoc(doc(likedSongRef, "song", id), likedSong);
      await setDoc(doc(db, "likedSongs", uid), { uid });
    }
  } else {
    console.log("from else");
    likedSongArr.push(likedSong.name);
    localStorage.setItem("likedSongArr", JSON.stringify(likedSongArr));

    await setDoc(doc(likedSongRef, "song", id), likedSong);
    await setDoc(doc(db, "likedSongs", uid), { uid });
  }
};

export const fetchLikedSongs = async (uid: string) => {
  const likedSongRef = doc(db, "likedSongs", uid);

  return await getDocs(collection(likedSongRef, "song"));
};
