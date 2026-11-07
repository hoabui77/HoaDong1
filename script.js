// Hoà Đồng Cuộc Sống Tươi Đẹp - Interactive Experience

document.addEventListener('DOMContentLoaded', () => {
  initPetalsCanvas();
  initScrollReveal();
  initNavbarBehavior();
  initThemeToggle();
  initInspirationQuotes();
  initLightbox();
  initCopyButtons();
  initContactForm();
});

// 1. Floating Blossom Petals & Warm Light Particles Canvas
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 26 }, () => createParticle(width, height));

  function createParticle(w, h) {
    const colors = [
      'rgba(216, 49, 91, 0.22)',
      'rgba(242, 132, 130, 0.28)',
      'rgba(246, 189, 96, 0.25)',
      'rgba(255, 182, 193, 0.3)'
    ];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 7 + 4,
      speedY: Math.random() * 0.55 + 0.25,
      speedX: (Math.random() - 0.5) * 0.45,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.angle) * 0.25;
      p.angle += p.spin;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      // Draw soft petal oval
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// 2. Scroll Reveal Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// 3. Navbar Scroll Highlight
function initNavbarBehavior() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 4. Theme Toggle (Warm Daylight / Cozy Evening)
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('hoadong-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.innerHTML = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('hoadong-theme', 'light');
      toggleBtn.innerHTML = '🌙';
      showToast('Đã chuyển sang giao diện Nắng Sớm Tươi Đẹp ☀️');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('hoadong-theme', 'dark');
      toggleBtn.innerHTML = '☀️';
      showToast('Đã chuyển sang giao diện Đêm Ấm Áp 🌙');
    }
  });
}

// 5. Daily Positive Inspiration Generator
function initInspirationQuotes() {
  const quotes = [
    {
      text: '“Sự hoà đồng là chiếc chìa khoá vàng mở ra cánh cửa của muôn vàn niềm vui và tình thân ái trong cuộc sống.”',
      author: 'Thông Điệp Yêu Thương'
    },
    {
      text: '“Mỗi ngày thức dậy với nụ cười chân thành là một ngày ta tô điểm thêm sắc hoa rực rỡ cho cuộc đời.”',
      author: 'Hoà Đồng Cuộc Sống Tươi Đẹp'
    },
    {
      text: '“Hạnh phúc không ở đâu xa, hạnh phúc hiện diện trong từng khoảnh khắc sẻ chia bên những người đồng nghiệp và bạn bè thân thương.”',
      author: 'Góc Sống Đẹp'
    },
    {
      text: '“Hãy sống như những đoá hoa hướng dương: luôn vươn mình về phía mặt trời và lan toả hơi ấm dịu dàng đến mọi người xung quanh.”',
      author: 'Cảm Hứng Mỗi Ngày'
    },
    {
      text: '“Khi tâm hồn rộng mở và chan hoà, mọi chặng đường ta đi qua đều nở hoa tươi thắm.”',
      author: 'Bùi Thị Hoà • Kết Nối Tâm Hồn'
    }
  ];

  let currentIndex = 0;
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const nextQuoteBtn = document.getElementById('next-quote-btn');

  if (!quoteText || !nextQuoteBtn) return;

  nextQuoteBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % quotes.length;
    quoteText.style.opacity = '0';
    setTimeout(() => {
      quoteText.textContent = quotes[currentIndex].text;
      quoteAuthor.textContent = quotes[currentIndex].author;
      quoteText.style.opacity = '1';
    }, 260);
  });
}

// 6. Lightbox Image Viewer
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  const triggers = document.querySelectorAll('[data-lightbox-src]');
  triggers.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const caption = item.getAttribute('data-lightbox-caption') || '';
      lightboxImg.src = src;
      lightboxCap.textContent = caption;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// 7. Copy Contact Info to Clipboard
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'thông tin';
      try {
        await navigator.clipboard.writeText(value);
        const originalText = btn.textContent;
        btn.textContent = 'Đã sao chép ✓';
        showToast(`Đã sao chép ${label}: ${value}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch {
        showToast(`Thông tin: ${value}`);
      }
    });
  });
}

// 8. Interactive Contact Form (Opens pre-filled Mailto or Quick Call)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const phone = document.getElementById('sender-phone').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    const subject = encodeURIComponent(
      `[Hoà Đồng Cuộc Sống Tươi Đẹp] Lời nhắn kết nối từ ${name}`
    );
    const body = encodeURIComponent(
      `Xin chào cô Bùi Thị Hoà,\n\nHọ và tên người gửi: ${name}\nSố điện thoại liên hệ: ${phone}\n\nNội dung chia sẻ:\n${message}\n\nTrân trọng!`
    );

    showToast('Đang mở ứng dụng Email để gửi lời nhắn tới buithihoathcshl@gmail.com 💌');
    setTimeout(() => {
      window.location.href = `mailto:buithihoathcshl@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  });
}

// Helper: Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
