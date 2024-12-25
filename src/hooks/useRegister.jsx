import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

// uuid
import { v4 as uuid } from "uuid";

import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";

export function useRegister() {
  const dispatch = useDispatch();
  const registerWithEmailAndPassword = (displayName, email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (profile) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: "https://api.dicebear.com/9.x/initials/svg?seed=" + uuid(),
        });
        dispatch(login(profile.user));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { registerWithEmailAndPassword };
}
