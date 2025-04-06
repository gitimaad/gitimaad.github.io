document.addEventListener('DOMContentLoaded', function() {
    // Hacker-themed animation for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroDescription = heroContent.querySelector('p');
        const ctaButton = heroContent.querySelector('.cta-button');
        
        // Store original text
        const originalTitle = heroTitle.innerHTML;
        const originalDesc = heroDescription.textContent;
        
        // Clear text initially
        heroTitle.innerHTML = '';
        heroDescription.textContent = '';
        ctaButton.style.opacity = '0';
        
        // Function to create a glitch effect
        const glitchText = (element, finalText, callback) => {
            const glitchChars = '@#$%&*<>/\\|{}[]~^';
            let iterations = 0;
            const maxIterations = 3;
            let interval;
            
            interval = setInterval(() => {
                element.textContent = element.textContent
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return finalText[index];
                        }
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iterations >= finalText.length) {
                    clearInterval(interval);
                    element.textContent = finalText;
                    if (callback) callback();
                }
                
                iterations += 1 / maxIterations;
            }, 30);
        };
        
        // Function to simulate typing effect
        const typeText = (element, text, speed, callback) => {
            let i = 0;
            element.textContent = '|'; // Start with cursor
            
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent = text.substring(0, i + 1) + '|';
                    i++;
                } else {
                    element.textContent = text; // Remove cursor at end
                    clearInterval(typing);
                    if (callback) callback();
                }
            }, speed);
        };
        
        // Function to add occasional glitch effect to an element
        const addGlitchEffect = (element) => {
            // Add glitch class for CSS animations
            element.classList.add('text-glitch');
            
            // Occasionally trigger glitch animation
            const glitchInterval = setInterval(() => {
                if (Math.random() > 0.7) {
                    element.classList.add('glitch-active');
                    setTimeout(() => {
                        element.classList.remove('glitch-active');
                    }, 200);
                }
            }, 3000);
        };
        
        // Start the animation sequence
        setTimeout(() => {
            // First animate the title with HTML for the highlight span
            const titleText = 'Welcome to my ';
            const titleHighlight = '<span class="highlight">Portfolio!</span>';
            
            typeText(heroTitle, titleText, 100, () => {
                // After typing text, add the highlight span
                heroTitle.innerHTML = titleText + '<span class="highlight">|</span>';
                
                // Then type the highlighted part
                const highlightSpan = heroTitle.querySelector('.highlight');
                typeText(highlightSpan, 'Portfolio!', 150, () => {
                    // After title is complete, add glitch effect
                    heroTitle.innerHTML = originalTitle;
                    addGlitchEffect(heroTitle);
                    
                    // Start typing description
                    setTimeout(() => {
                        typeText(heroDescription, originalDesc, 20, () => {
                            // After description is complete, show button with fade in
                            setTimeout(() => {
                                ctaButton.style.transition = 'opacity 1s ease';
                                ctaButton.style.opacity = '1';
                                
                                // Add glitch effect to description
                                addGlitchEffect(heroDescription);
                            }, 300);
                        });
                    }, 500);
                });
            });
        }, 500);
    }
    
    // Custom cursor functionality
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorDot = document.querySelector('.custom-cursor-dot');
    
    if (customCursor && customCursorDot) {
        // Update cursor position on mouse move
        document.addEventListener('mousemove', function(e) {
            // Add a slight delay to the outer cursor for a trailing effect
            setTimeout(() => {
                customCursor.style.left = e.clientX + 'px';
                customCursor.style.top = e.clientY + 'px';
            }, 50);
            
            // The dot follows the cursor immediately
            customCursorDot.style.left = e.clientX + 'px';
            customCursorDot.style.top = e.clientY + 'px';
        });
        
        // Add click animation
        document.addEventListener('mousedown', function() {
            customCursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            customCursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        document.addEventListener('mouseup', function() {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', function() {
            customCursor.style.display = 'none';
            customCursorDot.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', function() {
            customCursor.style.display = 'block';
            customCursorDot.style.display = 'block';
        });
    }
    
    // Background animation is now handled by background-animation.js
    // Check if user has logged in
    if (!localStorage.getItem('terminalLogin')) {
        // Redirect to terminal login page if not logged in
        console.log('No login detected, redirecting to Terminal Login page');
        window.location.href = "../Terminal Login/index.html";
        return;
    }
    
    console.log('Login detected, showing portfolio');
    
    // Terminal toggle and interactive functionality
    const terminalSection = document.getElementById('terminal');
    const terminalToggleBtn = document.getElementById('terminal-toggle');

    if (terminalSection && terminalToggleBtn) {
        // Initialize flags
        let terminalAnimationStarted = false;
        let terminalVisible = false;
        
        // Initially hide the terminal with CSS
        terminalSection.style.display = 'none';
        terminalSection.style.opacity = '0';
        terminalSection.style.transform = 'translateY(20px)';
        terminalSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Create interactive terminal elements
        const terminalContent = terminalSection.querySelector('.terminal-content');
        
        // Clear existing static content
        terminalContent.innerHTML = '';
        
        // Create command history container
        const commandHistory = document.createElement('div');
        commandHistory.className = 'command-history';
        terminalContent.appendChild(commandHistory);
        
        // Create active prompt container
        const activePrompt = document.createElement('div');
        activePrompt.className = 'active-prompt';
        
        const promptSymbol = document.createElement('span');
        promptSymbol.className = 'prompt-symbol';
        promptSymbol.textContent = '$';
        activePrompt.appendChild(promptSymbol);
        
        const promptInputContainer = document.createElement('div');
        promptInputContainer.className = 'prompt-input-container';
        
        const terminalInput = document.createElement('input');
        terminalInput.type = 'text';
        terminalInput.className = 'terminal-input';
        terminalInput.placeholder = 'Type a command (try "help")...';
        terminalInput.autocomplete = 'off';
        terminalInput.spellcheck = false;
        
        promptInputContainer.appendChild(terminalInput);
        activePrompt.appendChild(promptInputContainer);
        
        terminalContent.appendChild(activePrompt);
        
        // Command processor
        const processCommand = (command) => {
            // Add command to history
            const commandEntry = document.createElement('div');
            commandEntry.className = 'command-entry';
            
            const commandPrompt = document.createElement('div');
            commandPrompt.className = 'terminal-prompt';
            commandPrompt.innerHTML = `<span class="prompt-symbol">$</span> <span class="prompt-text">${command}</span>`;
            
            const commandResponse = document.createElement('div');
            commandResponse.className = 'terminal-response';
            
            // Process different commands
            const cmd = command.toLowerCase().trim();
            
            if (cmd === 'help' || cmd === 'commands') {
                commandResponse.innerHTML = `
                    <p>Available commands:</p>
                    <ul>
                        <li><span class="highlight">about</span> - About Mohammed Imaad</li>
                        <li><span class="highlight">skills</span> - List technical skills</li>
                        <li><span class="highlight">projects</span> - View portfolio projects</li>
                        <li><span class="highlight">contact</span> - Contact information</li>
                        <li><span class="highlight">experience</span> - Work and leadership experience</li>
                        <li><span class="highlight">education</span> - Educational background</li>
                        <li><span class="highlight">clear</span> - Clear the terminal</li>
                        <li><span class="highlight">exit</span> - Close the terminal</li>
                    </ul>
                `;
            } else if (cmd === 'about') {
                commandResponse.innerHTML = `
                    <p>Mohammed Imaad is a Data Analyst who specializes in data visualization, statistical analysis, and predictive modeling, with a passion for transforming complex datasets into actionable insights. Skilled in languages such as Python, MySQL and softwares such as Office Enterprise, and Power BI.</p>
                `;
            } else if (cmd === 'skills') {
                commandResponse.innerHTML = `
                    <ul class="skills-list">
                        <li><span class="skill-category">Programming:</span> Python, MySQL</li>
                        <li><span class="skill-category">Data Visualization:</span> Pandas, Power BI, Matplotlib, Seaborn</li>
                        <li><span class="skill-category">Machine Learning:</span> Scikit-learn, Regression, Classification</li>
                        <li><span class="skill-category">Tools:</span> Jupyter Notebook, Git, Office Enterprise</li>
                        <li><span class="skill-category">Statistics:</span> Hypothesis Testing, A/B Testing, Regression Analysis</li>
                    </ul>
                `;
            } else if (cmd === 'projects') {
                commandResponse.innerHTML = `
                    <div class="project">
                        <h3>Top Fast Food Giants: Stock Analysis</h3>
                        <p>Utilizes Python for Data Analysis, MySQL for data storage, and Power BI for visualizations.</p>
                        <p><span class="tech-used">Technologies:</span> Python, Pandas, Matplotlib, MySQL, Power BI</p>
                    </div>
                    <div class="project">
                        <h3>Adeventure Works: Sales Analysis</h3>
                        <p>Used Python to conduct sales trend analysis, MySQL to host the dataset, and Power BI to generate visualizations.</p>
                        <p><span class="tech-used">Technologies:</span> Python, Pandas, Matplotlib, MySQL, Power BI</p>
                    </div>
                    <div class="project">
                        <h3>End-to-End Sales Data Analysis</h3>
                        <p>Used Python and Machine Learning to predict models using Random Forest for outliers, and incosistencies. Performed in-depth EDA to uncover patterns and hosted it on a MySQL Database. Created visualizations using Power BI.</p>
                        <p><span class="tech-used">Technologies:</span> Python, Pandas, Matplotlib, Scikit-Learn, MySQL, Power BI</p>
                    </div>
                `;
            } else if (cmd === 'contact') {
                commandResponse.innerHTML = `
                    <div class="contact-info">
                        <p><span class="contact-label">Email:</span> <a href="mailto:hamadsaad1234@gmail.com">hamadsaad1234@gmail.com</a></p>
                        <p><span class="contact-label">LinkedIn:</span> <a href="https://linkedin.com/in/mohammedimaad" target="_blank">linkedin.com/in/mohammedimaad</a></p>
                        <p><span class="contact-label">GitHub:</span> <a href="https://github.com/gitimaad" target="_blank">github.com/gitimaad</a></p>
                    </div>
                `;
            } else if (cmd === 'experience') {
                commandResponse.innerHTML = `
                    <div class="experience">
                        <h3>xto10x - Hackathon | Team Lead</h3>
                        <p class="date">January 2025</p>
                        <p>Monitored and guided the team in selecting data sources, designing analysis frameworks, and development of the final presentation, ensuring effective communication of findings, results, and insights.</p>
                    </div>
                    <div class="experience">
                        <h3>Construct Week | Team Lead</h3>
                        <p class="date">December 2024 - February 2025</p>
                        <p>Monitored the team's development, strctured analytical process, and craft of the final report and presentation ensuring results and insights are presented in a concise, persuasive, and visually appealing manner.</p>
                    </div>
                    <div class="experience">
                        <h3>Mechmerize - Departmental Fest</h3>
                        <p class="date">Decemeber 2023</p>
                        <p>Initiated strategic planning process for the departmental fest incorporating both technical and non-technical activites.</p>
                    </div>
                    <div class="experience">
                        <h3>Discipline Committee - Atria</h3>
                        <p class="date">June 2023</p>
                        <p>Enforced discipline and decorum during college events and activities.</p>
                    </div>
                `;
            } else if (cmd === 'education') {
                commandResponse.innerHTML = `
                    <div class="experience">
                        <h3>Masai</h3>
                        <p class="date">2024 - Present</p>
                        <p>Data Analysis</p>
                    </div>
                    <div class="experience">
                        <h3>Atria Institute of Technology</h3>
                        <p class="date">2020 - 2024</p>
                        <p>Bachelor of Engineering in Mechanical Engineering</p>
                    </div>
                `;
            } else if (cmd === 'clear') {
                // Clear command history
                commandHistory.innerHTML = '';
                return; // Skip adding to history
            } else if (cmd === 'exit') {
                // Close the terminal
                terminalSection.style.opacity = '0';
                terminalSection.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    terminalSection.style.display = 'none';
                }, 500);
                
                terminalVisible = false;
                terminalToggleBtn.innerHTML = 'Open Terminal <i class="fas fa-terminal"></i>';
                return; // Skip adding to history
            } else if (cmd === '') {
                // Empty command
                return; // Skip adding to history
            } else {
                commandResponse.innerHTML = `<p>Command not found: ${command}. Type <span class="highlight">help</span> to see available commands.</p>`;
            }
            
            commandEntry.appendChild(commandPrompt);
            commandEntry.appendChild(commandResponse);
            commandHistory.appendChild(commandEntry);
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        };
        
        // Handle terminal input
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                processCommand(command);
                this.value = ''; // Clear input after processing
            }
        });
        
        // Add glitch effect to terminal
        const glitchTerminal = () => {
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                terminal.style.filter = 'hue-rotate(90deg) brightness(1.5)';
                setTimeout(() => {
                    terminal.style.filter = 'hue-rotate(180deg) brightness(2)';
                    setTimeout(() => {
                        terminal.style.filter = 'hue-rotate(270deg) contrast(1.5)';
                        setTimeout(() => {
                            terminal.style.filter = 'none';
                        }, 100);
                    }, 100);
                }, 100);
            }
        };
        
        // Toggle terminal visibility
        terminalToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add glitch effect to button
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 300);
            
            // Toggle terminal visibility
            if (!terminalVisible) {
                // Show terminal
                terminalSection.style.display = 'block';
                setTimeout(() => {
                    terminalSection.style.opacity = '1';
                    terminalSection.style.transform = 'translateY(0)';
                }, 10);
                
                // Change button text to 'Close Terminal'
                this.innerHTML = 'Close Terminal <i class="fas fa-terminal"></i>';
                
                // Focus on input
                setTimeout(() => {
                    terminalInput.focus();
                    
                    // Start animation if not already started
                    if (!terminalAnimationStarted) {
                        terminalAnimationStarted = true;
                        
                        // Add welcome message
                        processCommand('help');
                        
                        // Add glitch effect occasionally
                        setInterval(glitchTerminal, 10000);
                    }
                }, 500);
                
                terminalVisible = true;
            } else {
                // Hide terminal
                terminalSection.style.opacity = '0';
                terminalSection.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    terminalSection.style.display = 'none';
                }, 500);
                
                // Change button text back to 'Open Terminal'
                this.innerHTML = 'Open Terminal <i class="fas fa-terminal"></i>';
                
                terminalVisible = false;
            }
        });
        
        // Close terminal when clicking the close button
        const closeBtn = terminalSection.querySelector('.control.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                // Hide terminal
                terminalSection.style.opacity = '0';
                terminalSection.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    terminalSection.style.display = 'none';
                }, 500);
                
                terminalVisible = false;
            });
        }
    }
    
    // Project modal functionality
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                // Modal functionality is handled by dashboard-modal.js
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a, .cta-button, .about-buttons .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Account for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
});