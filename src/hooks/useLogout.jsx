import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

export function useLogout() {
  const { user } = useSelector((store) => store.user);
  const logout = async () => {
    // let ref = doc(db, "users", user.uid);
    // await updateDoc(ref, {
    //   online: false,
    // });
    signOut(auth)
      .then(() => {
        toast.success("See you soon!");
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return { logout };
}
