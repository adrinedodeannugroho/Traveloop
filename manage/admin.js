// ============================================================
//  Traveloop — Admin Panel Script
// ============================================================

const CAT_COLORS = {
  nature: '#2d9e6b', beach: '#0ea5e9', mountain: '#7c5c3b',
  cultural: '#e88a22', historical: '#9b4f96',
};

function initAdmin() {
  if (!DB.isLoggedIn()) {
    document.getElementById('loginScreen').classList.remove('d-none');
    document.getElementById('adminShell').classList.add('d-none');
  } else {
    showAdminShell();
  }
}

function doLogin() {
  const pass = document.getElementById('loginPass').value;
  if (DB.login(pass)) {
    showAdminShell();
  } else {
    document.getElementById('loginError').classList.remove('d-none');
  }
}

function showAdminShell() {
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('adminShell').classList.remove('d-none');
  loadDashboard();
  loadPlacesTable();
  loadUsers();
  loadSettings();
}

function doLogout() {
  DB.logout();
  document.getElementById('loginScreen').classList.remove('d-none');
  document.getElementById('adminShell').classList.add('d-none');
}

// ── Tab switching ─────────────────────────────────────────────
function switchTab(tab, link) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  link.classList.add('active');
  const titles = { dashboard: 'Dashboard', places: 'Manage Places', users: 'Users', settings: 'Settings' };
  document.getElementById('pageTitle').textContent = titles[tab] || tab;
}

function toggleSidebar() {
  document.getElementById('adminSidebar').classList.toggle('open');
}

// ── Dashboard ─────────────────────────────────────────────────
function loadDashboard() {
  const stats = DB.getStats();
  const places = DB.getPlaces();

  // Stat cards
  renderStatCard('sc-total', 'bi-geo-alt-fill', '#eab308,#fef3c7', stats.total, 'Total Destinations');
  renderStatCard('sc-rating', 'bi-star-fill', '#22c55e,#dcfce7', stats.avgRating, 'Avg. Rating');
  renderStatCard('sc-beach', 'bi-water', '#0ea5e9,#e0f2fe', stats.categories.beach || 0, 'Beach Spots');
  renderStatCard('sc-mountain', 'bi-snow2', '#7c5c3b,#fef3c7', stats.categories.mountain || 0, 'Mountains');
  renderStatCard('sc-gems', 'bi-gem', '#7c3aed,#ede9fe', stats.hiddenGems || 0, 'Hidden Gems');

  // Recent table
  const recent = places.slice(0, 7);
  const tbody = recent.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span class="cat-admin-badge" style="color:${CAT_COLORS[p.category]||'#64748b'}">${p.category||'-'}</span></td>
      <td class="text-muted small">${p.vicinity || '-'}</td>
      <td>${p.rating ? `<span style="color:#eab308">★</span> ${p.rating}` : '—'}</td>
    </tr>`).join('');
  document.getElementById('recentTable').innerHTML = `
    <thead><tr><th>Name</th><th>Category</th><th>Location</th><th>Rating</th></tr></thead>
    <tbody>${tbody}</tbody>`;

  // Category distribution
  const cats = stats.categories;
  const total = Object.values(cats).reduce((a, b) => a + b, 0) || 1;
  const catHtml = Object.entries(cats).map(([cat, count]) => `
    <div class="cat-bar-item">
      <div class="cat-bar-label"><span>${cap(cat)}</span><span>${count}</span></div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${(count/total*100).toFixed(1)}%;background:${CAT_COLORS[cat]||'#64748b'}"></div>
      </div>
    </div>`).join('');
  document.getElementById('catDistribution').innerHTML = catHtml || '<p class="text-muted small">No data</p>';
}

function renderStatCard(id, icon, colors, value, label) {
  const [bg, light] = colors.split(',');
  document.getElementById(id).innerHTML = `
    <div class="stat-card-icon" style="background:${light};color:${bg}">
      <i class="bi ${icon}"></i>
    </div>
    <div class="stat-card-num">${value}</div>
    <div class="stat-card-label">${label}</div>`;
}

// ── Places table ──────────────────────────────────────────────
function loadPlacesTable() {
  const places = DB.getPlaces();
  renderPlacesTable(places);
}

function renderPlacesTable(places) {
  const tbody = document.getElementById('placesTableBody');
  if (!places.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No places found.</td></tr>`;
    return;
  }
  tbody.innerHTML = places.map((p, i) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          ${p.photo_url ? `<img src="${p.photo_url}" style="width:36px;height:36px;object-fit:cover;border-radius:8px" alt=""/>` : ''}
          <strong>${p.name}</strong>
        </div>
      </td>
      <td><span class="cat-admin-badge" style="color:${CAT_COLORS[p.category]||'#64748b'};background:${CAT_COLORS[p.category]||'#64748b'}22">${cap(p.category||'other')}</span></td>
      <td class="text-muted small">${p.vicinity || '-'}</td>
      <td>${p.rating ? `<span style="color:#eab308">★</span> ${p.rating}` : '—'}</td>
      <td>
        <button class="btn-icon-sm me-1" onclick="openEditModal('${p.place_id}')" title="Edit"><i class="bi bi-pencil"></i></button>
        <button class="btn-icon-sm del" onclick="deletePlace('${p.place_id}')" title="Delete"><i class="bi bi-trash"></i></button>
      </td>
    </tr>`).join('');
}

function filterAdminPlaces() {
  const q = document.getElementById('adminSearchInput').value.toLowerCase();
  const filtered = DB.getPlaces().filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.vicinity || '').toLowerCase().includes(q)
  );
  renderPlacesTable(filtered);
}

// ── CRUD ──────────────────────────────────────────────────────
function openAddModal() {
  clearPlaceForm();
  document.getElementById('placeModalTitle').textContent = 'Add Place';
  document.getElementById('placeId').value = '';
  new bootstrap.Modal(document.getElementById('placeModal')).show();
}

function openEditModal(id) {
  const place = DB.getPlaces().find(p => p.place_id === id);
  if (!place) return;
  document.getElementById('placeModalTitle').textContent = 'Edit Place';
  document.getElementById('placeId').value = id;
  document.getElementById('placeName').value = place.name || '';
  document.getElementById('placeCategory').value = place.category || 'nature';
  const hg = document.getElementById('placeHiddenGem'); if(hg) hg.checked = !!place.hidden_gem;
  document.getElementById('placeVicinity').value = place.vicinity || '';
  document.getElementById('placeRating').value = place.rating || '';
  document.getElementById('placeReviews').value = place.user_ratings_total || '';
  document.getElementById('placePhoto').value = place.photo_url || '';
  document.getElementById('placeDesc').value = place.description || '';
  document.getElementById('placeLat').value = place.geometry?.location?.lat || '';
  document.getElementById('placeLng').value = place.geometry?.location?.lng || '';
  new bootstrap.Modal(document.getElementById('placeModal')).show();
}

function savePlace() {
  const id = document.getElementById('placeId').value;
  const name = document.getElementById('placeName').value.trim();
  if (!name) { alert('Name is required.'); return; }

  const place = {
    place_id: id || `custom_${Date.now()}`,
    name,
    category: document.getElementById('placeCategory').value,
    vicinity: document.getElementById('placeVicinity').value,
    rating: parseFloat(document.getElementById('placeRating').value) || null,
    user_ratings_total: parseInt(document.getElementById('placeReviews').value) || null,
    photo_url: document.getElementById('placePhoto').value || null,
    description: document.getElementById('placeDesc').value,
    geometry: {
      location: {
        lat: parseFloat(document.getElementById('placeLat').value) || 0,
        lng: parseFloat(document.getElementById('placeLng').value) || 0,
      }
    },
    photos: [],
    types: ['tourist_attraction'],
  };

  let places = DB.getPlaces();
  if (id) {
    places = places.map(p => p.place_id === id ? place : p);
  } else {
    places.unshift(place);
  }
  DB.savePlaces(places);
  bootstrap.Modal.getInstance(document.getElementById('placeModal'))?.hide();
  loadPlacesTable();
  loadDashboard();
  clearPlaceForm();
}

function deletePlace(id) {
  if (!confirm('Delete this place?')) return;
  const places = DB.getPlaces().filter(p => p.place_id !== id);
  DB.savePlaces(places);
  loadPlacesTable();
  loadDashboard();
}

function clearPlaceForm() {
  ['placeId','placeName','placeVicinity','placeRating','placeReviews','placePhoto','placeDesc','placeLat','placeLng'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('placeCategory').value = 'nature';
}

// ── Users ─────────────────────────────────────────────────────
function loadUsers() {
  const users = DB.getUsers();
  document.getElementById('usersTableBody').innerHTML = users.map((u, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${u.name}</strong></td>
      <td class="text-muted">${u.email}</td>
      <td><span class="badge bg-warning text-dark">${u.role}</span></td>
      <td class="text-muted small">${u.joined}</td>
    </tr>`).join('');
}

