document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initRandomGhosts();
    initScrollEffects();
    initButtonEffects();
});

// Function to randomly show ghosts on the screen
function initRandomGhosts() {
    const ghostEmojis = ['👻', '👻', '👻', '👻💰', '👻❤️', '😱👻'];
    
    // Create ghost at random intervals
    setInterval(() => {
        if (Math.random() > 0.5) {
            createRandomGhost(ghostEmojis);
        }
    }, 20000); // Every 20 seconds with 50% chance
}

// Create a ghost element at a random position
function createRandomGhost(emojis) {
    const ghost = document.createElement('div');
    ghost.className = 'random-ghost';
    ghost.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random position (limited to viewport)
    const posX = Math.random() * window.innerWidth * 0.8;
    const posY = Math.random() * window.innerHeight * 0.8;
    
    ghost.style.left = `${posX}px`;
    ghost.style.top = `${posY}px`;
    
    // Add to DOM
    document.body.appendChild(ghost);
    
    // Define the keyframes for appearing and disappearing
    const keyframes = [
        { opacity: 0, transform: 'translateY(50px)' },
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-50px)' }
    ];
    
    // Define animation options
    const options = {
        duration: 5000,
        easing: 'ease-in-out',
        fill: 'forwards'
    };
    
    // Start animation
    ghost.animate(keyframes, options);
    
    // Remove ghost after animation completes
    setTimeout(() => {
        document.body.removeChild(ghost);
    }, 5000);
}

// Add scroll effects for the floating ghost
function initScrollEffects() {
    const cryingGhost = document.getElementById('crying-ghost');
    
    if (cryingGhost) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const narrativeSection = document.querySelector('.narrative');
            const narrativeTop = narrativeSection.offsetTop;
            const narrativeHeight = narrativeSection.offsetHeight;
            
            // Calculate relative position within the narrative section
            if (scrollPosition > narrativeTop && scrollPosition < narrativeTop + narrativeHeight) {
                const relativePos = (scrollPosition - narrativeTop) / narrativeHeight;
                // Move ghost up and down based on scroll position
                cryingGhost.style.top = `${30 + relativePos * 30}%`;
            }
        });
    }
}

// Add hover effects to buttons
function initButtonEffects() {
    // Telegram button mouth open effect
    const telegramBtn = document.querySelector('.telegram-btn');
    
    if (telegramBtn) {
        telegramBtn.addEventListener('mouseenter', () => {
            const icon = telegramBtn.querySelector('.icon');
            if (icon) {
                icon.textContent = '😮';
            }
        });
        
        telegramBtn.addEventListener('mouseleave', () => {
            const icon = telegramBtn.querySelector('.icon');
            if (icon) {
                icon.textContent = '💬';
            }
        });
    }
    
    // Button wiggle effect
    const buttons = document.querySelectorAll('.btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'wiggle 0.3s ease-in-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
        });
    });
}

// Add CSS keyframes programmatically for wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
@keyframes wiggle {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
}

@keyframes appearDisappear {
    0% { opacity: 0; transform: translateY(50px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-50px); }
}
`;
document.head.appendChild(wiggleStyle); 