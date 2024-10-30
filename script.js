document.getElementById('searchBtn').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value.trim(); // Trim whitespace
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!word) {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        resultDiv.style.display = 'block'; // Show message
        return;
    }

    resultDiv.style.display = 'block';

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            if (!data.length) {
                resultDiv.innerHTML = '<p>No definitions found.</p>';
                return;
            }
            resultDiv.innerHTML = `<h2>${data[0].word}</h2>`;
            data[0].meanings.forEach(meaning => {
                meaning.definitions.forEach(definition => {
                    resultDiv.innerHTML += `<p><strong>Definition:</strong> ${definition.definition}</p>`;
                });
            });
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
});

// Word of the Day feature
const wordsOfTheDay = [
    { word: "Serendipity", definition: "The occurrence and development of events by chance in a happy or beneficial way." },
    { word: "Euphoria", definition: "A feeling or state of intense excitement and happiness." },
    { word: "Ephemeral", definition: "Lasting for a very short time." },
    { word: "Quintessential", definition: "Representing the most perfect or typical example of a quality or class." },
    { word: "Lugubrious", definition: "Looking or sounding sad and dismal." },
    { word: "Benevolent", definition: "Well meaning and kindly." },
    { word: "Melancholy", definition: "A deep, persistent sadness." },
    { word: "Ineffable", definition: "Too great or extreme to be expressed in words." },
    { word: "Epiphany", definition: "A moment of sudden revelation or insight." },
    { word: "Luminous", definition: "Emitting or reflecting light; shining." },
    { word: "Petrichor", definition: "The pleasant, earthy smell after rain." },
    { word: "Solitude", definition: "The state of being alone." },
    { word: "Ambivalent", definition: "Having mixed feelings or contradictory ideas about something." },
    { word: "Cacophony", definition: "A harsh, discordant mixture of sounds." },
    { word: "Oblivion", definition: "The state of being unaware or unconscious of what is happening." },
    { word: "Resilience", definition: "The capacity to recover quickly from difficulties." },
    // Add more words and definitions as needed
];

// Function to set Word of the Day
function setWordOfTheDay() {
    const currentDate = new Date();
    const storedDate = localStorage.getItem('wordOfTheDayDate');
    const wordIndex = Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24)) % wordsOfTheDay.length;

    if (!storedDate || new Date(storedDate).getDate() !== currentDate.getDate()) {
        localStorage.setItem('wordOfTheDay', JSON.stringify(wordsOfTheDay[wordIndex]));
        localStorage.setItem('wordOfTheDayDate', currentDate.toISOString()); // Store as ISO string
    }
}

// Display the Word of the Day
function displayWordOfTheDay() {
    const wordOfTheDay = JSON.parse(localStorage.getItem('wordOfTheDay'));
    if (wordOfTheDay) {
        const wordOfTheDayDiv = document.createElement('div');
        wordOfTheDayDiv.classList.add('word-of-the-day');
        wordOfTheDayDiv.innerHTML = `
            <h2>Word of the Day</h2>
            <h3>${wordOfTheDay.word}</h3>
            <p><strong>Definition:</strong> ${wordOfTheDay.definition}</p>
        `;
        document.querySelector('.startup-container').insertBefore(wordOfTheDayDiv, document.querySelector('.input-container'));
    }
}

// Initialize the Word of the Day
setWordOfTheDay();
displayWordOfTheDay();