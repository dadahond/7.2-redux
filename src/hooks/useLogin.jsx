import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export function useLogin() {
  const loginWithEmailAndPassword = (email, password) => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((profile) => {
        console.log(profile.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return { loginWithEmailAndPassword };
}