// ==========================================
// 1. NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ==========================================
// 2. MOBILE MENU NAVIGATION
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  // Toggle menu open/close status
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu upon item selections, unless clicking a parent item with a dropdown
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const parentLi = link.closest('.has-dropdown');
      // On mobile screens, let users tap structural parents without closing the panel
      if (parentLi && window.innerWidth <= 768 && link.nextElementSibling?.classList.contains('dropdown')) {
        return;
      }
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ==========================================
// 3. INTERSECTION OBSERVER: SCROLL REVEAL
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==========================================
// 4. INTERSECTION OBSERVER: COUNTER ANIMATION
// ==========================================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      let current = 0;
      const increment = target / 60; // Smooth 60 frames distribution
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 16); // Run roughly at 60fps (~16.6ms)
      
      counterObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ==========================================
// 5. PORTFOLIO MIX-AND-MATCH MASONRY FILTER
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active styling flag from other layout buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ==========================================
// 6. CONTACT FORM PROCESSING & ANIMATION
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    
    if (btn) {
      const originalText = btn.textContent;
      // Trigger user experience success state visual cues
      btn.textContent = 'Message Sent!';
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3000);
    }
  });
}
