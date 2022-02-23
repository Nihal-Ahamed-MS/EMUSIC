import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

//Firebase needs exact names to give the result.
//Inorder to get correct result exact song name is used.
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
