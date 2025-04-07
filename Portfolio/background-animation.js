/**
 * Simple Interactive Background Animation
 * Creates a clean, responsive animated background with enhanced interactive features
 * Optimized for performance with smooth cursor interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) {
        console.error('Canvas element not found! Background animation cannot be initialized.');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Animation properties
    let animationFrameId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseMoving = false;
    let mouseTimer;
    let time = 0;
    let clickEffects = [];
    
    // Simplified color palette
    const colors = {
        primary: '#FFB000',      // Gold
        secondary: '#3498db',    // Blue
        tertiary: '#2ecc71',     // Green
        background: '#0a0a12',   // Dark blue-black
        particle: '#ffffff'      // White
    };
    
    // Set canvas dimensions and handle resize
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reinitialize elements when canvas is resized
        initializeElements();
    }
    
    // Initialize animation elements
    function initializeElements() {
        // Clear existing elements
        particles = [];
        clickEffects = [];
        
        // Create particles - significantly increased for more visual density
        const particleCount = Math.floor(canvas.width / 12); // Increased particle count
        
        // Add base layer of particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
        
        // Add additional layer of particles for more density
        const additionalParticles = Math.floor(particleCount * 0.5); // 50% more particles
        for (let i = 0; i < additionalParticles; i++) {
            particles.push(createParticle());
        }
    }
    
    // Create a single particle with random properties
    function createParticle() {
        // Create different size categories for more visual variety
        const sizeCategory = Math.random();
        let size;
        
        if (sizeCategory < 0.5) {
            // Small particles (50% chance) - 0.5 to 2
            size = 0.5 + Math.random() * 1.5;
        } else if (sizeCategory < 0.85) {
            // Medium particles (35% chance) - 2 to 4
            size = 2 + Math.random() * 2;
        } else {
            // Large particles (15% chance) - 4 to 7
            size = 4 + Math.random() * 3;
        }
        
        // Calculate opacity based on size - smaller particles are more opaque
        const baseOpacity = 0.3 + Math.random() * 0.5;
        const sizeOpacityFactor = 1 - (size / 10); // Larger particles are more transparent
        const adjustedOpacity = baseOpacity * sizeOpacityFactor;
        
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            color: Math.random() > 0.7 ? colors.primary : 
                   Math.random() > 0.5 ? colors.secondary : colors.tertiary,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: adjustedOpacity,
            interactive: Math.random() > 0.7, // Some particles will be more interactive
            pulseSpeed: 0.02 + Math.random() * 0.03,
            pulsePhase: Math.random() * Math.PI * 2
        };
    }
    
    // Draw the background
    function drawBackground() {
        // Create gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 1.5
        );
        gradient.addColorStop(0, 'rgba(15, 15, 25, 0.92)');
        gradient.addColorStop(1, 'rgba(5, 5, 15, 0.96)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle grid pattern
        ctx.strokeStyle = 'rgba(50, 50, 70, 0.05)';
        ctx.lineWidth = 0.5;
        
        const gridSize = 50; // Larger grid for simplicity
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    // Draw particles with interactive effects
    function drawParticles() {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            // Check if mouse is near this particle
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const isNearMouse = distance < 100;
            
            // Calculate size based on interactivity
            let displaySize = particle.size;
            let displayOpacity = particle.opacity;
            
            // Enhanced interactivity for particles marked as interactive
            if (isNearMouse) {
                const influence = 1 - distance / 100;
                
                // Adjust influence based on particle size - larger particles have more dramatic effects
                const sizeInfluenceFactor = 1 + (particle.size / 5);
                
                if (particle.interactive) {
                    // More dramatic effect for interactive particles
                    displaySize = particle.size * (1 + influence * 2 * sizeInfluenceFactor);
                    displayOpacity = Math.min(1, particle.opacity * (1 + influence));
                } else {
                    // Subtle effect for regular particles - also adjusted by size
                    displaySize = particle.size * (1 + influence * 0.5 * (1 + (particle.size / 10)));
                    displayOpacity = particle.opacity * (1 + influence * 0.2);
                }
            }
            
            // Apply pulsing effect to interactive particles
            if (particle.interactive) {
                const pulseEffect = 0.2 * Math.sin(time * particle.pulseSpeed + particle.pulsePhase);
                displaySize *= (1 + pulseEffect);
                displayOpacity *= (1 + pulseEffect * 0.5);
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, displaySize, 0, Math.PI * 2);
            
            // Create gradient for particle
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, displaySize
            );
            gradient.addColorStop(0, particle.color.replace('rgb', 'rgba').replace(')', `, ${displayOpacity})`));
            gradient.addColorStop(1, particle.color.replace('rgb', 'rgba').replace(')', ', 0)'));
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Draw connection lines between nearby particles
            if (isMouseMoving && isNearMouse) {
                for (let j = i + 1; j < particles.length; j++) {
                    const otherParticle = particles[j];
                    const dx2 = particle.x - otherParticle.x;
                    const dy2 = particle.y - otherParticle.y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (distance2 < 100) {
                        // Draw connection line with opacity based on distance - increased intensity
                        const lineOpacity = 0.35 * (1 - distance2 / 100) * displayOpacity;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = colors.primary.replace('rgb', 'rgba').replace(')', `, ${lineOpacity})`);
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    // Draw click effects
    function drawClickEffects() {
        for (let i = 0; i < clickEffects.length; i++) {
            const effect = clickEffects[i];
            
            // Draw expanding circle
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
            ctx.strokeStyle = effect.color.replace('rgb', 'rgba').replace(')', `, ${effect.opacity})`);
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Update effect properties
            effect.radius += effect.speed;
            effect.opacity -= 0.02;
            
            // Remove faded effects
            if (effect.opacity <= 0) {
                clickEffects.splice(i, 1);
                i--;
            }
        }
    }
    
    // Update animation elements
    function updateElements() {
        time += 0.016; // Approximately 60fps
        
        // Update particles
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < -particle.size) {
                particle.x = canvas.width + particle.size;
            } else if (particle.x > canvas.width + particle.size) {
                particle.x = -particle.size;
            }
            
            if (particle.y < -particle.size) {
                particle.y = canvas.height + particle.size;
            } else if (particle.y > canvas.height + particle.size) {
                particle.y = -particle.size;
            }
            
            // Add small random movement
            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;
            
            // Adjust velocity based on mouse proximity
            if (isMouseMoving) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const influence = 1 - distance / 150;
                    // Interactive particles are more attracted to cursor
                    const factor = particle.interactive ? 0.2 : 0.05;
                    particle.vx += (dx / distance) * influence * factor;
                    particle.vy += (dy / distance) * influence * factor;
                }
            }
            
            // Limit velocity - adjust speed based on particle size
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            // Smaller particles move faster, larger particles move slower
            const sizeSpeedFactor = 4 / (particle.size + 2); // Inverse relationship between size and speed
            const maxSpeed = particle.interactive ? 1.5 * sizeSpeedFactor : 0.8 * sizeSpeedFactor;
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
            
            // Add friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Occasionally regenerate particles
            if (Math.random() < 0.0005) {
                particles[i] = createParticle();
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        drawBackground();
        
        // Draw particles
        drawParticles();
        
        // Draw click effects
        drawClickEffects();
        
        // Update elements
        updateElements();
        
        // Continue animation loop
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Handle mouse movement
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        isMouseMoving = true;
        
        // Reset mouse movement timer
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    }
    
    // Handle mouse leave
    function handleMouseLeave() {
        isMouseMoving = false;
    }
    
    // Handle mouse enter
    function handleMouseEnter() {
        isMouseMoving = true;
    }
    
    // Handle mouse click - new interactive feature
    function handleMouseClick(e) {
        // Create click effect
        clickEffects.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            speed: 2,
            opacity: 0.8,
            color: colors.primary
        });
        
        // Create new particles at click location
        for (let i = 0; i < 5; i++) {
            const newParticle = createParticle();
            newParticle.x = e.clientX;
            newParticle.y = e.clientY;
            newParticle.vx = (Math.random() - 0.5) * 2;
            newParticle.vy = (Math.random() - 0.5) * 2;
            newParticle.interactive = true;
            particles.push(newParticle);
        }
    }
    
    // Initialize the animation
    function init() {
        setCanvasDimensions();
        animate();
        
        // Add event listeners
        window.addEventListener('resize', setCanvasDimensions);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('click', handleMouseClick); // New click event
    }
    
    // Start the animation
    init();
});