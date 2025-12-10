window.addEventListener('load', () => {
// ========================================================
  // PERBAIKAN: LOGIKA AUDIO & IKON BARU
  // ========================================================
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-control');
  
  // Update Selector ID sesuai HTML baru
  const iconSoundOff = document.getElementById('icon-sound-off'); // Ikon Coret
  const iconSoundOn = document.getElementById('icon-sound-on');   // Ikon Nada

  if (audio && musicBtn) {
    audio.volume = 0.35;

    // --- 1. FUNGSI UPDATE IKON OTOMATIS ---
    
    // Saat Musik Mulai (Play) -> Tampilkan Ikon Nada (Sound On)
    audio.addEventListener('play', () => {
      iconSoundOff.style.display = 'none';
      iconSoundOn.style.display = 'block';
    });

    // Saat Musik Berhenti (Pause) -> Tampilkan Ikon Coret (Sound Off)
    audio.addEventListener('pause', () => {
      iconSoundOff.style.display = 'block';
      iconSoundOn.style.display = 'none';
    });

    // --- 2. LOGIKA TOMBOL KLIK ---
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      
      if (audio.paused) {
        audio.play(); 
      } else {
        audio.pause(); 
      }
    });

    // --- 3. AUTOPLAY STRATEGY ---
    const startMusic = () => {
      // Coba play langsung
      audio.play().catch(() => {
        // Jika gagal (diblokir browser), tunggu interaksi pertama user
        document.body.addEventListener('click', () => {
            audio.play();
        }, { once: true });
      });
    };
    startMusic();
  }

  // ========================================================
  // 1. INISIALISASI DASAR DAN FUNGSI UTAMA
  // ========================================================

  // Smooth scroll untuk navigasi menu
  document.querySelectorAll('.menu').forEach(menu => {
    menu.addEventListener('click', e => {
      e.preventDefault();
      const targetId = menu.id.replace(/^menu_/, '');
      const targetEl = document.querySelector('#' + CSS.escape(targetId));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Inisialisasi AOS (Animasi saat scroll)
  AOS.init();

  // Inisialisasi Flickity Carousel Utama di halaman portofolio
  const mainCarousel = document.querySelector('.js-flickity');
  if (mainCarousel) {
    new Flickity(mainCarousel, {
      wrapAround: true,
      imagesLoaded: true,
      cellAlign: 'center',
      pageDots: true,
      prevNextButtons: true,
      autoPlay: 3000,
      pauseAutoPlayOnHover: true,
      selectedAttraction: 0.02,
      friction: 0.6
    });
  }

  // ========================================================
  // 2. LOGIKA UNTUK MENGARAHKAN KE HALAMAN STATIS
  // ========================================================
  const mainGalleryCells = document.querySelectorAll('.gallery .gallery-cell');

  mainGalleryCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const category = cell.dataset.category;

      if (category) {
        // Mengubah "Visual Effects" menjadi "visual-effects.html"
        const fileName = category.toLowerCase().replace(/\s+/g, '-') + '.html';
        
        // Mengarahkan pengguna ke file HTML yang sesuai
        window.location.href = fileName;
      }
    });
  });

});



