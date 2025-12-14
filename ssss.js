// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('mobile-menu-open');
    });
  }
  
  // Information Section Circles
  const outerCircles = document.querySelectorAll('.outer-circle');
  const centerCircle = document.getElementById('centerCircle');
  
  outerCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const isActive = circle.classList.contains('active');
      outerCircles.forEach(c => c.classList.remove('active'));
      centerCircle.classList.remove('active');
      if (!isActive) {
        circle.classList.add('active');
      }
    });
  });
  
  if (centerCircle) {
    centerCircle.addEventListener('click', () => {
      const isActive = centerCircle.classList.contains('active');
      outerCircles.forEach(c => c.classList.remove('active'));
      centerCircle.classList.remove('active');
      if (!isActive) {
        centerCircle.classList.add('active');
      }
    });
  }
  
  // Benefits Section Tabs
  const benefitButtons = document.querySelectorAll('.benefit-btn');
  const benefitItems = document.querySelectorAll('.benefit-item');
  
  function showBenefit(benefitType) {
    // Hide all benefit items
    benefitItems.forEach(item => {
      item.classList.remove('active-benefit');
      item.style.display = 'none';
    });
    
    // Show selected benefit
    const selectedBenefit = document.getElementById(`${benefitType}-benefit`);
    if (selectedBenefit) {
      selectedBenefit.classList.add('active-benefit');
      
      if (window.innerWidth > 768) {
        selectedBenefit.style.display = 'flex';
      } else {
        selectedBenefit.style.display = 'block';
      }
    }
    
    // Update button active state
    benefitButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-benefit') === benefitType) {
        btn.classList.add('active');
      }
    });
  }
  
  // Add event listeners to benefit buttons
  benefitButtons.forEach(button => {
    button.addEventListener('click', function() {
      const benefitType = this.getAttribute('data-benefit');
      showBenefit(benefitType);
    });
  });
  
  // Show first benefit by default
  if (benefitButtons.length > 0) {
    showBenefit('natural');
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
      };
      
      // Here you would normally send the data to a server
      // For now, just show an alert
      alert('Thank you for your message, ' + formData.name + '! We will contact you soon at ' + formData.email + '.');
      
      // Reset form
      contactForm.reset();
      
      // Log to console for debugging
      console.log('Form submitted:', formData);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('mobile-menu-open')) {
          navMenu.classList.remove('mobile-menu-open');
        }
      }
    });
  });
  
  // Add active class to nav links based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 100)) {
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
});