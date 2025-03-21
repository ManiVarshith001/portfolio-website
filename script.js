// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(6, 6, 19, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(12, 12, 29, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            }
        });
    });

    // Portfolio Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            const targetContent = document.getElementById(`${this.dataset.target}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // CTA Button and Book a Call functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Focus on the name input field
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 800);
            }
        });
    }

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission logic
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            // Here you would typically send the data to a server
            // For example, using fetch API:
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                showSuccessMessage();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            });
            */
            
            // For now, just show success message and reset form
            showSuccessMessage();
            contactForm.reset();
        });
    }
    
    // Success message function
    function showSuccessMessage() {
        alert('Thank you for your message! I will get back to you soon.');
        
        // Alternative: show a custom success message on the page
        /*
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        */
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Project Modal/Lightbox (if needed)
    const projectItems = document.querySelectorAll('.project-item');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (projectItems.length && modalOverlay && modalContent && closeModalBtn) {
        projectItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get project details
                const projectTitle = this.querySelector('h3').textContent;
                const projectDesc = this.querySelector('p').textContent;
                const projectImg = this.querySelector('img').src;
                
                // Populate modal
                modalContent.innerHTML = `
                    <h2>${projectTitle}</h2>
                    <img src="${projectImg}" alt="${projectTitle}">
                    <p>${projectDesc}</p>
                    <div class="project-details">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                        In hac habitasse platea dictumst. More project details here...</p>
                    </div>
                    <a href="#" class="btn" target="_blank">View Live</a>
                    <a href="#" class="btn" target="_blank">View Code</a>
                `;
                
                // Show modal
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    }
    
    // Animation on scroll (if desired)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
});
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    document.getElementById('progress-bar').style.width = scrollPercentage + '%';
});
const typewriterElement = document.getElementById("typewriter");
const typewriterTexts = ["AI Enthusiast", "Developer", "Problem Solver"];
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typewriterTexts[typeIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex--);
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % typewriterTexts.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
