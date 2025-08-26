// Simple script to initialize any JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Real Estate Landing Page loaded successfully! 🏡');
  
  // Add smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section, .card, .feature-item');
  sections.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });
});

// WhatsApp helper function
function openWhatsApp(phone, message) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Email helper function
function sendEmail(email, subject, body) {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}
