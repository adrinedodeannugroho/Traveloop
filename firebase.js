// ============================================================
//  Traveloop — Firebase Integration
//  Ganti nilai firebaseConfig di bawah dengan config proyekmu
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// --1. Config
const firebaseConfig = {
  apiKey: "AIzaSyDRRW9XXB0Yr_TmqNFs4OOaaCpE1Dd6esI",
  authDomain: "traveloop-6e218.firebaseapp.com",
  projectId: "traveloop-6e218",
  storageBucket: "traveloop-6e218.firebasestorage.app",
  messagingSenderId: "344293334634",
  appId: "1:344293334634:web:8d280b3171eaf5f5557413"
};

// ── 2. Init ───────────────────────────────────────────────────
const app     = initializeApp(firebaseConfig);
const db      = getFirestore(app);
const auth    = getAuth(app);
const storage = getStorage(app);

// ============================================================
//  FIRESTORE — Places
// ============================================================

/**
 * Ambil semua destinasi dari Firestore.
 * Mengembalikan array places (sama strukturnya dengan MOCK_PLACES).
 */
export async function getPlaces() {
  const snap = await getDocs(collection(db, "places"));
  return snap.docs.map((d) => ({ place_id: d.id, ...d.data() }));
}

/**
 * Ambil satu destinasi berdasarkan place_id (= document ID).
 */
export async function getPlace(placeId) {
  const snap = await getDoc(doc(db, "places", placeId));
  if (!snap.exists()) return null;
  return { place_id: snap.id, ...snap.data() };
}

/**
 * Tambah destinasi baru.
 * Kalau place.place_id sudah ada, pakai setDoc (upsert).
 * Kalau belum, pakai addDoc (Firestore generate ID).
 */
export async function savePlace(place) {
  const { place_id, ...data } = place;
  data.updated_at = serverTimestamp();

  if (place_id && !place_id.startsWith("custom_tmp")) {
    // Update atau create dengan ID spesifik
    await setDoc(doc(db, "places", place_id), data, { merge: true });
    return place_id;
  } else {
    // Create baru, Firestore yang generate ID
    data.created_at = serverTimestamp();
    const ref = await addDoc(collection(db, "places"), data);
    return ref.id;
  }
}

/**
 * Hapus destinasi berdasarkan place_id.
 */
export async function deletePlace(placeId) {
  await deleteDoc(doc(db, "places", placeId));
}

// ============================================================
//  FIRESTORE — Messages (dari form kontak)
// ============================================================

export async function saveMessage(msg) {
  await addDoc(collection(db, "messages"), {
    ...msg,
    read: false,
    created_at: serverTimestamp(),
  });
}

export async function getMessages() {
  const q = query(collection(db, "messages"), orderBy("created_at", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function markMessageRead(msgId) {
  await updateDoc(doc(db, "messages", msgId), { read: true });
}

export async function deleteMessage(msgId) {
  await deleteDoc(doc(db, "messages", msgId));
}

// ============================================================
//  FIREBASE AUTH — Admin login
// ============================================================

/**
 * Login admin dengan email + password.
 * Gunakan email admin yang kamu daftarkan di Firebase Auth Console.
 */
export async function loginAdmin(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logoutAdmin() {
  await signOut(auth);
}

/**
 * Pantau status login.
 * callback(user) → user ada = logged in, user null = logged out.
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

// ============================================================
//  FIREBASE STORAGE — Upload foto destinasi
// ============================================================

/**
 * Upload foto ke Firebase Storage.
 * @param {File}     file          - File object dari <input type="file">
 * @param {string}   placeId       - Dipakai sebagai nama folder
 * @param {Function} onProgress    - Callback (percent: number) => void
 * @returns {Promise<string>}      - Download URL foto
 *
 * Contoh pemakaian:
 *   const url = await uploadPhoto(file, "bms_01", (pct) => console.log(pct));
 */
export async function uploadPhoto(file, placeId, onProgress) {
  const ext      = file.name.split(".").pop();
  const filename = `places/${placeId}/${Date.now()}.${ext}`;
  const storRef  = ref(storage, filename);
  const task     = uploadBytesResumable(storRef, file);

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        if (onProgress) onProgress(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/**
 * Hapus foto dari Storage berdasarkan URL-nya.
 */
export async function deletePhoto(photoUrl) {
  try {
    const storRef = ref(storage, photoUrl);
    await deleteObject(storRef);
  } catch (e) {
    // Abaikan jika file tidak ditemukan
    console.warn("deletePhoto:", e.message);
  }
}

// ============================================================
//  SEED — Isi Firestore dengan MOCK_PLACES (jalankan sekali)
// ============================================================

/**
 * Jalankan fungsi ini SEKALI dari console browser setelah login:
 *   import { seedFirestore } from './firebase.js'
 *   await seedFirestore(MOCK_PLACES)
 *
 * Ini akan upload semua data dari config.js ke Firestore.
 */
export async function seedFirestore(mockPlaces) {
  let count = 0;
  for (const place of mockPlaces) {
    const { place_id, ...data } = place;
    data.created_at = serverTimestamp();
    await setDoc(doc(db, "places", place_id), data);
    count++;
    console.log(`✓ Seeded: ${place.name} (${count}/${mockPlaces.length})`);
  }
  console.log(`🎉 Selesai! ${count} destinasi berhasil diupload ke Firestore.`);
}

export { db, auth, storage };