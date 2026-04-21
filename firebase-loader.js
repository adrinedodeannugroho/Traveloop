// ============================================================
//  firebase-loader.js
//  Letakkan di root project (sejajar index.html & script.js)
//  Load data dari Firestore dan expose ke window.firestorePlaces
// ============================================================

import { getPlaces } from "./firebase.js";

(async () => {
  try {
    const places = await getPlaces();

    if (!places || places.length === 0) {
      // Firestore kosong — fallback ke MOCK_PLACES
      console.warn("[Traveloop] Firestore kosong, pakai MOCK_PLACES. Jalankan seedFirestore() untuk mengisi data.");
      window.firestorePlaces = typeof MOCK_PLACES !== "undefined" ? [...MOCK_PLACES] : [];
    } else {
      window.firestorePlaces = places;
      console.log(`[Traveloop] ${places.length} destinasi berhasil dimuat dari Firestore.`);
    }
  } catch (err) {
    // Koneksi gagal — fallback ke MOCK_PLACES
    console.error("[Traveloop] Gagal load dari Firestore:", err.message);
    window.firestorePlaces = typeof MOCK_PLACES !== "undefined" ? [...MOCK_PLACES] : [];
  }

  // Dispatch event agar script.js tahu data sudah siap
  document.dispatchEvent(
    new CustomEvent("placesLoaded", { detail: window.firestorePlaces })
  );
})();