import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyD4JpCjD7ol0d1cHaZkGEx02_e-EfdvE_8",
  authDomain: "alohcmute-1d557.firebaseapp.com",
  projectId: "alohcmute-1d557",
  storageBucket: "alohcmute-1d557.appspot.com",
  messagingSenderId: "617188265219",
  appId: "1:617188265219:web:c58ef2bd858c2e7c762d36",
  measurementId: "G-LBNBCK6D3V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const uploadImageToStorage = async (file) => {
  try {
    const imageRef = ref(storage, `${v4()}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    return null;
  }
};

export { uploadImageToStorage };
