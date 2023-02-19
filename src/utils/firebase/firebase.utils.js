import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  // AIzaSyDkylRuqrWXV2-NXXho-L5z0O74zL6BA3M
  authDomain: "esop-4bc1f.firebaseapp.com",
  projectId: "esop-4bc1f",
  storageBucket: "esop-4bc1f.appspot.com",
  messagingSenderId: "913738441745",
  appId: "1:913738441745:web:eb9c6fddd6a808a9c43db0",
  measurementId: "G-1EB8MBNFW0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
// Registering
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      await updateProfile(userAuth, additionalInformation);
    } catch (error) {
      console.log(`error creating the user ${error.message}`);
    }
  }

  return userSnapshot;
};
export const registerWithEmailAndPassword = async (
  email,
  password,
  additionalInformation = {}
) => {
  if (!email || !password) return;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocumentFromAuth(user, additionalInformation);
};
// #Registering

// Check user status
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
// #Check user status

// Login
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const logInWithGooglePopUp = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    await createUserDocumentFromAuth(user);
    toast.success("Login Succesfuly");
  } catch (error) {
    toast.error(error);
  }
};
// #Login
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Check your email");
  } catch (error) {
    toast.error(error.message);
  }
};
// Log out
export const logOutUser = async () => await signOut(auth);
// #Log out

// Get Images Url
export const getStoreImagesUrl = async (image) => {
  return new Promise((resolve, reject) => {
    const fileName = `${image.name}-${Date.now()}`;
    const storageRef = ref(storage, "eshop/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
// #

// Products
export const addProductDocument = async (product) => {
  const collectionRef = collection(db, `products`);
  return await addDoc(collectionRef, product);
};
export const getProductsDocuments = async () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("timestamp", "desc"));

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    data: docSnapshot.data(),
  }));
};
export const getProductById = async (productId) => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      data: docSnap.data(),
    };
  }
};
export const updateProductDocument = async (productId, newData) => {
  const listingDocRef = doc(db, "products", productId);
  return await updateDoc(listingDocRef, newData);
};
export const deleteProductDocument = async (productId, imageUrls) => {
  const listingDocRef = doc(db, "products", productId);

  imageUrls.forEach(async (image) => {
    const storageRef = ref(storage, image);
    await deleteObject(storageRef);
  });

  return await deleteDoc(listingDocRef);
};
//# Products

export const addOrderDocument = async (order) => {
  console.log(order);
  const collectionRef = collection(db, `orders`);
  return await addDoc(collectionRef, order);
};
export const getOrdersDocuments = async () => {
  const collectionRef = collection(db, "orders");
  const q = query(collectionRef, orderBy("createdAt", "desc"));

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    data: docSnapshot.data(),
  }));
};
export const updateOrderDocument = async (order) => {
  const listingDocRef = doc(db, "orders", order.id);
  delete order.id;
  return await updateDoc(listingDocRef, order);
};
export const getUserOrders = async (userID) => {
  const collectionRef = collection(db, "orders");
  const q = query(
    collectionRef,
    where("userRef", "==", userID),
    orderBy("createdAt", "desc")
  );

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    data: docSnapshot.data(),
  }));
};

//
export const addReviewDocument = async (review) => {
  const collectionRef = collection(db, `reviews`);
  return await addDoc(collectionRef, review);
};
export const getReviewsToProductByID = async (productID) => {
  const collectionRef = collection(db, "reviews");
  const q = query(
    collectionRef,
    where("productID", "==", productID),
    orderBy("createdAt", "desc")
  );

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));
};
