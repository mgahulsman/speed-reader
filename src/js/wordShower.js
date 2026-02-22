const target = document.getElementById('word-target');

function displayWord(word) {
    if (!word) return;
    
    const orpIndex = Math.floor(word.length / 3); 
    const leftPart = word.substring(0, orpIndex);
    const middleLetter = word.substring(orpIndex, orpIndex + 1);
    const rightPart = word.substring(orpIndex + 1);

    target.innerHTML = `
        <span class="side left">${leftPart}</span>
        <span class="middle-letter">${middleLetter}</span>
        <span class="side right">${rightPart}</span>
    `;
}