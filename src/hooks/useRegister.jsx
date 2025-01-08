import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { toast } from "react-toastify";

// uuid
import { v4 as uuid } from "uuid";

import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/features/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "../utils";

export function useRegister() {
  const dispatch = useDispatch();
  const registerWithEmailAndPassword = async (displayName, email, password) => {
    dispatch(setIsPending(true));

    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Failed to register. Please try again.");
      }
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: "https://api.dicebear.com/9.x/initials/svg?seed=" + uuid(),
      });
      // Add a new document in collection "people"
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        id: res.user.uid,
        online: true,
        photoURL: res.user.photoURL,
      });
      dispatch(login(res.user));
      dispatch(setIsPending(false));

      toast.success(`Welcome, ${res.user.displayName}`);
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error.code));
      toast.error(error.message);
      dispatch(setIsPending(false));
    }
  };

  return { registerWithEmailAndPassword };
}
