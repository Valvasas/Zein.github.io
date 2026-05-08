/* ============================================================
   JEIV STUDIO — script.js
   ============================================================ */

/* ===================================================
   1. NAVBAR & MOBILE MENU
=================================================== */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn   = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const nav  = document.querySelector('nav');
  const menu = document.getElementById('mobileMenu');
  if (!nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  }
});


/* ===================================================
   2. PROMO BANNER
=================================================== */
function closeBanner() {
  const b = document.getElementById('promoBanner');
  if (b) { b.style.display = 'none'; }
}


/* ===================================================
   3. SCROLL EFFECTS (progress bar + back-to-top)
=================================================== */
window.addEventListener('scroll', function() {
  // Progress bar
  const scrollTop   = window.scrollY;
  const docHeight   = document.body.scrollHeight - window.innerHeight;
  const pct         = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
  document.getElementById('progressBar').style.width = pct + '%';

  // Back to top
  const btt = document.getElementById('backToTop');
  if (scrollTop > 400) btt.classList.add('visible');
  else                  btt.classList.remove('visible');
});


/* ===================================================
   4. SCROLL REVEAL
=================================================== */
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.05, // Lebih sensitif di mobile agar elemen cepat muncul
  rootMargin: '0px 0px -20px 0px' 
});

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});

// Fallback: Jika observer gagal/terlalu lambat, munculkan elemen setelah 2 detik
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 2000);
});


/* ===================================================
   5. FAQ ACCORDION
=================================================== */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(f) { f.classList.remove('open'); });
  if (!isOpen) el.classList.add('open');
}


/* ===================================================
   6. CONTACT FORM SUBMIT
=================================================== */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');

  // Mengambil data dari form
  const nama = document.getElementById('nama').value;
  const hp = document.getElementById('hp').value;
  const layanan = document.getElementById('layanan').value;
  const pesan = document.getElementById('pesan').value;
  const budget = document.getElementById('budget').value;

  btn.textContent = '⏳ Mengirim...';
  btn.disabled = true;

  // Format pesan untuk WhatsApp
  const waNumber = "6285795245741";
  
  // Gunakan template string yang bersih lalu encodeURIComponent agar karakter tidak pecah ()
  const messageBody = 
`*INQUIRY LAYANAN - JEIV STUDIO*

Halo tim Jeiv Studio, saya tertarik untuk menggunakan layanan Anda. Berikut adalah rincian kebutuhan saya:

------------------------------------------------
*DATA PEMESAN*
• Nama: ${nama}
• WhatsApp: ${hp}

*DETAIL LAYANAN*
• Jenis: ${layanan || 'Belum dipilih'}
• Budget: ${budget || 'Diskusi lebih lanjut'}

*KEBUTUHAN KHUSUS*
"${pesan}"
------------------------------------------------

Mohon responnya segera. Terima kasih!`;

  const text = encodeURIComponent(messageBody);

  // Simulasi proses pengiriman lalu buka WhatsApp
  setTimeout(function() {
    // Buka WhatsApp di tab baru
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');

    btn.textContent = '✅ Berhasil!';
    showToast('✅ Mengarahkan ke WhatsApp...');
    
    setTimeout(function() {
      document.getElementById('contactForm').reset();
      btn.innerHTML = '🚀 Kirim Pesan &amp; Dapatkan Penawaran';
      btn.disabled = false;
    }, 2000);
  }, 1000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 4000);
}


/* ===================================================
   7. MODAL HELPERS
=================================================== */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}
// ESC key closes any open modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});


