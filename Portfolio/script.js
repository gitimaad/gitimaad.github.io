document.addEventListener('DOMContentLoaded', function() {
    // Check if user has logged in
    if (!localStorage.getItem('terminalLogin')) {
        // Redirect to terminal login page if not logged in
        console.log('No login detected, redirecting to Terminal Login page');
        window.location.href = "../Terminal Login/index.html";
        return;
    }
    
    console.log('Login detected, showing portfolio');
    
    // Terminal will remain in its original position in the HTML
    const terminalSection = document.getElementById('terminal');
    if (terminalSection) {
        // Initialize a flag to track if animation has started
        let terminalAnimationStarted = false;
        
        // Function to check if terminal is in viewport and start animation if needed
        const checkTerminalVisibility = () => {
            if (!terminalAnimationStarted) {
                const rect = terminalSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    setTimeout(revealSequentially, 500);
                    terminalAnimationStarted = true;
                }
            }
        };
        
        // Check visibility on scroll
        window.addEventListener('scroll', checkTerminalVisibility);
        
        // Also handle click on the terminal button
        document.querySelector('a[href="#terminal"]').addEventListener('click', function() {
            if (!terminalAnimationStarted) {
                setTimeout(revealSequentially, 500);
                terminalAnimationStarted = true;
            }
        });
        
        // Also check on initial load
        checkTerminalVisibility();
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.site-header').appendChild(mobileMenuToggle);
    
    const mainNav = document.querySelector('.main-nav ul');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        this.innerHTML = mainNav.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate sections on scroll
    const animateSections = () => {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };
    
    // Initial check for sections in view
    animateSections();
    
    // Check for sections in view on scroll
    window.addEventListener('scroll', animateSections);
    
    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Terminal functionality
    const terminalPrompts = document.querySelectorAll('.terminal-prompt');
    const terminalResponses = document.querySelectorAll('.terminal-response');
    
    // Initially hide all responses except the first one
    for (let i = 1; i < terminalResponses.length; i++) {
        terminalResponses[i].style.display = 'none';
    }
    
    // Initially hide all prompts except the first one
    for (let i = 1; i < terminalPrompts.length; i++) {
        terminalPrompts[i].style.display = 'none';
    }
    
    // Function to reveal elements sequentially
    function revealSequentially() {
        let delay = 1000; // Initial delay
        
        for (let i = 1; i < terminalPrompts.length; i++) {
            // Reveal prompt
            setTimeout(() => {
                terminalPrompts[i].style.display = 'flex';
                // Scroll to the bottom
                document.querySelector('.terminal-content').scrollTop = document.querySelector('.terminal-content').scrollHeight;
            }, delay);
            
            delay += 500; // Wait before showing response
            
            // Reveal response (if not the last prompt which has the cursor)
            if (i < terminalPrompts.length - 1) {
                setTimeout(() => {
                    terminalResponses[i].style.display = 'block';
                    // Scroll to the bottom
                    document.querySelector('.terminal-content').scrollTop = document.querySelector('.terminal-content').scrollHeight;
                }, delay);
                
                delay += 1000; // Wait longer after showing response
            }
        }
    }
    
    // Terminal animation is already started above, no need to start it again
    
    // Add event listener for typing effect in terminal
    document.addEventListener('keydown', function(event) {
        // Only respond to alphanumeric keys, space, and some special characters
        if (/^[a-zA-Z0-9 \-_=+!@#$%^&*()\[\]{}|;:'",.<>/?\\]$/.test(event.key)) {
            const lastPrompt = terminalPrompts[terminalPrompts.length - 1];
            const promptText = lastPrompt.querySelector('.prompt-text');
            
            // If the last prompt has the cursor placeholder, replace it with the typed character
            if (promptText.textContent === '_') {
                promptText.textContent = event.key;
            } else {
                // Otherwise append the character
                promptText.textContent += event.key;
            }
        } else if (event.key === 'Backspace') {
            // Handle backspace
            const lastPrompt = terminalPrompts[terminalPrompts.length - 1];
            const promptText = lastPrompt.querySelector('.prompt-text');
            
            if (promptText.textContent.length > 0 && promptText.textContent !== '_') {
                promptText.textContent = promptText.textContent.slice(0, -1);
                if (promptText.textContent.length === 0) {
                    promptText.textContent = '_';
                }
            }
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Send data to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    this.innerHTML = `<div class="form-success"><i class="fas fa-check-circle"></i><h3>Message Sent!</h3><p>Thanks ${formData.get('name')}, I'll get back to you soon.</p></div>`;
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Show error message
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            });
        });
    }
});

// Add CSS for new JavaScript functionality
const styleElement = document.createElement('style');
styleElement.textContent = `
    /* Mobile menu styles */
    .mobile-menu-toggle {
        display: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--text-color);
    }
    
    /* Section animation */
    .content-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .content-section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Form success message */
    .form-success {
        text-align: center;
        padding: 30px;
    }
    
    .form-success i {
        font-size: 50px;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .form-success h3 {
        margin-bottom: 15px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .main-nav ul {
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: rgba(18, 18, 18, 0.95);
            flex-direction: column;
            padding: 20px 0;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .main-nav ul.show {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .main-nav li {
            margin: 15px 0;
            text-align: center;
        }
    }
`;
document.head.appendChild(styleElement);