// Progress bar functionality
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
  };
  
  // Animate elements when they enter viewport
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .project-card, .skill-item, .timeline-item, .activity-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  
  // Animated typing effect for hero section
  const typeEffect = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          element.classList.add('typed');
        }, 500);
      }
    }, speed);
  };
  
  // Parallax effect for hero section
  const parallax = () => {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      if (heroSection.offsetTop - window.innerHeight <= scrollPosition && 
          scrollPosition <= heroSection.offsetTop + heroSection.offsetHeight) {
        const parallaxItems = document.querySelectorAll('.hero h1, .hero .tagline, .hero .description');
        parallaxItems.forEach((item, index) => {
          const speed = 0.2 * (index + 1);
          item.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
      }
    });
  };
  
  // Animated skill bars
  const animateSkills = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
      });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
      observer.observe(item);
    });
  };
  
  // Smooth scrolling for anchor links
  const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Animated navigation highlight
  const navHighlight = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
  };
  
  // Animated header on scroll
  const stickyHeader = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  };
  
  // Particle background effect for hero section
  const particleBackground = () => {
    const heroSection = document.querySelector('.hero');
    const particles = document.createElement('div');
    particles.className = 'particles';
    heroSection.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particles.appendChild(particle);
    }
  };
  
  // Contact form animation
  const contactFormAnimation = () => {
    const formElements = document.querySelectorAll('.form-group');
    
    formElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`;
      element.classList.add('form-animate');
    });
    
    // Form validation visual feedback
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          input.parentElement.classList.remove('focused');
        }
      });
    });
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('submitted');
      
      // Simulate form submission
      setTimeout(() => {
        form.reset();
        form.classList.remove('submitted');
        document.querySelectorAll('.form-group.focused').forEach(el => {
          el.classList.remove('focused');
        });
        
        // Success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Message sent successfully!';
        form.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }, 1500);
    });
  };
  
  // Tilt effect for project cards
  const projectCardTilt = () => {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const tiltX = (y - centerY) / 20;
        const tiltY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  };
  
  // Mouse trail effect
  const mouseTrailEffect = () => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateTrail = () => {
      const speed = 0.1;
      
      trailX += (mouseX - trailX) * speed;
      trailY += (mouseY - trailY) * speed;
      
      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;
      
      requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
  };
  
  // Theme toggler functionality (commented out in your HTML but included here)
  const themeToggler = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
          icon.className = 'fas fa-sun';
          localStorage.setItem('theme', 'dark');
        } else {
          icon.className = 'fas fa-moon';
          localStorage.setItem('theme', 'light');
        }
      });
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.className = 'fas fa-sun';
      }
    }
  };
  
  // Initialize all functions when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      /* Animation base styles */
      .animate-in {
        animation: fadeInUp 3s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .skill-item, .project-card, .activity-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .skill-item:hover, .project-card:hover, .activity-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }
      
      /* Progress bar */
      #progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #3498db, #1abc9c);
        z-index: 1000;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      /* Sticky header */
      header.sticky {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        padding: 10px 0;
        transition: all 0.3s ease;
      }
      
      /* Nav highlight */
      nav ul li a.active {
        color: #3498db;
        font-weight: bold;
        position: relative;
      }
      
      nav ul li a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #3498db;
        animation: navIndicator 0.3s ease forwards;
      }
      
      @keyframes navIndicator {
        from { width: 0; }
        to { width: 100%; }
      }
      
      /* Form animations */
      .form-animate {
        opacity: 0;
        transform: translateY(20px);
        animation: formItemFadeIn 0.5s ease forwards;
      }
      
      @keyframes formItemFadeIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .form-group.focused input,
      .form-group.focused textarea {
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      }
      
      .success-message {
        background: #2ecc71;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-top: 15px;
        text-align: center;
        animation: fadeIn 0.5s ease;
      }
      
      /* Particles */
      .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
      }
      
      .particle {
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(52, 152, 219, 0.5);
        border-radius: 50%;
        animation: float 10s infinite linear;
      }
      
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) translateX(100px) scale(0);
          opacity: 0;
        }
      }
      
      /* Mouse trail */
      .mouse-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(52, 152, 219, 0.5) 0%, rgba(52, 152, 219, 0) 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      }
    `;
    
    document.head.appendChild(style);
    
    // Run all animations and effects
    stickyHeader();
    smoothScroll();
    animateOnScroll();
    navHighlight();
    animateSkills();
    projectCardTilt();
    contactFormAnimation();
    particleBackground();
    mouseTrailEffect();
    
    // Run typing effect on hero content
    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
      typeEffect(tagline, "Computer Science Student & AI Enthusiast", 80);
    }
    
    // Enable theme toggler if the button exists
    themeToggler();
  });
  