// ── Settings ──────────────────────────────────────────────────
function loadSettings() {
  document.getElementById('apiKeyInput').value = CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY' ? '' : CONFIG.GOOGLE_MAPS_API_KEY;
  document.getElementById('radiusInput').value = CONFIG.DEFAULT_RADIUS;
}

function saveSettings() {
  const key = document.getElementById('apiKeyInput').value.trim();
  const radius = parseInt(document.getElementById('radiusInput').value);
  if (key) localStorage.setItem('wn_api_key', key);
  if (radius) localStorage.setItem('wn_radius', radius);
  alert('Settings saved! Reload the page to apply the API key.');
}

function exportData() {
  const data = JSON.stringify(DB.getPlaces(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'traveloop-places.json';
  a.click();
}

function resetData() {
  if (!confirm('Reset all data to mock dataset? This cannot be undone.')) return;
  localStorage.removeItem('wn_places');
  loadPlacesTable();
  loadDashboard();
  alert('Data reset to default.');
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

// Prevent modal close on escape for login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('loginPass') === document.activeElement) doLogin();
});

// ── Extended switchTab with new tabs ──────────────────────────
const _baseSwitchTab = switchTab;
switchTab = function(tab, link) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById(`tab-${tab}`);
  if (el) el.classList.add('active');
  link.classList.add('active');
  const titles = {
    dashboard: 'Dashboard', places: 'Kelola Destinasi',
    users: 'Users', settings: 'Pengaturan',
    messages: 'Pesan Masuk', analytics: 'Analitik Pencarian'
  };
  document.getElementById('pageTitle').textContent = titles[tab] || tab;

  if (tab === 'messages') loadAdminMessages();
  if (tab === 'analytics') loadSearchAnalytics();
};

// Override showAdminShell to also load messages badge
const _origShowAdmin = showAdminShell;
showAdminShell = function() {
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('adminShell').classList.remove('d-none');
  loadDashboard();
  loadPlacesTable();
  loadUsers();
  loadSettings();
  loadAdminMessages();
};
