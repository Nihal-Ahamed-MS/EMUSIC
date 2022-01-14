import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

export const searchQuery = async (searchText: String) => {
  const q = query(collection(db, "songs"), where("name", "==", searchText));

  const querySnapshot = await getDocs(q);

  var result = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    result = doc.data();
  });

  return result;
};
