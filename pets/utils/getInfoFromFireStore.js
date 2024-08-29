import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function getInfoFromFireStore(collectionName) {
  const data = [];
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (err) {
    console.error('Error fetching data:', err);
  }

  return data;
}
