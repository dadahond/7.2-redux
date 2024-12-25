import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export function useLogout() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return { logout };
}
