import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadExerciseMedia(file: File, exerciseId: string) {
  const storageRef = ref(storage, `exercises/${exerciseId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
} 