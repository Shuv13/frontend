// Array of emojis to randomly display
const emojis = ['😄', '😆', '🤣', '😂', '😅', '😊', '😎', '��', '🤓', '🤡'];

// Get DOM elements
const jokeText = document.querySelector('.joke-text');
const emojiDisplay = document.querySelector('.emoji');

// Function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to get a new joke from the API
async function getJoke() {
    // Add fade-out effect
    jokeText.style.opacity = 0;
    emojiDisplay.style.opacity = 0;
    
    try {
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
        );
        const data = await response.json();
        
        setTimeout(() => {
            // Update joke and emoji
            jokeText.textContent = data.joke;
            emojiDisplay.textContent = getRandomItem(emojis);
            
            // Add fade-in effect
            jokeText.style.opacity = 1;
            emojiDisplay.style.opacity = 1;
        }, 300);
    } catch (error) {
        setTimeout(() => {
            jokeText.textContent = "Oops! Failed to fetch joke. Please try again! 😅";
            emojiDisplay.textContent = "😅";
            
            // Add fade-in effect
            jokeText.style.opacity = 1;
            emojiDisplay.style.opacity = 1;
        }, 300);
    }
}

// Add transition effects to elements
document.addEventListener('DOMContentLoaded', () => {
    jokeText.style.transition = 'opacity 0.3s ease';
    emojiDisplay.style.transition = 'opacity 0.3s ease';
    // Load initial joke
    getJoke();
});


