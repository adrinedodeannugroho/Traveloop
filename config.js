// ============================================================
//  Traveloop — Configuration
//  Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
// ============================================================

const CONFIG = {
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",
  PLACES_API_BASE: "https://maps.googleapis.com/maps/api/place",
  DEFAULT_CENTER: { lat: -7.4226, lng: 109.2354 }, // Purwokerto
  DEFAULT_RADIUS: 50000,
  PURWOKERTO_CENTER: { lat: -7.4226, lng: 109.2354 },
};

// ============================================================
//  MOCK DATA — Enriched with HTM, hours, distance, history
// ============================================================

const MOCK_PLACES = [
  {
    place_id: "bms_01",
    name: "Baturraden",
    vicinity: "Baturaden, Banyumas, Jawa Tengah",
    rating: 4.5,
    user_ratings_total: 8420,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3108, lng: 109.2285 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: false,
    description:
      "Kawasan wisata alam di kaki Gunung Slamet dengan udara sejuk, air terjun, dan pemandian air panas alami. Salah satu destinasi paling populer di Banyumas yang sudah terkenal sejak zaman kolonial Belanda.",
    history:
      'Baturraden berasal dari kata "Batur" (pembantu) dan "Raden" (bangsawan). Konon, tempat ini bermula dari kisah cinta seorang pembantu dan putri bupati. Kawasan ini mulai dikembangkan sebagai destinasi wisata oleh pemerintah kolonial Belanda pada awal abad ke-20 karena iklimnya yang sejuk menyerupai pegunungan Swiss.',
    htm: {
      weekday: 15000,
      weekend: 20000,
      parking: 5000,
      note: "Harga per orang, parkir terpisah",
    },
    open_hours: { open: "07:00", close: "17:00", days: "Setiap hari" },
    facilities: [
      "Kolam Renang",
      "Area Piknik",
      "Warung Makan",
      "Toilet",
      "Mushola",
      "Parkir Luas",
    ],
    tips: "Datang pagi hari agar lebih sepi. Bawa jaket karena udara cukup dingin. Musim kemarau (Juni-September) adalah waktu terbaik.",
    distance_from_purwokerto: 14,
    photo_url:
      "https://www.cimbniaga.co.id/content/dam/cimb/inspirasi/lokawisata-baturraden.webp",
    tags: ["populer", "keluarga", "alam", "air-terjun", "air-panas"],
  },
  {
    place_id: "bms_02",
    name: "Curug Cipendok",
    vicinity: "Cilongok, Banyumas, Jawa Tengah",
    rating: 4.6,
    user_ratings_total: 3540,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3797, lng: 109.1483 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: false,
    description:
      "Air terjun setinggi 92 meter yang megah di tengah hutan pinus lebat. Salah satu air terjun tertinggi di Jawa Tengah dengan suasana yang sangat asri dan sejuk.",
    history:
      'Curug Cipendok sudah dikenal sejak lama oleh warga sekitar sebagai tempat keramat. Nama "Cipendok" berasal dari bahasa Sunda kuno. Air terjun ini terbentuk dari aliran Sungai Cipendok yang berhulu di lereng Gunung Slamet, mengalir melewati tebing curam setinggi 92 meter.',
    htm: {
      weekday: 15000,
      weekend: 20000,
      parking: 5000,
      note: "Sudah termasuk asuransi wisata",
    },
    open_hours: { open: "07:00", close: "17:00", days: "Setiap hari" },
    facilities: [
      "Area Parkir",
      "Warung Makan",
      "Toilet Umum",
      "Jembatan Gantung",
      "Gazebo",
    ],
    tips: "Gunakan sepatu yang nyaman karena jalur menuju air terjun cukup licin. Bawa pakaian ganti. Jangan berenang terlalu dekat dengan jatuhan air.",
    distance_from_purwokerto: 22,
    photo_url:
      "https://jejakpiknik.com/wp-content/uploads/2018/04/Curug-Cipendok-1-630x380-1.jpg",
    tags: ["air-terjun", "alam", "petualangan", "fotografi"],
  },
  {
    place_id: "bms_03",
    name: "Gunung Slamet",
    vicinity: "Baturraden, Banyumas, Jawa Tengah",
    rating: 4.8,
    user_ratings_total: 2870,
    types: ["mountain", "nature", "tourist_attraction"],
    geometry: { location: { lat: -7.2427, lng: 109.2079 } },
    photos: [{ photo_reference: null }],
    category: "mountain",
    hidden_gem: false,
    description:
      "Gunung berapi aktif tertinggi di Jawa Tengah (3.428 mdpl). Menawarkan jalur pendakian menantang dengan pemandangan kawah dan lautan awan yang spektakuler.",
    history:
      "Gunung Slamet adalah gunung berapi strato aktif dan merupakan puncak tertinggi di Jawa Tengah. Dalam kepercayaan masyarakat Jawa, gunung ini dianggap keramat dan sering menjadi tempat ritual. Jalur pendakian via Bambangan (Purbalingga) dan via Baturraden adalah yang paling populer.",
    htm: {
      weekday: 25000,
      weekend: 25000,
      parking: 10000,
      note: "Biaya simaksi + wajib melapor ke pos pendakian",
    },
    open_hours: {
      open: "00:00",
      close: "23:59",
      days: "Setiap hari (kondisional)",
    },
    facilities: ["Pos Pendakian", "Shelter", "Sumber Air", "Area Camping"],
    tips: "Wajib membawa surat keterangan sehat. Bawa bekal cukup untuk 2-3 hari. Cek kondisi gunung sebelum mendaki. Pendakian terbaik April-Oktober.",
    distance_from_purwokerto: 18,
    photo_url:
      "https://th.bing.com/th/id/R.a2ff50489fea866257b19fa0df34641c?rik=vJdMQ5ZzElL8aQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-GIKCh_wEaJg%2fVgllH2FAdDI%2fAAAAAAAAAEM%2fOZqr_gU67Ig%2fs1600%2fGunung_Slamet_dari_Kr_Salam.jpg&ehk=v8oPO8r6srQGpD7L1cC8tIvWjCug9l8MTK25ZODUpag%3d&risl=&pid=ImgRaw&r=0",
    tags: ["pendakian", "gunung", "petualangan", "camping", "sunrise"],
  },
  {
    place_id: "bms_04",
    name: "Telaga Sunyi",
    vicinity: "Baturraden, Banyumas, Jawa Tengah",
    rating: 4.4,
    user_ratings_total: 2210,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3195, lng: 109.2301 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: true,
    description:
      "Danau kecil tersembunyi di kawasan Baturraden dengan air jernih kehijauan dan suasana tenang. Dikelilingi pepohonan rimbun, cocok untuk piknik dan melepas penat.",
    history:
      "Telaga Sunyi adalah danau alam tersembunyi yang letaknya tidak banyak diketahui wisatawan. Airnya berasal dari mata air alami di kaki Gunung Slamet. Konon danau ini dulu menjadi tempat mandi para bidadari dalam legenda masyarakat setempat.",
    htm: {
      weekday: 10000,
      weekend: 15000,
      parking: 3000,
      note: "Harga terjangkau, akses via Baturraden",
    },
    open_hours: { open: "07:00", close: "16:00", days: "Setiap hari" },
    facilities: ["Area Duduk", "Gazebo", "Toilet Sederhana"],
    tips: "Lokasi agak tersembunyi, lebih baik gunakan GPS. Bawa bekal sendiri karena tidak banyak penjual di sekitar.",
    distance_from_purwokerto: 16,
    photo_url:
      "https://tse3.mm.bing.net/th/id/OIP.qK2-DfmGn3yqeTHsEzpH0wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    tags: ["hidden-gem", "danau", "tenang", "alam", "tersembunyi"],
  },
  {
    place_id: "bms_05",
    name: "Museum BRI Purwokerto",
    vicinity: "Purwokerto, Banyumas, Jawa Tengah",
    rating: 4.3,
    user_ratings_total: 1560,
    types: ["historical", "cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.4226, lng: 109.2356 } },
    photos: [{ photo_reference: null }],
    category: "historical",
    hidden_gem: false,
    description:
      "Museum perbankan bersejarah yang berada di gedung asli tempat Bank Rakyat Indonesia didirikan pada tahun 1895. Menyimpan koleksi artefak sejarah perbankan nasional.",
    history:
      "Bank Rakyat Indonesia (BRI) didirikan di Purwokerto pada 16 Desember 1895 oleh Raden Bei Aria Wirjaatmadja. Awalnya bernama De Poerwokertosche Hulp en Spaarbank der Inlandsche Hoofden (Bank Bantuan dan Simpanan Milik Kaum Priyayi Purwokerto). Museum ini menjadi bukti sejarah lembaga keuangan pertama milik pribumi Indonesia.",
    htm: {
      weekday: 0,
      weekend: 0,
      parking: 3000,
      note: "Gratis masuk! Hanya bayar parkir",
    },
    open_hours: { open: "08:00", close: "15:00", days: "Senin-Jumat" },
    facilities: ["Ruang Pamer", "AC", "Pemandu Wisata", "Toilet", "Parkir"],
    tips: "Museum tutup sabtu-minggu. Datang di hari kerja. Tersedia pemandu gratis yang bisa menjelaskan sejarah BRI secara detail.",
    distance_from_purwokerto: 1,
    photo_url:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJ2tdfy3L5nL8vfF5yc-U0eNVHDnPT7kSdSdKZulh6N6NOSs7RUnjxt_QHHAFf8dITQK2wKG3ny4ISITjy-k1GolSnNmrA-R-eEOhaVFGVVyb1hIZk0Y7fA9l1rsV543fFOGyOeVA9q8iZ/s400/MUSEUM+BANK+BRI+PURWOKERTO+BANYUMAS.JPG",
    tags: ["sejarah", "edukasi", "gratis", "museum", "perbankan"],
  },
  {
    place_id: "bms_06",
    name: "Curug Gomblang",
    vicinity: "Baturaden, Banyumas, Jawa Tengah",
    rating: 4.5,
    user_ratings_total: 1890,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3352, lng: 109.2244 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: true,
    description:
      "Air terjun kembar yang indah di kawasan Baturraden. Aliran air yang deras menghujam kolam biru di bawahnya, dikelilingi bebatuan berlumut dan hutan tropis.",
    history:
      'Curug Gomblang merupakan salah satu air terjun di kawasan konservasi Baturraden. "Gomblang" dalam bahasa Jawa berarti besar atau lebar. Air terjun ini masih sangat alami dan belum banyak tersentuh pengembangan pariwisata.',
    htm: {
      weekday: 10000,
      weekend: 15000,
      parking: 3000,
      note: "Termasuk area Baturraden",
    },
    open_hours: { open: "07:00", close: "16:00", days: "Setiap hari" },
    facilities: ["Trek Alam", "Area Foto", "Toilet"],
    tips: "Perjalanan kaki sekitar 30-45 menit dari pintu masuk. Gunakan sepatu outdoor.",
    distance_from_purwokerto: 15,
    photo_url:
      "https://cdn.idntimes.com/content-images/community/2022/03/242208154-364251522015435-1593631680781946699-n-3f470419c48481a410869607195370a0-98769cda34da06b2e275b4733e15473d.jpg",
    tags: ["hidden-gem", "air-terjun", "trekking", "alam"],
  },
  {
    place_id: "bms_07",
    name: "Alun-Alun Purwokerto",
    vicinity: "Purwokerto Selatan, Banyumas, Jawa Tengah",
    rating: 4.3,
    user_ratings_total: 5120,
    types: ["cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.4307, lng: 109.2481 } },
    photos: [{ photo_reference: null }],
    category: "cultural",
    hidden_gem: false,
    description:
      "Pusat kota Purwokerto yang ramai. Terdapat Masjid Agung Banyumas, berbagai kuliner kaki lima, dan menjadi tempat berbagai event budaya kota.",
    history:
      "Alun-alun Purwokerto merupakan pusat pemerintahan dan kegiatan masyarakat sejak zaman Kesultanan Banyumas. Secara tradisional, alun-alun adalah simbol kekuatan pemerintahan dalam tata kota Jawa yang selalu diapit oleh masjid dan gedung pemerintahan.",
    htm: {
      weekday: 0,
      weekend: 0,
      parking: 3000,
      note: "Gratis! Hanya parkir",
    },
    open_hours: { open: "00:00", close: "23:59", days: "Setiap hari, 24 jam" },
    facilities: [
      "Area Terbuka",
      "Kuliner Kaki Lima",
      "Masjid",
      "Toilet Umum",
      "Bangku Taman",
    ],
    tips: "Paling ramai saat malam minggu. Coba jajan soto Purwokerto dan mendoan goreng di sekitar alun-alun.",
    distance_from_purwokerto: 2,
    photo_url:
      "https://ik.imagekit.io/tvlk/blog/2023/03/Alun-Alun-Purwokerto-Wisata-Purwokerto-Traveloka-Xperience.jpg?tr=dpr-1.5,h-480,q-40,w-1024",
    tags: ["gratis", "budaya", "kuliner", "malam", "keluarga"],
  },
  {
    place_id: "bms_08",
    name: "Curug Telu Baturaden",
    vicinity: "Baturaden, Banyumas, Jawa Tengah",
    rating: 4.4,
    user_ratings_total: 1640,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3278, lng: 109.2267 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: true,
    description:
      "Tiga tingkatan air terjun yang cantik dalam satu area di kawasan hutan Baturraden. Setiap tingkat memiliki karakteristik aliran dan kolam yang berbeda.",
    history:
      '"Telu" dalam bahasa Jawa berarti tiga. Curug Telu adalah kompleks tiga air terjun yang saling berdekatan di satu lembah. Tempat ini masih tergolong tersembunyi karena aksesnya yang membutuhkan treking melalui jalur hutan selama sekitar 1 jam.',
    htm: {
      weekday: 10000,
      weekend: 15000,
      parking: 3000,
      note: "Wajib dengan pemandu lokal",
    },
    open_hours: {
      open: "07:00",
      close: "15:00",
      days: "Setiap hari (cuaca cerah)",
    },
    facilities: ["Pemandu Lokal", "Trek Hutan"],
    tips: "Wajib membawa pemandu. Tidak disarankan datang sendirian. Bawa bekal air minum yang cukup.",
    distance_from_purwokerto: 16,
    photo_url:
      "https://tse2.mm.bing.net/th/id/OIP.zQ74hkW12EEBmIhaYd6XOwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    tags: ["hidden-gem", "air-terjun", "trekking", "petualangan"],
  },
  {
    place_id: "bms_09",
    name: "Lokawisata Baturraden",
    vicinity: "Baturraden, Banyumas, Jawa Tengah",
    rating: 4.2,
    user_ratings_total: 6780,
    types: ["nature", "cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.3123, lng: 109.2267 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: false,
    description:
      "Taman wisata resmi di kaki Gunung Slamet dengan kolam renang air panas, wahana permainan anak, kebun binatang mini, dan area outbond. Destinasi keluarga favorit.",
    history:
      "Lokawisata Baturraden dikelola oleh Pemerintah Kabupaten Banyumas dan sudah ada sejak tahun 1930-an. Pada masa penjajahan Belanda, kawasan ini dikenal sebagai tempat peristirahatan bagi pegawai kolonial karena udaranya yang sejuk dan sumber air panasnya.",
    htm: {
      weekday: 20000,
      weekend: 25000,
      parking: 5000,
      note: "Wahana tertentu bayar terpisah",
    },
    open_hours: { open: "07:00", close: "17:00", days: "Setiap hari" },
    facilities: [
      "Kolam Renang",
      "Wahana Anak",
      "Kebun Binatang Mini",
      "Resto",
      "Mushola",
      "Toilet",
      "Parkir Luas",
    ],
    tips: "Cocok untuk wisata keluarga dengan anak kecil. Bawa baju renang. Weekday lebih sepi dan nyaman.",
    distance_from_purwokerto: 14,
    photo_url:
      "https://asset.kompas.com/crops/goNe8LjgsUdKo6OyTlRViyc2Ft0=/0x0:0x0/750x500/data/photo/2021/08/27/612878ce84e64.jpg",
    tags: ["keluarga", "anak", "kolam-renang", "wahana", "air-panas"],
  },
  {
    place_id: "bms_10",
    name: "Situs Watu Kelir",
    vicinity: "Cilongok, Banyumas, Jawa Tengah",
    rating: 4.3,
    user_ratings_total: 980,
    types: ["historical", "nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3681, lng: 109.1612 } },
    photos: [{ photo_reference: null }],
    category: "historical",
    hidden_gem: true,
    description:
      "Situs purbakala berupa batu besar berbentuk dinding alami dengan ukiran dan pahatan kuno. Dipercaya memiliki nilai sejarah dan spiritual yang kuat.",
    history:
      'Watu Kelir merupakan situs megalitik yang diperkirakan berasal dari masa prasejarah. "Kelir" berarti layar atau tabir dalam bahasa Jawa. Batu-batu besar ini dipercaya pernah digunakan sebagai tempat upacara oleh masyarakat kuno yang menghuni lereng Gunung Slamet ribuan tahun lalu.',
    htm: {
      weekday: 5000,
      weekend: 10000,
      parking: 2000,
      note: "Sangat terjangkau",
    },
    open_hours: { open: "07:00", close: "17:00", days: "Setiap hari" },
    facilities: ["Area Parkir", "Toilet Sederhana"],
    tips: "Bawa kamera untuk mendokumentasikan ukiran batu yang unik. Hormati adat setempat.",
    distance_from_purwokerto: 20,
    photo_url: "https://i.ytimg.com/vi/_PeTfkwFQqs/maxresdefault.jpg",
    tags: ["hidden-gem", "sejarah", "arkeologi", "spiritual", "edukasi"],
  },
  {
    place_id: "bms_11",
    name: "Pagubugan Melung",
    vicinity: "Kedungbanteng, Banyumas, Jawa Tengah",
    rating: 4.4,
    user_ratings_total: 7230,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.3234, lng: 109.1823 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: false,
    description:
      "Kawasan wisata alam di Desa Melung yang menawarkan pemandangan hamparan kebun teh dan hutan pinus yang asri. Udara sejuk khas pegunungan dengan panorama Gunung Slamet yang memukau menjadikannya destinasi favorit untuk healing dan fotografi alam.",
    history:
      "Desa Melung terletak di kaki Gunung Slamet, Kecamatan Kedungbanteng. Kawasan Pagubugan dikenal sejak lama oleh warga lokal sebagai tempat berkumpul dan menikmati alam. Seiring berkembangnya wisata pedesaan di Banyumas, Pagubugan Melung mulai dikelola secara swadaya oleh masyarakat desa sebagai destinasi agrowisata dan alam yang mempertahankan kearifan lokal.",
    htm: {
      weekday: 10000,
      weekend: 15000,
      parking: 3000,
      note: "Dikelola langsung oleh warga lokal Desa Melung",
    },
    open_hours: { open: "06:00", close: "17:00", days: "Setiap hari" },
    facilities: [
      "Area Parkir",
      "Gazebo",
      "Spot Foto",
      "Warung Lokal",
      "Toilet Sederhana",
      "Trek Alam",
    ],
    tips: "Datang pagi untuk mendapat cahaya terbaik dan kabut tipis yang cantik. Bawa jaket karena suhu bisa sangat dingin. Gunakan kendaraan yang prima karena medan menanjak.",
    distance_from_purwokerto: 19,
    photo_url: "https://i.ytimg.com/vi/oSAAYmXSim8/maxresdefault.jpg",
    tags: ["alam", "kebun-teh", "pegunungan", "fotografi", "healing", "desa"],
  },
  {
    place_id: "bms_12",
    name: "Taman Budaya Soetedja",
    vicinity: "Purwokerto, Banyumas, Jawa Tengah",
    rating: 4.2,
    user_ratings_total: 730,
    types: ["cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.4289, lng: 109.2461 } },
    photos: [{ photo_reference: null }],
    category: "cultural",
    hidden_gem: false,
    description:
      "Pusat kebudayaan resmi Kabupaten Banyumas yang menjadi panggung utama seni pertunjukan, pameran, dan festival budaya lokal. Gedung megah ini rutin menggelar pertunjukan wayang, ketoprak, tari tradisional, dan pameran seni rupa karya seniman Banyumas.",
    history:
      "Taman Budaya Soetedja dinamai dari maestro musik asal Banyumas, R. Soetedja, yang dikenal sebagai pencipta lagu-lagu keroncong dan langgam Jawa legendaris. Dibangun oleh Pemerintah Kabupaten Banyumas sebagai bentuk penghormatan kepada beliau sekaligus sebagai wadah pelestarian dan pengembangan seni budaya daerah. Gedung ini menjadi pusat aktivitas komunitas seni dan budaya terbesar di wilayah eks-Karesidenan Banyumas.",
    htm: {
      weekday: 0,
      weekend: 0,
      parking: 2000,
      note: "Gratis untuk area taman, tiket pertunjukan menyesuaikan event",
    },
    open_hours: {
      open: "08:00",
      close: "21:00",
      days: "Selasa–Minggu (tutup Senin)",
    },
    facilities: [
      "Gedung Pertunjukan",
      "Galeri Seni",
      "Taman Terbuka",
      "Parkir",
      "Toilet",
      "Mushola",
    ],
    tips: "Cek jadwal pertunjukan terlebih dahulu di media sosial Dinas Kebudayaan Banyumas. Datang sore hari untuk menikmati suasana taman yang teduh. Gratis masuk area taman.",
    distance_from_purwokerto: 2,
    photo_url:
      "https://tse1.mm.bing.net/th/id/OIP.CK9YWVpEzX4Xg828Mm1OxgHaE0?rs=1&pid=ImgDetMain&o=7&rm=3",
    tags: ["budaya", "seni", "pertunjukan", "gratis", "edukasi", "sejarah"],
  },
  {
    place_id: "bms_13",
    name: "Curug Ceheng",
    vicinity: "Somagede, Banyumas, Jawa Tengah",
    rating: 4.5,
    user_ratings_total: 1120,
    types: ["nature", "tourist_attraction"],
    geometry: { location: { lat: -7.5038, lng: 109.1553 } },
    photos: [{ photo_reference: null }],
    category: "nature",
    hidden_gem: true,
    description:
      "Air terjun tersembunyi di daerah Somagede dengan aliran air jernih yang jatuh di antara tebing-tebing hijau berlumut. Akses yang masih alami memberikan pengalaman petualangan tersendiri.",
    history:
      "Curug Ceheng baru mulai dikenal wisatawan sekitar tahun 2018. Letaknya yang tersembunyi di kawasan pedesaan Somagede membuat air terjun ini masih sangat alami. Masyarakat setempat meyakini air dari curug ini memiliki khasiat penyembuhan.",
    htm: {
      weekday: 10000,
      weekend: 15000,
      parking: 3000,
      note: "Tiket dikelola warga lokal",
    },
    open_hours: { open: "07:00", close: "16:00", days: "Setiap hari" },
    facilities: ["Area Parkir", "Toilet Sederhana", "Trek Alam"],
    tips: "Tidak ada sinyal di beberapa titik. Download peta offline sebelum berangkat.",
    distance_from_purwokerto: 32,
    photo_url:
      "https://visitcentraljava.com/wp-content/uploads/2021/12/CURUG-CEHENG-2.jpg",
    tags: ["hidden-gem", "air-terjun", "tersembunyi", "alam"],
  },
  {
    place_id: "bms_14",
    name: "Masjid Agung Banyumas",
    vicinity: "Banyumas (Kota Lama), Jawa Tengah",
    rating: 4.6,
    user_ratings_total: 2340,
    types: ["historical", "cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.5129, lng: 109.2937 } },
    photos: [{ photo_reference: null }],
    category: "historical",
    hidden_gem: false,
    description:
      "Masjid bersejarah peninggalan Kadipaten Banyumas yang berdiri sejak abad ke-16. Arsitektur Jawa-Islam yang khas dengan atap tumpang tiga.",
    history:
      "Masjid Agung Banyumas didirikan bersamaan dengan berdirinya Kadipaten Banyumas pada abad ke-16 oleh Adipati Mrapat. Arsitekturnya khas Jawa dengan atap tumpang tiga yang melambangkan Iman, Islam, dan Ihsan. Masjid ini telah mengalami beberapa kali renovasi namun tetap mempertahankan arsitektur aslinya.",
    htm: {
      weekday: 0,
      weekend: 0,
      parking: 2000,
      note: "Gratis, waktu kunjungan di luar sholat",
    },
    open_hours: { open: "05:00", close: "21:00", days: "Setiap hari" },
    facilities: ["Tempat Ibadah", "Area Wudhu", "Parkir", "Pemandu Sejarah"],
    tips: "Hormati waktu sholat. Berpakaian sopan. Tersedia pemandu yang bisa menjelaskan sejarah masjid.",
    distance_from_purwokerto: 18,
    photo_url:
      "https://melihatindonesia.id/wp-content/uploads/2024/05/masjid-agung-nur-sulaeman-1170x780.jpg",
    tags: ["sejarah", "religi", "gratis", "arsitektur", "edukasi"],
  },
  {
    place_id: "bms_16",
    name: "Taman Apung Mas Kemambang",
    vicinity: "Purwokerto, Banyumas, Jawa Tengah",
    rating: 4.2,
    user_ratings_total: 3450,
    types: ["cultural", "tourist_attraction"],
    geometry: { location: { lat: -7.4198, lng: 109.2425 } },
    photos: [{ photo_reference: null }],
    category: "cultural",
    hidden_gem: false,
    description:
      "Taman apung ikonik di tengah kota Purwokerto yang berada di atas Sungai Kranji. Menjadi spot foto favorit warga dengan lampion warna-warni, jembatan kayu, dan gazebo yang menawan — terutama saat malam hari.",
    history:
      'Taman Apung Mas Kemambang dibangun oleh Pemerintah Kabupaten Banyumas sebagai bagian dari revitalisasi Sungai Kranji dan penataan kawasan kota Purwokerto. Nama "Mas Kemambang" berasal dari bahasa Jawa yang berarti "emas yang mengapung", mencerminkan keindahan taman ini yang seolah mengambang di atas air. Sejak diresmikan, taman ini menjadi ikon wisata urban baru Purwokerto yang ramai dikunjungi warga maupun wisatawan dari luar kota.',
    htm: {
      weekday: 5000,
      weekend: 10000,
      parking: 3000,
      note: "Tiket masuk sangat terjangkau, lebih indah dikunjungi malam hari",
    },
    open_hours: { open: "07:00", close: "22:00", days: "Setiap hari" },
    facilities: [
      "Gazebo",
      "Jembatan Kayu",
      "Lampion",
      "Area Foto",
      "Warung Makan",
      "Toilet",
      "Parkir",
    ],
    tips: "Datang sore menjelang malam untuk menikmati lampion yang menyala. Bawa kamera karena spot fotonya sangat instagramable. Hindari hari Minggu sore karena sangat ramai.",
    distance_from_purwokerto: 1,
    photo_url: "https://unimmafm.com/wp-content/uploads/2023/09/888.webp",
    tags: ["taman", "foto", "malam", "keluarga", "instagramable", "sungai"],
  },
];

// ── Kuliner Data ──────────────────────────────────────────────
const KULINER_DATA = [
  {
    id: "k01",
    name: "Soto Sokaraja H. Suradi",
    type: "kuliner",
    cuisine: "Soto Khas",
    vicinity: "Sokaraja, Banyumas",
    lat: -7.4463,
    lng: 109.2981,
    htm: 15000,
    desc: "Soto Sokaraja legendaris dengan kuah kacang khas, cocok untuk sarapan.",
    tags: ["soto", "legendaris", "sarapan"],
    photo_url:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
  },
  {
    id: "k02",
    name: "Mendoan Bu Siti",
    type: "kuliner",
    cuisine: "Gorengan Khas",
    vicinity: "Purwokerto Utara, Banyumas",
    lat: -7.41,
    lng: 109.245,
    htm: 8000,
    desc: "Mendoan tempe paling autentik di Purwokerto, tipis dan gurih.",
    tags: ["mendoan", "murah", "khas"],
    photo_url:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
  },
  {
    id: "k03",
    name: "Gethuk Goreng Sokaraja",
    type: "kuliner",
    cuisine: "Jajanan Khas",
    vicinity: "Sokaraja, Banyumas",
    lat: -7.445,
    lng: 109.297,
    htm: 20000,
    desc: "Oleh-oleh khas Banyumas, gethuk goreng dari singkong dengan gula jawa.",
    tags: ["oleh-oleh", "gethuk", "khas"],
    photo_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  },
  {
    id: "k04",
    name: "Warung Nasi Lengko Pak Agus",
    type: "kuliner",
    cuisine: "Nasi Lengko",
    vicinity: "Purwokerto, Banyumas",
    lat: -7.428,
    lng: 109.246,
    htm: 12000,
    desc: "Nasi lengko khas Banyumas dengan bumbu kacang yang kaya rasa.",
    tags: ["nasi-lengko", "murah", "sarapan"],
    photo_url:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
  },
  {
    id: "k05",
    name: "Sroto Notosuman",
    type: "kuliner",
    cuisine: "Sroto Khas",
    vicinity: "Sokaraja, Banyumas",
    lat: -7.44,
    lng: 109.29,
    htm: 18000,
    desc: "Sroto (soto khas Banyumasan) dengan kuah bening segar dan ketupat.",
    tags: ["sroto", "khas", "ketupat"],
    photo_url:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80",
  },
];

// localStorage "database" for admin
const DB = {
  getPlaces() {
    if (localStorage.getItem("tl_data_v3") !== "1") {
      localStorage.removeItem("wn_places");
      localStorage.setItem("tl_data_v3", "1");
    }
    try {
      const stored = localStorage.getItem("wn_places");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [...MOCK_PLACES];
  },
  savePlaces(places) {
    localStorage.setItem("wn_places", JSON.stringify(places));
  },
  getUsers() {
    try {
      const s = localStorage.getItem("wn_users");
      if (s) return JSON.parse(s);
    } catch (e) {}
    return [
      {
        id: 1,
        name: "Admin",
        email: "admin@traveloop.com",
        role: "admin",
        joined: "2024-01-15",
      },
    ];
  },
  getStats() {
    const places = this.getPlaces();
    return {
      total: places.length,
      hiddenGems: places.filter((p) => p.hidden_gem).length,
      avgRating: (
        places.reduce((s, p) => s + (p.rating || 0), 0) / places.length
      ).toFixed(1),
      categories: places.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
    };
  },
  isLoggedIn() {
    return localStorage.getItem("wn_admin") === "1";
  },
  login(pass) {
    if (pass === "admin123") {
      localStorage.setItem("wn_admin", "1");
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem("wn_admin");
  },
};
