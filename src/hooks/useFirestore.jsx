import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const changeState = (state, action) => {
  switch (action.type) {
    case "ADD_DOCUMENT":
      return {
        ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "IS_PENDING":
      return { ...state, isPending: true, success: false, error: null };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        success: false,
        error: action.payload,
      };
    case "DELETE_DOCUMENT":
      return { ...state, isPending: false, success: true, error: null };
    case "COMPLETE_DOCUMENT":
      return { ...state, isPending: false, success: true, error: null };
    case "UPDATE_DOCUMENT":
      return { ...state, isPending: false, success: true, error: null };
    default:
      return state;
  }
};

function useFirestore(collectionName) {
  const [isCanceled, setIsCanceled] = useState(false);
  const [state, dispatch] = useReducer(changeState, initialState);

  const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  const addDocument = async (data) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      const newDoc = await addDoc(collection(db, collectionName), data);
      dispatchIfNotCanceled({ type: "ADD_DOCUMENT", payload: newDoc });
      toast.success("Project added successfully!");
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error(`Error: ${error.message}`);
    }
  };

  const deleteDocument = async (id) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      dispatchIfNotCanceled({ type: "DELETE_DOCUMENT" });
      toast.success("Project deleted successfully!");
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error(`Error: ${error.message}`);
    }
  };
  const completeDocument = async (id) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      dispatchIfNotCanceled({ type: "DELETE_DOCUMENT" });
      toast.success("Project completed!");
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error(`Error: ${error.message}`);
    }
  };

  const updateDocument = async (document, id) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, document);
      dispatchIfNotCanceled({ type: "UPDATE_DOCUMENT" });
      toast.success("Added successfully!");
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    completeDocument,
    updateDocument,
    state,
  };
}

export { useFirestore };
