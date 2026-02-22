/* This file:
    1. Loads a .txt
    2. Shows every word 0.x seconds, the input will be given in: words per minute
*/

const target = document.getElementById('word-target');
const wpm = 300; 
const msPerWord = (60 / wpm) * 1000;
const filePath = '../text-files/test.txt';

async function startReader() {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Bestand niet gevonden");
        
        const text = await response.text();
        const words = text.trim().split(/\s+/);
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < words.length) {
                displayWord(words[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, msPerWord);

    } catch (error) {
        target.innerHTML = "Fout bij laden van tekst.";
        console.error(error);
    }
}

function displayWord(word) {
    const middleIndex = Math.floor(word.length / 2);
    const leftPart = word.substring(0, middleIndex);
    const middleLetter = word.substring(middleIndex, middleIndex + 1);
    const rightPart = word.substring(middleIndex + 1);

    target.innerHTML = `
        <span class="side left">${leftPart}</span>
        <span class="middle-letter">${middleLetter}</span>
        <span class="side right">${rightPart}</span>
    `;
}

startReader();