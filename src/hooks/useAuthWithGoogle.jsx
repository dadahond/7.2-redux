import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { doc, setDoc } from "firebase/firestore";

export function useAuthWithGoogle() {
  const dispatch = useDispatch();
  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GoogleAuthProvider();

  const googleAuth = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      if (!isCanceled) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          id: user.uid,
          online: true,
        });
        dispatch(login(user));
        setIsPending(false);
      }
    } catch (error) {
      if (!isCanceled) {
        toast.error(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return { googleAuth, isPending };
}
