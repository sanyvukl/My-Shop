import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDocument = async () => {
    setIsLoading(true);
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocument({ id: docSnap.id, ...docSnap.data() });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document, isLoading };
};

export default useFetchDocument;
