// Modern Landing Page JavaScript - Lightweight and Performance Optimized

(function() {
  'use strict';

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  });

  // Navbar Scroll Effect
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for Fade-In Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const animateElements = document.querySelectorAll('.product-card, .value-card, .section-header-center');

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Simple Visual Grid Animation
  const visualGrid = document.querySelector('.visual-grid');

  if (visualGrid) {
    let hue = 210;

    setInterval(function() {
      hue = (hue + 0.5) % 360;
      const gradient = visualGrid.querySelector('::before');
      // CSS animation handles the floating effect
    }, 50);
  }

  // Form Validation (if you add a form later)
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]');

      if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        return false;
      }

      // Add your form submission logic here
      console.log('Form submitted');
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';

    // Remove existing error if any
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#EF4444';

    // Reset error after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
      input.style.borderColor = '';
    }, 3000);
  }

  // Add active state to nav links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Console Easter Egg
  console.log('%c👋 Welcome to PraFounds!', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
  console.log('%cBuilding future-ready products for real life.', 'color: #6B7280; font-size: 14px;');
  console.log('%cInterested in joining us? Check out: https://www.prafounds.com', 'color: #10B981; font-size: 14px;');

})();
