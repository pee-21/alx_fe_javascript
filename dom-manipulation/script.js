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

// Load quotes from local storage or defaults
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [
    { text: "Stay hungry, stay foolish.", category: "Inspiration" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
  ];
  saveQuotes();
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Add quote to UI and storage
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) return alert("Both fields are required.");

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  postQuoteToServer(newQuote);
  populateCategories();
  filterQuotes();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Post to mock server
function postQuoteToServer(quote) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify({
      title: quote.text,
      body: quote.category,
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => notify("Quote posted to server (simulated)."))
    .catch(() => notify("Failed to post quote to server."));
}

// Fetch quotes from server (mock)
function fetchQuotesFromServer() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      const serverQuotes = data.slice(0, 5).map(item => ({
        text: item.title,
        category: "Server-" + item.userId
      }));
      return serverQuotes;
    });
}

// Sync logic: server data overwrites local on conflict
function syncQuotes() {
  fetchQuotesFromServer().then(serverQuotes => {
    let newCount = 0;
    serverQuotes.forEach(serverQuote => {
      const exists = quotes.some(q => q.text === serverQuote.text && q.category === serverQuote.category);
      if (!exists) {
        quotes.push(serverQuote);
        newCount++;
      }
    });

    if (newCount > 0) {
      saveQuotes();
      populateCategories();
      filterQuotes();
      notify(`Synced ${newCount} new quotes from server.`);
    }
  }).catch(() => {
    notify("Sync failed: could not reach server.");
  });
}

// Populate dropdown categories
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  dropdown.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    dropdown.value = savedCategory;
    filterQuotes();
  }
}

// Filter and display
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  const filtered = selected === "all" ? quotes : quotes.filter(q => q.category === selected);
  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
    return;
  }
  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Export to JSON
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import from JSON
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      }
    } catch {
      alert("Invalid file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Notify UI
function notify(msg) {
  let bar = document.getElementById("notification");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "notification";
    bar.style.position = "fixed";
    bar.style.bottom = "10px";
    bar.style.right = "10px";
    bar.style.background = "#222";
    bar.style.color = "#fff";
    bar.style.padding = "10px";
    bar.style.borderRadius = "5px";
    bar.style.zIndex = "9999";
    document.body.appendChild(bar);
  }
  bar.textContent = msg;
  setTimeout(() => bar.remove(), 4000);
}

// Init
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

  syncQuotes(); // Initial sync
  setInterval(syncQuotes, 30000); // Periodic sync every 30s
};

// Event Listeners
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);


