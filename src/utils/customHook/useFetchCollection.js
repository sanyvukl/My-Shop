import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase.utils";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useFetchCollection = (collectionName) => {
  
    const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;