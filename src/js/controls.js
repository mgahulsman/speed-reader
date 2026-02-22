let words = [];
let currentIndex = 0;
let isPlaying = false;
let timer = null;
const wpm = 400; 
const msPerWord = (60 / wpm) * 1000;
const filePath = '../text-files/test.txt';

async function init() {
    // Gebruikt de lader uit textLoader.js
    words = await fetchWords(filePath);
    if (words.length > 0) {
        displayWord("Ready?");
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
                // Toont het woord via de weergave-logica
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

/**
 * Navigeert naar het begin van de vorige of volgende zin.
 * @param {number} direction -1 voor vorige zin, 1 voor volgende zin.
 */
function navigateSentence(direction) {
    stopReader();
    if (words.length === 0) return;

    if (direction < 0) {
        // Zoek naar het einde van de zin vóór de huidige zin
        let i = currentIndex - 2; 
        while (i >= 0 && !/[.!?]$/.test(words[i])) {
            i--;
        }
        currentIndex = i + 1;
    } else {
        // Zoek naar het einde van de huidige zin
        let i = currentIndex;
        while (i < words.length - 1 && !/[.!?]$/.test(words[i])) {
            i++;
        }
        currentIndex = Math.min(words.length - 1, i + 1);
    }
    
    currentIndex = Math.max(0, currentIndex);
    displayWord(words[currentIndex]);
}

// Keybors control
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault(); 
            toggleReader();
            break;
        case 'ArrowLeft':
            if (e.shiftKey) {
                navigateSentence(-1);
            } else {
                navigate(-1);
            }
            break;
        case 'ArrowRight':
            if (e.shiftKey) {
                navigateSentence(1);
            } else {
                navigate(1);
            }
            break;
    }
});

document.body.addEventListener('click', () => {
    toggleReader();
});

init();