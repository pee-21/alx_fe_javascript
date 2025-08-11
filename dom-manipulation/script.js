// Global quotes array
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
    const newQuote = {
      text: quoteText,
      category: quoteCategory
    };

    quotes.push(newQuote);

    // Optional: show the newly added quote
    const display = document.getElementById("quoteDisplay");
    display.innerHTML = `
      <p>"${newQuote.text}"</p>
      <small>Category: ${newQuote.category}</small>
    `;
  }
}
 
// Event listener for random quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// NOTE: The following is ONLY needed if the button uses addEventListener
// But if you are using `<button onclick="addQuote()">` in HTML, do not add this line:
// document.getElementById("addQuote").addEventListener("click", addQuote);

let quotes = [];

// Load quotes from localStorage or initialize with default quotes
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "Stay hungry, stay foolish.", category: "Inspiration" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
    ];
    saveQuotes(); // Save initial defaults
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Restore last viewed quote from sessionStorage
function showLastViewedQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    const display = document.getElementById("quoteDisplay");
    display.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  }
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both the quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes(); // Save to localStorage

  // Optionally display the new quote
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p>"${newQuote.text}"</p>
    <small>Category: ${newQuote.category}</small>
  `;

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote(); // Show a new random quote after import
      } else {
        alert("Invalid JSON format.");
      }
    } catch (e) {
      alert("Error parsing file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Load quotes and restore last viewed quote (if available)
loadQuotes();
showLastViewedQuote();



let quotes = [];

// Load quotes from localStorage or use defaults
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "Stay hungry, stay foolish.", category: "Inspiration" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
    ];
    saveQuotes();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate category dropdown based on current quotes
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  const dropdown = document.getElementById("categoryFilter");

  // Clear existing options except 'All'
  dropdown.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  }

  );

  // Restore previously selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    dropdown.value = savedCategory;
    filterQuotes();
  }
}

// Filter quotes by selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filtered = quotes;
  if (selectedCategory !== "all") {
    filtered = quotes.filter(q => q.category === selectedCategory);
  }

  const display = document.getElementById("quoteDisplay");
  if (filtered.length === 0) {
    display.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  display.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Add new quote and update category dropdown if needed
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  populateCategories(); // Update dropdown
  filterQuotes(); // Show filtered quotes including the new one
}

// Show random quote (ignoring filter)
function showRandomQuote() {
  if (quotes.length === 0) return;

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Export quotes as JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (e) {
      alert("Error parsing file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// On page load
window.onload = () => {
  loadQuotes();
  populateCategories();
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  }
};

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);



let quotes = [];

// Load from localStorage or defaults
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      { text: "Stay hungry, stay foolish.", category: "Inspiration" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
    ];
    saveQuotes();
  }
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display quote
function showQuote(quote) {
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

// Show random quote (filtered)
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filtered = quotes;
  if (selectedCategory !== "all") {
    filtered = quotes.filter(q => q.category === selectedCategory);
  }

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  showQuote(randomQuote);
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Populate dropdown
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  dropdown.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCats = [...new Set(quotes.map(q => q.category))];
  uniqueCats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });

  const lastSelected = localStorage.getItem("selectedCategory");
  if (lastSelected) {
    dropdown.value = lastSelected;
    filterQuotes();
  }
}

// Add quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export quotes
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (e) {
      alert("Error parsing file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// 🛰️ Simulate fetch from server
function syncWithServer() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      // Simulate new server quotes using 'title' as text, 'userId' as category
      const serverQuotes = data.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server-" + post.userId
      }));

      let newCount = 0;
      serverQuotes.forEach(sq => {
        const exists = quotes.some(local => local.text === sq.text && local.category === sq.category);
        if (!exists) {
          quotes.push(sq);
          newCount++;
        }
      });

      if (newCount > 0) {
        saveQuotes();
        populateCategories();
        filterQuotes();
        notify(`📡 Synced ${newCount} new quotes from server.`);
      }
    })
    .catch(err => {
      notify("⚠️ Sync failed: " + err.message);
    });
}

// 🛎 Notify user
function notify(message) {
  let bar = document.getElementById("notification");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "notification";
    bar.style.position = "fixed";
    bar.style.bottom = "10px";
    bar.style.right = "10px";
    bar.style.background = "#333";
    bar.style.color = "#fff";
    bar.style.padding = "10px 15px";
    bar.style.borderRadius = "5px";
    bar.style.zIndex = "1000";
    document.body.appendChild(bar);
  }
  bar.textContent = message;
  setTimeout(() => { bar.remove(); }, 4000);
}

// Setup
window.onload = () => {
  loadQuotes();
  populateCategories();

  const last = sessionStorage.getItem("lastQuote");
  if (last) showQuote(JSON.parse(last));

  // Start periodic sync every 30 seconds
  syncWithServer();
  setInterval(syncWithServer, 30000);
};

// Event listeners
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);



