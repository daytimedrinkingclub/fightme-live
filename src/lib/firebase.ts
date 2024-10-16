import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB25zegNBLMFPHVufSqNeaSkoDTK6G_oD0",
  authDomain: "roast-a4966.firebaseapp.com",
  databaseURL:"https://roast-a4966-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roast-a4966",
  storageBucket: "roast-a4966.appspot.com",
  messagingSenderId: "1073673880181",
  appId: "1:1073673880181:web:02fdefa8af96fd9f31ae3c",
  measurementId: "G-KPJ401XENS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

export async function getRoastCount() {
  const roastsRef = ref(db, 'roasts');
  const snapshot = await get(roastsRef);
  return snapshot.size;
}