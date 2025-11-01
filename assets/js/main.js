// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS (only if available)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('mainNav');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Back to top button (only on pages that have it)
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty hash
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 70;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submissions
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = 'Sending...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.classList.add('btn-success');
        button.classList.remove('btn-primary');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.classList.remove('btn-success');
          button.classList.add('btn-primary');
          this.reset();
        }, 3000);
      }, 1500);
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.bg-primary form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const input = this.querySelector('input[type="email"]');
      const originalText = button.textContent;
      
      button.textContent = 'Subscribing...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.classList.add('btn-success');
        button.classList.remove('btn-light');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.classList.remove('btn-success');
          button.classList.add('btn-light');
          input.value = '';
        }, 3000);
      }, 1500);
    });
  }

  // Add year to copyright
  const yearElements = document.querySelectorAll('#year');
  if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  // Animate numbers in pricing (optional enhancement)
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .process-step, .use-case-card, .tool-card').forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = heroSection.querySelector('.container');
      
      if (heroContent && scrolled < heroSection.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Video modal handling
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('hidden.bs.modal', function() {
      const iframe = this.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        iframe.src = src;
      }
    });
  }

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navToggle = document.querySelector('.navbar-toggler');

  if (navLinks.length > 0 && navbarCollapse && navToggle) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          navbarCollapse.classList.remove('show');
          navToggle.classList.add('collapsed');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Console message
  console.log('%c Welcome to NexAI! 🚀 ', 'background: #6366f1; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
  console.log('%c Built with ❤️ using Bootstrap 5 & Modern Web Technologies ', 'background: #764ba2; color: white; padding: 5px;');

});

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Theme toggle (optional - can be added later)
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }
});

// Add typing effect to hero (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Add click ripple effect
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' || e.target.closest('.btn')) {
    const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('.btn');
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 600ms ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
