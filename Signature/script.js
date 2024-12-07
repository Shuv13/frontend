const nameInput = document.getElementById('nameInput');
const signature = document.getElementById('signature');
const fontButtons = document.querySelectorAll('.font-btn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

nameInput.addEventListener('keydown', (event) => {
    if (event.key.length === 1) { // Single character keys
        setTimeout(() => {
            const text = nameInput.value;
            const lastChar = text[text.length - 1];
            addAnimatedLetter(lastChar);
        }, 0);
    } else if (event.key === 'Backspace') {
        setTimeout(() => {
            const text = nameInput.value;
            signature.innerHTML = '';
            // Redraw all characters
            text.split('').forEach((char) => {
                addAnimatedLetter(char, false);
            });
        }, 0);
    }
});

function addAnimatedLetter(char, animate = true) {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = char;
    letterSpan.style.opacity = '0';
    letterSpan.style.transform = 'translateY(10px)';
    
    if (char === ' ') {
        letterSpan.style.display = 'inline-block';
        letterSpan.style.width = '0.5em';
    }

    signature.appendChild(letterSpan);

    if (animate) {
        // Trigger animation
        setTimeout(() => {
            letterSpan.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            letterSpan.style.opacity = '1';
            letterSpan.style.transform = 'translateY(0)';
        }, 50);
    } else {
        // Instant display for backspace redraw
        letterSpan.style.opacity = '1';
        letterSpan.style.transform = 'translateY(0)';
    }

    // Show copy button if there's text
    copyBtn.style.display = nameInput.value ? 'block' : 'none';
}

// Font change handler
fontButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        fontButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const fontName = e.target.dataset.font;
        signature.style.fontFamily = `"${fontName}", cursive`;
        
        // Reapply animation to current text
        const currentText = nameInput.value;
        signature.innerHTML = '';
        currentText.split('').forEach(char => {
            addAnimatedLetter(char, false);
        });
    });
});

// Copy functionality
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(signature.textContent);
        showCopyMessage();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});

function showCopyMessage() {
    copyMessage.style.display = 'block';
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
}

// Set initial font
signature.style.fontFamily = '"Dancing Script", cursive';