/* ===================================================
   8. SERVICE DETAIL MODAL DATA
=================================================== */
const serviceData = {
  website: {
    icon: '🌐',
    title: 'Website Profil / Bisnis',
    price: 'Mulai Rp 300.000',
    desc: 'Website profesional yang tampil menarik di HP maupun komputer. Cocok untuk toko, kantor, UMKM, yayasan, komunitas, atau profil pribadi. Kami mengurus semua teknis — Anda tinggal cerita kebutuhan saja.',
    features: [
      'Desain eksklusif sesuai keinginan Anda',
      'Tampil rapi di HP, tablet, dan komputer',
      'Halaman tentang, layanan, dan kontak',
      'Tombol WhatsApp langsung ke Anda',
      'Loading cepat dan mudah ditemukan Google',
      'Gratis domain .com (1 tahun) untuk paket premium',
      'Panduan cara menggunakan website',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">www.tokoanda.com</div>
        </div>
        <div class="mockup-body">
          <div class="prev-website-nav">
            <span class="prev-website-logo">🌐 Toko Anda</span>
            <div class="prev-website-links">
              <span>Beranda</span><span>Layanan</span><span>Kontak</span>
            </div>
          </div>
          <div class="prev-website-hero">
            <div class="prev-website-h1">Selamat Datang di Toko Anda!</div>
            <div class="prev-website-sub">Kami melayani dengan sepenuh hati 🙏</div>
            <div class="prev-website-btn">Hubungi Kami</div>
          </div>
          <div class="prev-website-cards">
            <div class="prev-website-card"><div class="prev-website-card-icon">🛍️</div><div class="prev-website-card-text">Produk</div></div>
            <div class="prev-website-card"><div class="prev-website-card-icon">📞</div><div class="prev-website-card-text">Kontak</div></div>
            <div class="prev-website-card"><div class="prev-website-card-icon">⭐</div><div class="prev-website-card-text">Ulasan</div></div>
          </div>
        </div>
      </div>`,
    times: '5–7 hari kerja',
  },

  undangan: {
    icon: '💌',
    title: 'Undangan Digital',
    price: 'Mulai Rp 75.000',
    desc: 'Undangan cantik berbasis web yang bisa dibagikan lewat WhatsApp, Instagram, atau SMS. Tidak perlu cetak — cukup kirim link dan semua sudah ada: nama tamu, lokasi, countdown, sampai musik romantis.',
    features: [
      'Desain cantik pilihan tema (Elegan, Islami, Modern)',
      'Nama tamu otomatis di tiap link undangan',
      'Musik latar romantis pilihan Anda',
      'Countdown hitung mundur hari pernikahan',
      'Peta lokasi (Google Maps)',
      'Form RSVP online (konfirmasi kehadiran)',
      'Galeri foto prewedding',
      'Ucapan & doa dari tamu (guestbook)',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">undangan.link/budi-sari</div>
        </div>
        <div class="mockup-body">
          <div class="prev-undangan">
            <div class="prev-undangan-flower">🌸</div>
            <div class="prev-undangan-title">UNDANGAN PERNIKAHAN</div>
            <div class="prev-undangan-names">Budi & Sari</div>
            <div class="prev-undangan-date">Sabtu, 12 Juli 2025 • Surabaya</div>
            <div class="prev-undangan-countdown">
              <div class="prev-countdown-box"><div>30</div><div style="font-size:0.4rem">Hari</div></div>
              <div class="prev-countdown-box"><div>12</div><div style="font-size:0.4rem">Jam</div></div>
              <div class="prev-countdown-box"><div>45</div><div style="font-size:0.4rem">Menit</div></div>
            </div>
          </div>
        </div>
      </div>`,
    times: '1–3 hari kerja',
  },

  games: {
    icon: '🎮',
    title: 'Games / Mini Game',
    price: 'Mulai Rp 200.000',
    desc: 'Mini game interaktif berbasis web — bisa dimainkan langsung di HP tanpa install apapun. Cocok untuk kencan berdua, acara ulang tahun, game promosi, atau ice-breaker event.',
    features: [
      'Kuis / trivia interaktif',
      'Game puzzle atau teka-teki',
      'Spin the wheel / roda keberuntungan',
      'Game perkenalan pasangan romantis',
      'Papan skor otomatis',
      'Bisa dibagikan via link langsung',
      'Desain sesuai tema acara Anda',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">game.link/kuis-kita</div>
        </div>
        <div class="mockup-body" style="background:#1a1a3e;padding:16px;text-align:center;">
          <div style="font-size:1.5rem;margin-bottom:6px;">🎮</div>
          <div style="color:white;font-size:0.75rem;font-weight:800;margin-bottom:4px;">KUIS SERU KITA</div>
          <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:8px;margin-bottom:8px;">
            <div style="font-size:0.6rem;color:rgba(255,255,255,0.7);">Pertanyaan 3 dari 10</div>
            <div style="font-size:0.65rem;color:white;font-weight:700;margin:4px 0;">Apa warna favoritnya? 🤔</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px;">
              <div style="background:#2B4E8C;border-radius:4px;padding:4px;font-size:0.55rem;color:white;text-align:center;">Biru 🔵</div>
              <div style="background:#E8A020;border-radius:4px;padding:4px;font-size:0.55rem;color:#333;text-align:center;font-weight:700;">Merah ❤️</div>
              <div style="background:#2B4E8C;border-radius:4px;padding:4px;font-size:0.55rem;color:white;text-align:center;">Hijau 💚</div>
              <div style="background:#2B4E8C;border-radius:4px;padding:4px;font-size:0.55rem;color:white;text-align:center;">Ungu 💜</div>
            </div>
          </div>
          <div style="font-size:0.55rem;color:rgba(255,255,255,0.5);">Skor: 20 poin ⭐</div>
        </div>
      </div>`,
    times: '3–7 hari kerja',
  },

  apps: {
    icon: '📱',
    title: 'Aplikasi / Apps',
    price: 'Harga Sesuai Kebutuhan (Nego)',
    desc: 'Aplikasi web atau mobile custom sesuai kebutuhan bisnis Anda. Dari aplikasi absensi karyawan, sistem pemesanan, aplikasi kasir, hingga platform komunitas — kami siap mewujudkannya.',
    features: [
      'Konsultasi gratis analisis kebutuhan',
      'Desain UI/UX yang intuitif & mudah digunakan',
      'Pengembangan frontend dan backend',
      'Database dan sistem login pengguna',
      'Notifikasi WhatsApp / Email otomatis',
      'Panel admin untuk kelola data',
      'Testing menyeluruh sebelum diluncurkan',
      'Maintenance & update rutin',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">app.bisnisanda.com</div>
        </div>
        <div class="mockup-body" style="background:#f5f0e8;">
          <div style="background:#1B3A6B;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:0.65rem;font-weight:800;color:white;">📊 Dashboard Admin</span>
            <span style="font-size:0.6rem;color:rgba(255,255,255,0.7);">Hai, Budi 👋</span>
          </div>
          <div style="padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:5px;">
            <div style="background:white;border-radius:6px;padding:7px;border:1px solid #ddd;">
              <div style="font-size:0.5rem;color:#666;">Pesanan Hari Ini</div>
              <div style="font-size:1rem;font-weight:900;color:#1B3A6B;">24</div>
            </div>
            <div style="background:white;border-radius:6px;padding:7px;border:1px solid #ddd;">
              <div style="font-size:0.5rem;color:#666;">Pendapatan</div>
              <div style="font-size:0.75rem;font-weight:900;color:#1B7B3A;">Rp 1.2jt</div>
            </div>
            <div style="background:white;border-radius:6px;padding:7px;border:1px solid #ddd;">
              <div style="font-size:0.5rem;color:#666;">Pelanggan Baru</div>
              <div style="font-size:1rem;font-weight:900;color:#1B3A6B;">8</div>
            </div>
            <div style="background:white;border-radius:6px;padding:7px;border:1px solid #ddd;">
              <div style="font-size:0.5rem;color:#666;">Stok Habis</div>
              <div style="font-size:1rem;font-weight:900;color:#B33030;">3</div>
            </div>
          </div>
        </div>
      </div>`,
    times: 'Sesuai kompleksitas (2–8 minggu)',
  },

  edukasi: {
    icon: '🎓',
    title: 'Platform Edukasi',
    price: 'Mulai Rp 800.000',
    desc: 'Sistem belajar online untuk lembaga pendidikan, kursus privat, atau komunitas. Siswa bisa akses materi, kerjakan kuis, dan lihat progress belajar mereka kapanpun dan dimanapun.',
    features: [
      'Halaman kelas & materi video/teks',
      'Kuis dan ujian online otomatis',
      'Sertifikat digital setelah lulus',
      'Dashboard progress belajar siswa',
      'Login siswa & guru terpisah',
      'Forum diskusi & tanya jawab',
      'Notifikasi tugas & pengumuman',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">belajar.lembagaanda.com</div>
        </div>
        <div class="mockup-body" style="background:#f5f0e8;padding:0;">
          <div style="background:#1B3A6B;padding:6px 10px;display:flex;gap:8px;align-items:center;">
            <span style="font-size:0.65rem;font-weight:800;color:white;">🎓 Kelas Online</span>
          </div>
          <div style="padding:8px;">
            <div style="font-size:0.6rem;font-weight:700;color:#1B3A6B;margin-bottom:5px;">Kelas Saya 📚</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="background:white;border-radius:5px;padding:6px;border:1px solid #ddd;display:flex;align-items:center;gap:6px;">
                <span style="font-size:0.9rem;">📐</span>
                <div style="flex:1;">
                  <div style="font-size:0.55rem;font-weight:700;color:#333;">Matematika Dasar</div>
                  <div style="background:#e0d8c8;border-radius:3px;height:4px;margin-top:3px;"><div style="background:#1B7B3A;width:70%;height:100%;border-radius:3px;"></div></div>
                </div>
                <span style="font-size:0.5rem;color:#1B7B3A;font-weight:700;">70%</span>
              </div>
              <div style="background:white;border-radius:5px;padding:6px;border:1px solid #ddd;display:flex;align-items:center;gap:6px;">
                <span style="font-size:0.9rem;">🔬</span>
                <div style="flex:1;">
                  <div style="font-size:0.55rem;font-weight:700;color:#333;">IPA Terpadu</div>
                  <div style="background:#e0d8c8;border-radius:3px;height:4px;margin-top:3px;"><div style="background:#E8A020;width:40%;height:100%;border-radius:3px;"></div></div>
                </div>
                <span style="font-size:0.5rem;color:#E8A020;font-weight:700;">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>`,
    times: '7–14 hari kerja',
  },

  ecommerce: {
    icon: '🛒',
    title: 'E-Commerce / Toko Online',
    price: 'Mulai Rp 1.200.000',
    desc: 'Toko online lengkap dengan katalog produk, keranjang belanja, dan sistem pembayaran. Pembeli bisa langsung checkout dan bayar via transfer, QRIS, atau GoPay/OVO.',
    features: [
      'Katalog produk dengan foto & deskripsi',
      'Keranjang belanja & checkout mudah',
      'Pembayaran QRIS, transfer, GoPay, OVO',
      'Notifikasi pesanan otomatis ke WhatsApp',
      'Dashboard admin untuk kelola produk & pesanan',
      'Manajemen stok otomatis',
      'Laporan penjualan harian/bulanan',
      'Support 3 bulan gratis setelah launch',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">toko.bisnisanda.com</div>
        </div>
        <div class="mockup-body">
          <div class="prev-ecom-header">
            <span class="prev-ecom-logo">🛒 Toko Online</span>
            <span class="prev-ecom-cart">🛒<span style="background:#E8A020;color:#333;border-radius:50%;font-size:0.45rem;padding:1px 3px;font-weight:900;margin-left:1px;">3</span></span>
          </div>
          <div class="prev-ecom-products">
            <div class="prev-ecom-product">
              <div class="prev-ecom-img">👗</div>
              <div class="prev-ecom-name">Baju Batik</div>
              <div class="prev-ecom-price">Rp 85rb</div>
            </div>
            <div class="prev-ecom-product">
              <div class="prev-ecom-img">👟</div>
              <div class="prev-ecom-name">Sepatu Sport</div>
              <div class="prev-ecom-price">Rp 250rb</div>
            </div>
            <div class="prev-ecom-product">
              <div class="prev-ecom-img">👜</div>
              <div class="prev-ecom-name">Tas Kulit</div>
              <div class="prev-ecom-price">Rp 120rb</div>
            </div>
          </div>
        </div>
      </div>`,
    times: '14–21 hari kerja',
  },

  landing: {
    icon: '📣',
    title: 'Landing Page',
    price: 'Mulai Rp 150.000',
    desc: 'Satu halaman promosi yang fokus, menarik, dan mendorong orang untuk beli atau hubungi Anda. Cocok untuk jualan produk, promosi event, launching usaha baru, atau kampanye iklan.',
    features: [
      'Desain satu halaman yang eye-catching',
      'Tombol beli/pesan/hubungi yang menonjol',
      'Testimoni & bukti sosial pembeli',
      'Hitung mundur promo terbatas',
      'Formulir order langsung di halaman',
      'Integrasi WhatsApp untuk pemesanan',
      'Responsif di semua ukuran layar',
    ],
    previewHTML: `
      <div class="mockup-browser">
        <div class="mockup-browser-bar">
          <div class="mockup-dot r"></div>
          <div class="mockup-dot y"></div>
          <div class="mockup-dot g"></div>
          <div class="mockup-url">promo.produkanda.com</div>
        </div>
        <div class="mockup-body" style="background:linear-gradient(180deg,#1B3A6B 0%,#f5f0e8 40%);padding:14px;text-align:center;">
          <div style="font-size:0.6rem;color:rgba(255,255,255,0.7);margin-bottom:2px;">🔥 PROMO TERBATAS!</div>
          <div style="font-size:1rem;font-weight:900;color:white;margin-bottom:4px;">Produk Terbaik<br/>Harga Spesial!</div>
          <div style="background:#E8A020;color:#333;font-size:0.6rem;font-weight:900;padding:3px 10px;border-radius:10px;display:inline-block;margin-bottom:8px;">⏰ Sisa 12:30:00</div>
          <div style="background:white;border-radius:8px;padding:8px;font-size:0.6rem;">
            <div style="font-weight:700;color:#1B3A6B;margin-bottom:3px;">✓ Garansi uang kembali</div>
            <div style="font-weight:700;color:#1B3A6B;margin-bottom:5px;">✓ Gratis ongkos kirim</div>
            <div style="background:#25D366;color:white;padding:4px;border-radius:6px;font-weight:800;">💬 Pesan via WhatsApp</div>
          </div>
        </div>
      </div>`,
    times: '2–5 hari kerja',
  },

  konsultan: {
    icon: '🧑‍💼',
    title: 'Konsultan IT',
    price: 'Gratis Konsultasi Awal',
    desc: 'Tidak tahu harus mulai dari mana? Kami siap membantu Anda memahami dunia digital dengan bahasa yang mudah. Tidak ada pertanyaan yang terlalu basic — kami senang membantu!',
    features: [
      'Diskusi kebutuhan digital bisnis Anda',
      'Rekomendasi solusi paling tepat & efisien',
      'Panduan pilih platform yang sesuai budget',
      'Cara promosi online yang efektif',
      'Tips kelola media sosial & website',
      'Pendampingan teknis setelah proyek selesai',
      'Bisa via WhatsApp, telepon, atau tatap muka',
    ],
    previewHTML: `
      <div style="background:var(--navy-pale);border-radius:8px;padding:16px;text-align:center;">
        <div style="font-size:2rem;margin-bottom:8px;">🧑‍💼</div>
        <div style="font-size:0.8rem;font-weight:800;color:var(--navy);margin-bottom:6px;">Konsultasi Gratis!</div>
        <div style="font-size:0.72rem;color:var(--text-light);line-height:1.6;margin-bottom:10px;">
          Ceritakan bisnis Anda dan kami akan<br/>rekomendasikan solusi terbaik.
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;text-align:left;">
          <div style="background:white;border-radius:5px;padding:6px 8px;font-size:0.7rem;color:var(--navy);font-weight:600;">💬 Via WhatsApp: +62 857-9524-5741</div>
          <div style="background:white;border-radius:5px;padding:6px 8px;font-size:0.7rem;color:var(--navy);font-weight:600;">📧 Email: hello@jeivstudio.com</div>
          <div style="background:white;border-radius:5px;padding:6px 8px;font-size:0.7rem;color:var(--navy);font-weight:600;">⏰ Senin–Sabtu, 08.00–21.00 WIB</div>
        </div>
      </div>`,
    times: 'Langsung / sesuai jadwal',
  },
};

function openServiceModal(key) {
  const data = serviceData[key];
  if (!data) return;

  const featuresHTML = data.features.map(function(f) {
    return '<li>' + f + '</li>';
  }).join('');

  document.getElementById('serviceModalBody').innerHTML = `
    <div class="svc-modal-icon">${data.icon}</div>
    <div class="svc-modal-title">${data.title}</div>
    <div class="svc-modal-price">${data.price}</div>
    <div class="svc-modal-desc">${data.desc}</div>
    <div class="svc-modal-features-title">Yang Anda Dapatkan:</div>
    <ul class="svc-modal-features">${featuresHTML}</ul>
    <div class="svc-modal-preview">
      <div class="svc-modal-preview-label">Contoh Tampilan</div>
      <div class="svc-preview-visual">${data.previewHTML}</div>
    </div>
    <div style="font-size:0.8rem;color:var(--text-light);margin-bottom:1rem;">
      ⏱️ Estimasi waktu pengerjaan: <strong>${data.times}</strong>
    </div>
    <div class="svc-modal-actions">
      <a href="#kontak" class="btn-primary" onclick="closeModal('serviceModal')">📩 Pesan Layanan Ini</a>
      <a href="https://wa.me/6285795245741?text=Halo%20Jeiv%20Studio%2C%20saya%20ingin%20konsultasi%20tentang%20${encodeURIComponent(data.title)}" target="_blank" class="btn-outline">💬 Chat WhatsApp</a>
    </div>
  `;

  openModal('serviceModal');
}


/* ===================================================
   9. PRICE CALCULATOR
=================================================== */
const calcState = {
  type:  'undangan',
  level: 'simple',
  extras: new Set(),
};

const basePrices = {
  undangan: { simple: 75000,   medium: 150000,  complex: 250000  },
  website:  { simple: 300000,  medium: 500000,  complex: 800000  },
  landing:  { simple: 150000,  medium: 300000,  complex: 500000  },
  ecommerce:{ simple: 900000,  medium: 1500000, complex: 2500000 },
  apps:     { simple: 1500000, medium: 3000000, complex: 6000000 },
  edukasi:  { simple: 800000,  medium: 1500000, complex: 2800000 },
};

const extraPrices = {
  wa:      50000,
  maps:    75000,
  gallery: 100000,
  payment: 250000,
  admin:   400000,
  seo:     150000,
  rsvp:    100000,
  chat:    200000,
};

// Preview contents for each type × level combination
const calcPreviews = {
  undangan: {
    simple: `
      <div style="padding:12px;background:#f8f0e8;text-align:center;">
        <div style="font-size:1.5rem;margin-bottom:5px;">🌸</div>
        <div style="font-size:0.65rem;color:#8B6914;font-weight:700;letter-spacing:2px;margin-bottom:2px;">UNDANGAN</div>
        <div style="font-size:0.95rem;font-weight:900;color:#5a3800;">Budi & Sari</div>
        <div style="font-size:0.6rem;color:#8B6914;margin-top:3px;">Sabtu, 12 Juli 2025</div>
        <div style="display:flex;gap:5px;justify-content:center;margin-top:8px;">
          <div style="background:#5a3800;color:white;width:26px;border-radius:4px;padding:2px 0;font-size:0.6rem;font-weight:700;text-align:center;"><div>30</div><div style="font-size:0.4rem">Hari</div></div>
          <div style="background:#5a3800;color:white;width:26px;border-radius:4px;padding:2px 0;font-size:0.6rem;font-weight:700;text-align:center;"><div>12</div><div style="font-size:0.4rem">Jam</div></div>
          <div style="background:#5a3800;color:white;width:26px;border-radius:4px;padding:2px 0;font-size:0.6rem;font-weight:700;text-align:center;"><div>45</div><div style="font-size:0.4rem">Mnt</div></div>
        </div>
        <div style="margin-top:8px;font-size:0.55rem;color:#8B6914;">✉️ Template sederhana • 1 halaman</div>
      </div>`,
    medium: `
      <div style="background:linear-gradient(135deg,#2d1b00,#8B4513);padding:12px;text-align:center;">
        <div style="font-size:1.4rem;margin-bottom:4px;">💍</div>
        <div style="font-size:0.55rem;color:rgba(255,220,150,0.8);letter-spacing:3px;margin-bottom:3px;">THE WEDDING OF</div>
        <div style="font-family:'Fraunces',serif;font-size:1.1rem;font-weight:900;color:#FFD700;">Budi & Sari</div>
        <div style="font-size:0.55rem;color:rgba(255,220,150,0.7);margin:4px 0 8px;">Sabtu, 12 Juli 2025 • Ballroom Grand Hotel</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:6px 0;">
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;padding:4px;font-size:0.5rem;color:#FFD700;">🗺️ Peta Lokasi</div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;padding:4px;font-size:0.5rem;color:#FFD700;">✅ RSVP Online</div>
        </div>
        <div style="font-size:0.5rem;color:rgba(255,220,150,0.6);">📸 Galeri foto • Musik latar</div>
      </div>`,
    complex: `
      <div style="background:#0a0a1e;padding:12px;text-align:center;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-10px;right:-10px;font-size:3rem;opacity:0.07;">✨</div>
        <div style="font-size:0.45rem;color:rgba(255,215,0,0.7);letter-spacing:4px;margin-bottom:3px;">✦ LUXURY WEDDING ✦</div>
        <div style="font-size:1.1rem;font-weight:900;color:#FFD700;margin-bottom:2px;">Budi & Sari</div>
        <div style="font-size:0.5rem;color:rgba(255,215,0,0.6);margin-bottom:6px;">12 Juli 2025</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin:5px 0;">
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">🎵 Musik</div>
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">🖼️ Galeri</div>
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">✅ RSVP</div>
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">🗺️ Peta</div>
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">💌 Buku</div>
          <div style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:4px;padding:4px;font-size:0.45rem;color:#FFD700;">🎁 Gift</div>
        </div>
        <div style="font-size:0.45rem;color:rgba(255,215,0,0.5);">✨ Desain mewah • Animasi penuh</div>
      </div>`,
  },
  website: {
    simple: `
      <div>
        <div style="background:#1B3A6B;padding:7px 10px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:0.65rem;font-weight:800;color:white;">🌐 Toko Anda</span>
          <span style="font-size:0.55rem;color:rgba(255,255,255,0.7);">Menu ☰</span>
        </div>
        <div style="background:#f5f0e8;padding:12px;">
          <div style="font-size:0.85rem;font-weight:900;color:#1B3A6B;margin-bottom:4px;">Selamat Datang!</div>
          <div style="font-size:0.6rem;color:#666;margin-bottom:6px;">Kami siap melayani Anda</div>
          <div style="display:inline-block;background:#1B3A6B;color:white;padding:3px 8px;border-radius:10px;font-size:0.55rem;font-weight:700;">Hubungi Kami</div>
        </div>
        <div style="padding:8px;background:white;font-size:0.5rem;color:#888;text-align:center;">© Toko Anda 2025</div>
      </div>`,
    medium: `
      <div>
        <div style="background:#1B3A6B;padding:7px 10px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:0.65rem;font-weight:800;color:white;">🌐 Toko Anda</span>
          <div style="display:flex;gap:6px;">
            <span style="font-size:0.5rem;color:rgba(255,255,255,0.7);">Beranda</span>
            <span style="font-size:0.5rem;color:rgba(255,255,255,0.7);">Layanan</span>
            <span style="font-size:0.5rem;color:rgba(255,255,255,0.7);">Kontak</span>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#f5f0e8,#e8dfc8);padding:12px;">
          <div style="font-size:0.85rem;font-weight:900;color:#1B3A6B;margin-bottom:3px;">Bisnis Profesional Anda</div>
          <div style="font-size:0.58rem;color:#555;margin-bottom:7px;">Solusi terbaik untuk kebutuhan Anda</div>
          <div style="display:inline-block;background:#1B3A6B;color:white;padding:3px 10px;border-radius:10px;font-size:0.55rem;font-weight:700;">Mulai Sekarang →</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;padding:6px;background:#f5f0e8;">
          <div style="background:white;border-radius:4px;padding:5px;text-align:center;border:1px solid #ddd;"><div style="font-size:0.8rem;">🎯</div><div style="font-size:0.45rem;font-weight:700;color:#1B3A6B;margin-top:2px;">Layanan</div></div>
          <div style="background:white;border-radius:4px;padding:5px;text-align:center;border:1px solid #ddd;"><div style="font-size:0.8rem;">💼</div><div style="font-size:0.45rem;font-weight:700;color:#1B3A6B;margin-top:2px;">Tentang</div></div>
          <div style="background:white;border-radius:4px;padding:5px;text-align:center;border:1px solid #ddd;"><div style="font-size:0.8rem;">📞</div><div style="font-size:0.45rem;font-weight:700;color:#1B3A6B;margin-top:2px;">Kontak</div></div>
        </div>
      </div>`,
    complex: `
      <div>
        <div style="background:#0a1628;padding:7px 10px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:0.65rem;font-weight:900;color:#E8A020;">⚡ YourBrand</span>
          <div style="display:flex;gap:5px;align-items:center;">
            <span style="font-size:0.45rem;color:rgba(255,255,255,0.6);">Beranda</span>
            <span style="font-size:0.45rem;color:rgba(255,255,255,0.6);">Layanan</span>
            <span style="font-size:0.45rem;color:rgba(255,255,255,0.6);">Blog</span>
            <span style="background:#E8A020;color:#333;font-size:0.45rem;padding:1px 5px;border-radius:6px;font-weight:800;">Kontak</span>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#0a1628,#1B3A6B);padding:12px;">
          <div style="font-size:0.5rem;color:#E8A020;font-weight:700;margin-bottom:3px;">🚀 SOLUSI DIGITAL TERBAIK</div>
          <div style="font-size:0.9rem;font-weight:900;color:white;margin-bottom:5px;">Grow Your Business Online</div>
          <div style="display:flex;gap:5px;">
            <div style="background:#E8A020;color:#333;padding:3px 7px;border-radius:8px;font-size:0.5rem;font-weight:800;">Mulai Gratis</div>
            <div style="border:1px solid rgba(255,255,255,0.3);color:white;padding:3px 7px;border-radius:8px;font-size:0.5rem;">Pelajari Lebih</div>
          </div>
        </div>
        <div style="background:#f5f0e8;padding:5px 6px;display:flex;gap:3px;">
          <div style="flex:1;background:white;border-radius:3px;padding:4px;font-size:0.42rem;color:#1B3A6B;font-weight:700;text-align:center;">⭐ 4.9/5 Rating</div>
          <div style="flex:1;background:white;border-radius:3px;padding:4px;font-size:0.42rem;color:#1B3A6B;font-weight:700;text-align:center;">📊 Analytics</div>
          <div style="flex:1;background:white;border-radius:3px;padding:4px;font-size:0.42rem;color:#1B3A6B;font-weight:700;text-align:center;">💬 Live Chat</div>
        </div>
      </div>`,
  },
  ecommerce: {
    simple: `
      <div>
        <div style="background:#1B3A6B;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.65rem;font-weight:800;color:white;">🛒 Toko Online</span>
          <span style="font-size:0.7rem;">🛒</span>
        </div>
        <div style="padding:6px;background:#f5f0e8;display:grid;grid-template-columns:1fr 1fr;gap:4px;">
          <div style="background:white;border-radius:4px;padding:5px;border:1px solid #ddd;"><div style="height:20px;background:#eee;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;margin-bottom:3px;">👗</div><div style="font-size:0.48rem;font-weight:700;">Baju Batik</div><div style="font-size:0.48rem;color:#1B3A6B;font-weight:800;">Rp 85rb</div></div>
          <div style="background:white;border-radius:4px;padding:5px;border:1px solid #ddd;"><div style="height:20px;background:#eee;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;margin-bottom:3px;">👟</div><div style="font-size:0.48rem;font-weight:700;">Sepatu Sport</div><div style="font-size:0.48rem;color:#1B3A6B;font-weight:800;">Rp 250rb</div></div>
        </div>
        <div style="padding:4px 6px;background:white;text-align:center;"><div style="background:#25D366;color:white;padding:3px;border-radius:4px;font-size:0.5rem;font-weight:700;">💬 Pesan via WA</div></div>
      </div>`,
    medium: `
      <div>
        <div style="background:#1B3A6B;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.65rem;font-weight:800;color:white;">🛒 Toko Online</span>
          <div style="display:flex;gap:5px;align-items:center;"><span style="font-size:0.45rem;color:rgba(255,255,255,0.7);">Kategori</span><span style="font-size:0.45rem;color:rgba(255,255,255,0.7);">Promo</span><span style="font-size:0.7rem;">🛒<span style="background:#E8A020;color:#333;border-radius:50%;font-size:0.4rem;padding:0 2px;font-weight:900;">2</span></span></div>
        </div>
        <div style="background:#f0ebe0;padding:5px 6px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;">
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;"><div style="height:18px;background:linear-gradient(135deg,#f0e0d0,#e8d0c0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;margin-bottom:2px;">👗</div><div style="font-size:0.45rem;font-weight:700;">Batik</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:800;">85rb</div><div style="background:#1B3A6B;color:white;font-size:0.4rem;text-align:center;border-radius:3px;margin-top:2px;padding:1px;">+ Keranjang</div></div>
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;"><div style="height:18px;background:linear-gradient(135deg,#d0e0f0,#c0d0e0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;margin-bottom:2px;">👟</div><div style="font-size:0.45rem;font-weight:700;">Sepatu</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:800;">250rb</div><div style="background:#1B3A6B;color:white;font-size:0.4rem;text-align:center;border-radius:3px;margin-top:2px;padding:1px;">+ Keranjang</div></div>
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;"><div style="height:18px;background:linear-gradient(135deg,#f0d0e0,#e0c0d0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;margin-bottom:2px;">👜</div><div style="font-size:0.45rem;font-weight:700;">Tas</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:800;">120rb</div><div style="background:#1B3A6B;color:white;font-size:0.4rem;text-align:center;border-radius:3px;margin-top:2px;padding:1px;">+ Keranjang</div></div>
        </div>
        <div style="padding:4px 6px;background:white;display:flex;gap:3px;"><div style="flex:1;background:#f5f0e8;padding:3px;border-radius:3px;font-size:0.45rem;color:#666;text-align:center;">QRIS ✓</div><div style="flex:1;background:#f5f0e8;padding:3px;border-radius:3px;font-size:0.45rem;color:#666;text-align:center;">GoPay ✓</div><div style="flex:1;background:#f5f0e8;padding:3px;border-radius:3px;font-size:0.45rem;color:#666;text-align:center;">OVO ✓</div></div>
      </div>`,
    complex: `
      <div>
        <div style="background:#0a0a1e;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.65rem;font-weight:900;color:#E8A020;">⚡ MEGA STORE</span>
          <div style="display:flex;gap:4px;align-items:center;"><span style="font-size:0.45rem;color:rgba(255,255,255,0.6);">Flash Sale 🔥</span><span style="font-size:0.7rem;">🔔</span><span style="font-size:0.7rem;">👤</span><span style="font-size:0.7rem;">🛒<span style="background:#E8A020;color:#333;border-radius:50%;font-size:0.4rem;padding:0 2px;font-weight:900;">5</span></span></div>
        </div>
        <div style="background:#E8A020;padding:3px 8px;text-align:center;"><span style="font-size:0.5rem;font-weight:800;color:#333;">⚡ FLASH SALE! Diskon 50% • Berakhir: 02:30:00</span></div>
        <div style="padding:5px 6px;background:#f0ebe0;display:grid;grid-template-columns:repeat(3,1fr);gap:3px;">
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;position:relative;"><span style="position:absolute;top:2px;right:2px;background:#ff4444;color:white;font-size:0.35rem;padding:1px 3px;border-radius:3px;font-weight:700;">-50%</span><div style="height:16px;background:linear-gradient(135deg,#f0e0d0,#e8d0c0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;margin-bottom:2px;">👗</div><div style="font-size:0.42rem;font-weight:700;">Batik Premium</div><div style="font-size:0.42rem;color:#999;text-decoration:line-through;">170rb</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:900;">85rb</div><div style="background:#1B3A6B;color:white;font-size:0.38rem;text-align:center;border-radius:3px;margin-top:2px;padding:1px;">Beli Sekarang</div></div>
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;"><div style="height:16px;background:linear-gradient(135deg,#d0e0f0,#c0d0e0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;margin-bottom:2px;">👟</div><div style="font-size:0.42rem;font-weight:700;">Sepatu Nike</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:900;">250rb</div><div style="display:flex;gap:1px;margin-top:2px;"><div style="background:#1B3A6B;color:white;font-size:0.35rem;flex:1;text-align:center;border-radius:2px;padding:1px;">Beli</div><div style="border:1px solid #1B3A6B;color:#1B3A6B;font-size:0.35rem;flex:0.5;text-align:center;border-radius:2px;padding:1px;">♥</div></div></div>
          <div style="background:white;border-radius:4px;padding:4px;border:1px solid #ddd;"><div style="height:16px;background:linear-gradient(135deg,#f0d0e0,#e0c0d0);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;margin-bottom:2px;">👜</div><div style="font-size:0.42rem;font-weight:700;">Tas Hermes</div><div style="font-size:0.45rem;color:#1B3A6B;font-weight:900;">120rb</div><div style="background:#E8A020;color:#333;font-size:0.38rem;text-align:center;border-radius:3px;margin-top:2px;padding:1px;font-weight:800;">⭐ Terlaris</div></div>
        </div>
        <div style="padding:3px 6px;background:white;display:flex;gap:2px;"><div style="flex:1;background:#f5f0e8;padding:2px;border-radius:2px;font-size:0.4rem;color:#1B7B3A;text-align:center;font-weight:700;">QRIS ✓</div><div style="flex:1;background:#f5f0e8;padding:2px;border-radius:2px;font-size:0.4rem;color:#1B7B3A;text-align:center;font-weight:700;">GoPay ✓</div><div style="flex:1;background:#f5f0e8;padding:2px;border-radius:2px;font-size:0.4rem;color:#1B7B3A;text-align:center;font-weight:700;">OVO ✓</div><div style="flex:1;background:#f5f0e8;padding:2px;border-radius:2px;font-size:0.4rem;color:#1B7B3A;text-align:center;font-weight:700;">Transfer ✓</div></div>
      </div>`,
  },
};

// Fallback generic preview
function getGenericPreview(type, level) {
  const icons = { landing:'📣', apps:'📱', edukasi:'🎓' };
  const icon = icons[type] || '🌐';
  const labels = { simple:'Sederhana', medium:'Menengah', complex:'Lengkap' };
  const colors = { simple:'#2B4E8C', medium:'#1B3A6B', complex:'#0a1628' };
  return `
    <div style="background:${colors[level]};padding:20px;text-align:center;min-height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
      <div style="font-size:2rem;">${icon}</div>
      <div style="font-size:0.75rem;font-weight:800;color:white;">Versi ${labels[level]}</div>
      <div style="font-size:0.6rem;color:rgba(255,255,255,0.6);">Preview akan disesuaikan dengan kebutuhan Anda</div>
    </div>`;
}

function renderCalcPreview() {
  const screen = document.getElementById('calcPreviewScreen');
  if (!screen) return;
  const type  = calcState.type;
  const level = calcState.level;
  const html  = (calcPreviews[type] && calcPreviews[type][level])
                  ? calcPreviews[type][level]
                  : getGenericPreview(type, level);
  
  // Beri feedback visual bahwa data berubah (penting di mobile)
  screen.classList.add('updating');
  setTimeout(function() {
    screen.innerHTML = html;
    screen.classList.remove('updating');
    
    // Di mobile, scroll otomatis ke preview agar user tahu ada perubahan
    if (window.innerWidth < 992) {
      screen.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function calcSelect(btn) {
  const key = btn.dataset.key;
  const val = btn.dataset.val;
  calcState[key] = val;
  btn.closest('.calc-options-grid')
     .querySelectorAll('.calc-opt-big')
     .forEach(function(b) { b.classList.remove('selected'); });
  btn.classList.add('selected');
  renderCalcPreview();
  updateCalcPrice();
}

function calcSelectStyle(btn) {
  calcState.level = btn.dataset.val;
  btn.closest('.calc-style-options')
     .querySelectorAll('.calc-style-btn')
     .forEach(function(b) { b.classList.remove('selected'); });
  btn.classList.add('selected');
  renderCalcPreview();
  updateCalcPrice();
}

function updateCalc() {
  // Called by checkbox change
  updateCalcPrice();
}

function updateCalcPrice() {
  // Collect extras from checkboxes
  calcState.extras.clear();
  document.querySelectorAll('.calc-extra-item input:checked').forEach(function(cb) {
    calcState.extras.add(cb.dataset.extra);
  });

  var base = (basePrices[calcState.type] || basePrices.undangan)[calcState.level];
  var extra = 0;
  calcState.extras.forEach(function(e) { extra += (extraPrices[e] || 0); });
  var total = base + extra;
  total = Math.round(total / 1000) * 1000;

  var fmt;
  if (total >= 1000000) {
    var juta = total / 1000000;
    fmt = 'Rp ' + (Number.isInteger(juta) ? juta : juta.toFixed(1)) + ' Juta';
  } else {
    fmt = 'Rp ' + total.toLocaleString('id-ID');
  }

  var el = document.getElementById('calcPrice');
  if (el) {
    el.textContent = fmt;
    el.classList.remove('price-pop');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('price-pop');
  }
}

// Init calculator preview on load
document.addEventListener('DOMContentLoaded', function() {
  renderCalcPreview();
  updateCalcPrice();
});