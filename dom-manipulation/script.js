let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" }
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>Category: ${randomQuote.category}</em></p>`;
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    showRandomQuote();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and a category!");
  }
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Initial random quote
showRandomQuote();
