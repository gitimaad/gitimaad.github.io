document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const message = document.getElementById('message');
    const nameInput = document.getElementById('name');
    
    // Focus on the first input when page loads for terminal-like behavior
    nameInput.focus();
    
    // Add blinking cursor effect to the terminal
    const terminalPrompt = document.querySelector('.terminal-prompt .prompt-text');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalPrompt.appendChild(cursor);
    
    // Google Apps Script Web App URL - Replace with your deployed web app URL
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxd6nGTIrysnHSBpGN-7mwvGogv54b-XEvOwaUES7kIlfHMipcCQsBHdxGNVipLd3VG/exec';
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Hide the form
        loginForm.classList.add('hidden');
        
        // Show the success message with terminal-like typing effect
        message.classList.remove('hidden');
        
        // Simulate terminal typing effect
        const successText = `credentials registered!<br>redirecting to portfolio...`;
        let i = 0;
        message.innerHTML = '<span class="prompt-symbol">$</span> <span class="prompt-text"></span>';
        const messageText = message.querySelector('.prompt-text');
        
        // Send data to Google Sheets
        sendDataToGoogleSheets(name, email);
        
        const typeEffect = setInterval(function() {
            if (i < successText.length) {
                // If we encounter <br>, add the whole tag at once
                if (successText.substring(i, i+4) === '<br>') {
                    messageText.innerHTML += '<br>';
                    i += 4;
                } else {
                    messageText.innerHTML += successText.charAt(i);
                    i++;
                }
            } else {
                clearInterval(typeEffect);
                // Add blinking cursor at the end
                const messageCursor = document.createElement('span');
                messageCursor.className = 'cursor';
                messageText.appendChild(messageCursor);
                
                // Set login flag in localStorage
                localStorage.setItem('terminalLogin', 'true');
                
                // Redirect to portfolio page after a delay
                setTimeout(function() {
                    // Redirect to the portfolio page
                    window.location.href = "../Portfolio/portfolio.html";
                }, 2000);
            }
        }, 50);
    });
    
    // Function to send data to Google Sheets
    function sendDataToGoogleSheets(name, email) {
        // Create data object to send
        const data = {
            name: name,
            email: email
        };
        
        // Send data to Google Sheets using fetch API
        fetch(googleScriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Continue with the flow even if there's an error with the Google Sheets submission
        });
    }
});