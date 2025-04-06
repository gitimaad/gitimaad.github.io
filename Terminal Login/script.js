document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const message = document.getElementById('message');
    const nameInput = document.getElementById('name');
    const captchaText = document.getElementById('captcha-text');
    const captchaInput = document.getElementById('captcha-input');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha');
    
    // CAPTCHA variables
    let captchaCode = '';
    
    // Focus on the first input when page loads for terminal-like behavior
    nameInput.focus();
    
    // Add blinking cursor effect to the terminal
    const terminalPrompt = document.querySelector('.terminal-prompt .prompt-text');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalPrompt.appendChild(cursor);
    
    // Generate a random CAPTCHA code
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        captchaCode = '';
        
        // Generate a 6-character CAPTCHA code
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            captchaCode += chars.charAt(randomIndex);
        }
        
        // Display the CAPTCHA code
        captchaText.textContent = captchaCode;
    }
    
    // Initialize CAPTCHA on page load
    generateCaptcha();
    
    // Refresh CAPTCHA when button is clicked
    refreshCaptchaBtn.addEventListener('click', function() {
        generateCaptcha();
    });
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value;
        const email = document.getElementById('email').value;
        const captchaValue = captchaInput.value;
        
        // Validate CAPTCHA
        if (captchaValue === captchaCode) {
            // Prepare form data for Formspree
            const formData = {
                name: name,
                email: email,
                captcha: captchaValue
            };
            
            // Send data to Formspree
            fetch('https://formspree.io/f/xwplrnzl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Successful login and form submission
                message.innerHTML = '';
                message.classList.remove('hidden');
                
                // Hide the form
                loginForm.classList.add('hidden');
                
                // Set login flag in localStorage
                localStorage.setItem('terminalLogin', 'true');
                
                // Messages to display with typing effect
                const messages = [
                    '<span class="prompt-symbol">$</span> <span class="prompt-text">CAPTCHA verified!</span>',
                    '<span class="prompt-symbol">$</span> <span class="prompt-text">login registered!</span>',
                    '<span class="prompt-symbol">$</span> <span class="prompt-text">redirecting to portfolio...</span>'
                ];
                
                // Function to simulate typing effect
                function typeMessage(messageIndex, charIndex) {
                    if (messageIndex < messages.length) {
                        const currentMessage = messages[messageIndex];
                        
                        if (charIndex === 0) {
                            // Start a new line
                            if (messageIndex > 0) {
                                message.innerHTML += '<br>';
                            }
                        }
                        
                        if (charIndex < currentMessage.length) {
                            // Handle HTML tags properly
                            if (currentMessage.charAt(charIndex) === '<') {
                                // Find the closing bracket
                                const closingIndex = currentMessage.indexOf('>', charIndex);
                                if (closingIndex !== -1) {
                                    // Add the entire tag at once
                                    message.innerHTML += currentMessage.substring(charIndex, closingIndex + 1);
                                    charIndex = closingIndex;
                                }
                            } else {
                                // Add one character at a time
                                message.innerHTML += currentMessage.charAt(charIndex);
                            }
                            
                            // Continue typing the current message
                            setTimeout(function() {
                                typeMessage(messageIndex, charIndex + 1);
                            }, 30); // Adjust typing speed here
                        } else {
                            // Move to the next message
                            setTimeout(function() {
                                typeMessage(messageIndex + 1, 0);
                            }, 300); // Delay between messages
                        }
                    } else {
                        // All messages typed, redirect to portfolio page
                        setTimeout(function() {
                            window.location.href = "../Portfolio/portfolio.html";
                        }, 1000);
                    }
                }
                
                // Start the typing animation
                typeMessage(0, 0);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your login. Please try again.');
            });
        } else {
            // Invalid CAPTCHA
            captchaInput.value = '';
            captchaInput.placeholder = 'Invalid CAPTCHA! Try again';
            captchaInput.classList.add('error');
            generateCaptcha();
            
            // Remove error class after a delay
            setTimeout(function() {
                captchaInput.classList.remove('error');
                captchaInput.placeholder = 'type the CAPTCHA here';
            }, 1500);
        }
    });
});