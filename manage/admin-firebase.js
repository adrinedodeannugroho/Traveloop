// ============================================================
//  Traveloop — admin.js (Firebase version)
//  Menggantikan admin.js yang pakai localStorage
// ============================================================

import {
  getPlaces,
  savePlace,
  deletePlace,
  getMessages,
  markMessageRead,
  deleteMessage,
  loginAdmin,
  logoutAdmin,
  onAuthChange,
  uploadPhoto,
} from "../firebase.js";

const CAT_COLORS = {
  nature: "#2d9e6b", beach: "#0ea5e9", mountain: "#7c5c3b",
  cultural: "#e88a22", historical: "#9b4f96",
};

// ── State ─────────────────────────────────────────────────────
let allPlaces = [];

// ============================================================
//  INIT
// ============================================================

export function initAdmin() {
  // Pantau status auth Firebase secara realtime
  onAuthChange((user) => {
    if (user) {
      showAdminShell();
    } else {
      showLoginScreen();
    }
  });
}

function showLoginScreen() {
  document.getElementById("loginScreen").classList.remove("d-none");
  document.getElementById("adminShell").classList.add("d-none");
}

async function showAdminShell() {
  document.getElementById("loginScreen").classList.add("d-none");
  document.getElementById("adminShell").classList.remove("d-none");
  await loadDashboard();
  await loadPlacesTable();
  loadUsers();
  loadSettings();
  await loadAdminMessages();
}

// ============================================================
//  AUTH
// ============================================================

export async function doLogin() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value;
  const errEl    = document.getElementById("loginError");

  // Validasi input
  if (!email || !password) {
    errEl.textContent = "Email dan password harus diisi.";
    errEl.classList.remove("d-none");
    return;
  }

  // Nonaktifkan tombol saat loading
  const btn = document.querySelector('[onclick="doLogin()"]');
  if (btn) { btn.disabled = true; btn.textContent = "Signing in…"; }

  try {
    await loginAdmin(email, password);
    // onAuthChange otomatis trigger showAdminShell()
  } catch (err) {
    errEl.textContent = getAuthErrorMessage(err.code);
    errEl.classList.remove("d-none");
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "Sign In →"; }
  }
}

export async function doLogout() {
  await logoutAdmin();
}

function getAuthErrorMessage(code) {
  const messages = {
    "auth/user-not-found":       "Email tidak ditemukan.",
    "auth/wrong-password":       "Password salah.",
    "auth/invalid-email":        "Format email tidak valid.",
    "auth/too-many-requests":    "Terlalu banyak percobaan. Coba lagi nanti.",
    "auth/invalid-credential":   "Email atau password salah.",
  };
  return messages[code] || "Login gagal. Periksa email dan password.";
}

// ============================================================
//  TAB SWITCHING
// ============================================================

export function switchTab(tab, link) {
  document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".sidebar-link").forEach((l) => l.classList.remove("active"));
  const el = document.getElementById(`tab-${tab}`);
  if (el) el.classList.add("active");
  link.classList.add("active");

  const titles = {
    dashboard: "Dashboard", places: "Kelola Destinasi",
    users: "Users", settings: "Pengaturan",
    messages: "Pesan Masuk", analytics: "Analitik Pencarian",
  };
  document.getElementById("pageTitle").textContent = titles[tab] || tab;

  if (tab === "messages")  loadAdminMessages();
  if (tab === "analytics") loadSearchAnalytics();
}

export function toggleSidebar() {
  document.getElementById("adminSidebar").classList.toggle("open");
}

// ============================================================
//  DASHBOARD
// ============================================================

