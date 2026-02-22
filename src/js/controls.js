let words = [];
let currentIndex = 0;
let isPlaying = false;
let timer = null;
const wpm = 400; 
const msPerWord = (60 / wpm) * 1000;
const filePath = '../text-files/test.txt';

async function init() {
    words = await fetchWords(filePath);
    if (words.length > 0) {
        displayWord("Ready?")
    }
}

function toggleReader() {
    if (isPlaying) {
        clearInterval(timer);
        isPlaying = false;
    } else {
        if (words.length === 0) return;
        isPlaying = true;
        timer = setInterval(() => {
            if (currentIndex < words.length) {
                displayWord(words[currentIndex]);
                currentIndex++;
            } else {
                stopReader();
            }
        }, msPerWord);
    }
}

function stopReader() {
    clearInterval(timer);
    isPlaying = false;
}

function navigate(direction) {
    stopReader();
    currentIndex = Math.max(0, Math.min(words.length - 1, currentIndex + direction));
    displayWord(words[currentIndex]);
}

// Toetsenbord bediening
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault(); // Voorkom scrollen
            toggleReader();
            break;
        case 'ArrowLeft':
            navigate(-1);
            break;
        case 'ArrowRight':
            navigate(1);
            break;
    }
});

// Mobiele klik bediening
document.body.addEventListener('click', () => {
    toggleReader();
});

init();