async function loadDashboard() {
  allPlaces = await getPlaces();

  const total    = allPlaces.length;
  const avgRating = (allPlaces.reduce((s, p) => s + (p.rating || 0), 0) / total).toFixed(1);
  const hiddenGems = allPlaces.filter((p) => p.hidden_gem).length;
  const cats = allPlaces.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  renderStatCard("sc-total",    "bi-geo-alt-fill",  "#eab308,#fef3c7", total,              "Total Destinasi");
  renderStatCard("sc-rating",   "bi-star-fill",     "#22c55e,#dcfce7", avgRating,          "Avg. Rating");
  renderStatCard("sc-gems",     "bi-gem",           "#7c3aed,#ede9fe", hiddenGems,         "Hidden Gems");
  renderStatCard("sc-nature",   "bi-tree",          "#2d9e6b,#d1fae5", cats.nature  || 0, "Nature");
  renderStatCard("sc-mountain", "bi-snow2",         "#7c5c3b,#fef3c7", cats.mountain || 0, "Mountain");

  // Recent table
  const recent = allPlaces.slice(0, 7);
  document.getElementById("recentTable").innerHTML = `
    <thead><tr><th>Nama</th><th>Kategori</th><th>Lokasi</th><th>Rating</th></tr></thead>
    <tbody>${recent.map((p) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td><span class="cat-admin-badge" style="color:${CAT_COLORS[p.category] || "#64748b"}">${p.category || "-"}</span></td>
        <td class="text-muted small">${p.vicinity || "-"}</td>
        <td>${p.rating ? `<span style="color:#eab308">★</span> ${p.rating}` : "—"}</td>
      </tr>`).join("")}
    </tbody>`;

  // Category distribution
  const catTotal = Object.values(cats).reduce((a, b) => a + b, 0) || 1;
  document.getElementById("catDistribution").innerHTML = Object.entries(cats)
    .map(([cat, count]) => `
      <div class="cat-bar-item">
        <div class="cat-bar-label"><span>${cap(cat)}</span><span>${count}</span></div>
        <div class="cat-bar-track">
          <div class="cat-bar-fill" style="width:${((count / catTotal) * 100).toFixed(1)}%;background:${CAT_COLORS[cat] || "#64748b"}"></div>
        </div>
      </div>`).join("") || '<p class="text-muted small">No data</p>';
}

function renderStatCard(id, icon, colors, value, label) {
  const [bg, light] = colors.split(",");
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `
    <div class="stat-card-icon" style="background:${light};color:${bg}">
      <i class="bi ${icon}"></i>
    </div>
    <div class="stat-card-num">${value}</div>
    <div class="stat-card-label">${label}</div>`;
}

// ============================================================
//  PLACES TABLE
// ============================================================

async function loadPlacesTable() {
  if (!allPlaces.length) allPlaces = await getPlaces();
  renderPlacesTable(allPlaces);
}

function renderPlacesTable(places) {
  const tbody = document.getElementById("placesTableBody");
  if (!places.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Tidak ada destinasi.</td></tr>`;
    return;
  }
  tbody.innerHTML = places.map((p) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          ${p.photo_url ? `<img src="${p.photo_url}" style="width:36px;height:36px;object-fit:cover;border-radius:8px" alt=""/>` : ""}
          <strong>${p.name}</strong>
          ${p.hidden_gem ? '<span class="badge ms-1" style="background:#ede9fe;color:#6d28d9;font-size:10px">Gem</span>' : ""}
        </div>
      </td>
      <td><span class="cat-admin-badge" style="color:${CAT_COLORS[p.category] || "#64748b"};background:${CAT_COLORS[p.category] || "#64748b"}22">${cap(p.category || "other")}</span></td>
      <td class="text-muted small">${p.vicinity || "-"}</td>
      <td>${p.rating ? `<span style="color:#eab308">★</span> ${p.rating}` : "—"}</td>
      <td>
        <button class="btn-icon-sm me-1" onclick="openEditModal('${p.place_id}')" title="Edit"><i class="bi bi-pencil"></i></button>
        <button class="btn-icon-sm del" onclick="deletePlaceUI('${p.place_id}')" title="Hapus"><i class="bi bi-trash"></i></button>
      </td>
    </tr>`).join("");
}

export function filterAdminPlaces() {
  const q = document.getElementById("adminSearchInput").value.toLowerCase();
  const filtered = allPlaces.filter(
    (p) => p.name.toLowerCase().includes(q) || (p.vicinity || "").toLowerCase().includes(q)
  );
  renderPlacesTable(filtered);
}

// ============================================================
//  ADD / EDIT MODAL
// ============================================================

export function openAddModal() {
  clearPlaceForm();
  document.getElementById("placeModalTitle").textContent = "Tambah Destinasi";
  document.getElementById("placeId").value = "";
  new bootstrap.Modal(document.getElementById("placeModal")).show();
}

export function openEditModal(id) {
  const place = allPlaces.find((p) => p.place_id === id);
  if (!place) return;

  document.getElementById("placeModalTitle").textContent = "Edit Destinasi";
  document.getElementById("placeId").value          = id;
  document.getElementById("placeName").value         = place.name || "";
  document.getElementById("placeCategory").value     = place.category || "nature";
  document.getElementById("placeVicinity").value     = place.vicinity || "";
  document.getElementById("placeRating").value       = place.rating || "";
  document.getElementById("placeReviews").value      = place.user_ratings_total || "";
  document.getElementById("placePhoto").value        = place.photo_url || "";
  document.getElementById("placeDesc").value         = place.description || "";
  document.getElementById("placeLat").value          = place.geometry?.location?.lat || "";
  document.getElementById("placeLng").value          = place.geometry?.location?.lng || "";
  document.getElementById("placeDistance").value     = place.distance_from_purwokerto || "";
  document.getElementById("placeHiddenGem").checked  = !!place.hidden_gem;
  document.getElementById("placeHtmWeekday").value   = place.htm?.weekday || "";
  document.getElementById("placeHtmWeekend").value   = place.htm?.weekend || "";
  document.getElementById("placeHtmParking").value   = place.htm?.parking || "";
  document.getElementById("placeHtmNote").value      = place.htm?.note || "";
  document.getElementById("placeOpenDays").value     = place.open_hours?.days || "";
  document.getElementById("placeOpenTime").value     = place.open_hours?.open || "";
  document.getElementById("placeCloseTime").value    = place.open_hours?.close || "";
  document.getElementById("placeFacilities").value   = (place.facilities || []).join(", ");
  document.getElementById("placeTips").value         = place.tips || "";
  document.getElementById("placeHistory").value      = place.history || "";
  document.getElementById("placeTags").value         = (place.tags || []).join(", ");

  new bootstrap.Modal(document.getElementById("placeModal")).show();
}

export async function savePlaceUI() {
  const btn  = document.getElementById("savePlaceBtn");
  const name = document.getElementById("placeName").value.trim();
  if (!name) { alert("Nama destinasi wajib diisi."); return; }

  btn.disabled    = true;
  btn.textContent = "Menyimpan…";

  try {
    const id = document.getElementById("placeId").value;

    // Handle foto upload jika ada file baru
    let photoUrl = document.getElementById("placePhoto").value || null;
    const fileInput = document.getElementById("placePhotoFile");
    if (fileInput?.files[0]) {
      const tempId = id || `tmp_${Date.now()}`;
      showUploadProgress(0);
      photoUrl = await uploadPhoto(fileInput.files[0], tempId, showUploadProgress);
      hideUploadProgress();
    }

    const htmWeekday = parseInt(document.getElementById("placeHtmWeekday").value) || 0;
    const htmWeekend = parseInt(document.getElementById("placeHtmWeekend").value) || 0;
    const htmParking = parseInt(document.getElementById("placeHtmParking").value) || 0;

    const place = {
      place_id: id || null,
      name,
      category:             document.getElementById("placeCategory").value,
      vicinity:             document.getElementById("placeVicinity").value,
      rating:               parseFloat(document.getElementById("placeRating").value) || null,
      user_ratings_total:   parseInt(document.getElementById("placeReviews").value) || null,
      photo_url:            photoUrl,
      description:          document.getElementById("placeDesc").value,
      geometry: {
        location: {
          lat: parseFloat(document.getElementById("placeLat").value) || 0,
          lng: parseFloat(document.getElementById("placeLng").value) || 0,
        },
      },
      distance_from_purwokerto: parseInt(document.getElementById("placeDistance").value) || null,
      hidden_gem:   document.getElementById("placeHiddenGem").checked,
      htm: {
        weekday: htmWeekday,
        weekend: htmWeekend,
        parking: htmParking,
        note:    document.getElementById("placeHtmNote").value,
      },
      open_hours: {
        days:  document.getElementById("placeOpenDays").value,
        open:  document.getElementById("placeOpenTime").value,
        close: document.getElementById("placeCloseTime").value,
      },
      facilities: document.getElementById("placeFacilities").value
        .split(",").map((s) => s.trim()).filter(Boolean),
      tips:    document.getElementById("placeTips").value,
      history: document.getElementById("placeHistory").value,
      tags:    document.getElementById("placeTags").value
        .split(",").map((s) => s.trim()).filter(Boolean),
      types:  ["tourist_attraction"],
    };

    await savePlace(place);
    bootstrap.Modal.getInstance(document.getElementById("placeModal"))?.hide();
    allPlaces = await getPlaces();
    renderPlacesTable(allPlaces);
    await loadDashboard();
    clearPlaceForm();
  } catch (err) {
    alert("Gagal menyimpan: " + err.message);
    console.error(err);
  } finally {
    btn.disabled    = false;
    btn.textContent = "Simpan";
  }
}

export async function deletePlaceUI(id) {
  const place = allPlaces.find((p) => p.place_id === id);
  if (!confirm(`Hapus "${place?.name || id}"? Tindakan ini tidak bisa dibatalkan.`)) return;
  try {
    await deletePlace(id);
    allPlaces = allPlaces.filter((p) => p.place_id !== id);
    renderPlacesTable(allPlaces);
    await loadDashboard();
  } catch (err) {
    alert("Gagal menghapus: " + err.message);
  }
}

function showUploadProgress(pct) {
  let bar = document.getElementById("uploadProgressWrap");
  if (!bar) return;
  bar.classList.remove("d-none");
  bar.querySelector(".progress-bar").style.width = pct + "%";
  bar.querySelector(".progress-bar").textContent = pct + "%";
}
function hideUploadProgress() {
  const bar = document.getElementById("uploadProgressWrap");
  if (bar) bar.classList.add("d-none");
}

function clearPlaceForm() {
  [
    "placeId","placeName","placeVicinity","placeRating","placeReviews",
    "placePhoto","placeDesc","placeLat","placeLng","placeDistance",
    "placeHtmWeekday","placeHtmWeekend","placeHtmParking","placeHtmNote",
    "placeOpenDays","placeOpenTime","placeCloseTime",
    "placeFacilities","placeTips","placeHistory","placeTags",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const gem = document.getElementById("placeHiddenGem");
  if (gem) gem.checked = false;
}

// ============================================================
//  MESSAGES
// ============================================================

async function loadAdminMessages() {
  const msgs  = await getMessages();
  const unread = msgs.filter((m) => !m.read).length;
  const badge  = document.getElementById("msgBadge");
  if (badge) badge.textContent = unread > 0 ? unread : "";

  const list = document.getElementById("messagesList");
  if (!list) return;

  if (!msgs.length) {
    list.innerHTML = `<div class="p-4 text-center text-muted"><i class="bi bi-inbox display-6 d-block mb-2"></i>Belum ada pesan masuk.</div>`;
    return;
  }

  list.innerHTML = msgs.map((m) => {
    const date = m.created_at?.toDate
      ? m.created_at.toDate().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
      : "-";
    return `
      <div class="msg-item ${m.read ? "" : "msg-unread"}" onclick="markReadUI('${m.id}')">
        <div class="msg-header">
          <div><span class="msg-name">${m.name || "-"}</span>${!m.read ? '<span class="msg-new-badge">Baru</span>' : ""}</div>
          <span class="msg-date">${date}</span>
        </div>
        <div class="msg-email"><i class="bi bi-envelope me-1"></i>${m.email || "-"}${m.phone ? ` • ${m.phone}` : ""}</div>
        ${m.topic ? `<span class="msg-topic-badge">${m.topic}</span>` : ""}
        <p class="msg-body">${m.message || ""}</p>
        <button class="btn btn-sm btn-outline-danger mt-1" onclick="event.stopPropagation();deleteMessageUI('${m.id}')">
          <i class="bi bi-trash me-1"></i>Hapus
        </button>
      </div>`;
  }).join("");
}

export async function markReadUI(id) {
  await markMessageRead(id);
  await loadAdminMessages();
}

export async function deleteMessageUI(id) {
  if (!confirm("Hapus pesan ini?")) return;
  await deleteMessage(id);
  await loadAdminMessages();
}

export async function clearMessages() {
  if (!confirm("Hapus semua pesan? Tindakan ini tidak bisa dibatalkan.")) return;
  const msgs = await getMessages();
  await Promise.all(msgs.map((m) => deleteMessage(m.id)));
  await loadAdminMessages();
}

// ============================================================
//  USERS (static untuk sementara)
// ============================================================

function loadUsers() {
  document.getElementById("usersTableBody").innerHTML = `
    <tr>
      <td>1</td>
      <td><strong>Admin</strong></td>
      <td class="text-muted">admin@traveloop.com</td>
      <td><span class="badge bg-warning text-dark">admin</span></td>
      <td class="text-muted small">—</td>
    </tr>`;
}

// ============================================================
//  SETTINGS
// ============================================================

function loadSettings() {
  const el = document.getElementById("apiKeyInput");
  if (el) el.value = CONFIG?.GOOGLE_MAPS_API_KEY !== "YOUR_GOOGLE_MAPS_API_KEY"
    ? CONFIG.GOOGLE_MAPS_API_KEY : "";
}

export function saveSettings() {
  const key    = document.getElementById("apiKeyInput")?.value.trim();
  const radius = parseInt(document.getElementById("radiusInput")?.value);
  if (key)    localStorage.setItem("wn_api_key", key);
  if (radius) localStorage.setItem("wn_radius", radius);
  alert("Settings saved!");
}

export function exportData() {
  const data = JSON.stringify(allPlaces, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = "traveloop-places.json";
  a.click();
}

// ============================================================
//  ANALYTICS (search history — tetap dari localStorage)
// ============================================================

function loadSearchAnalytics() {
  // Fungsi ini tetap pakai localStorage karena search tracking ada di script.js
  if (typeof window.loadSearchAnalytics === "function") {
    window.loadSearchAnalytics();
  }
}

// ── Helpers ───────────────────────────────────────────────────
function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}