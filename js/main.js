// =============================
// 🌟 MindDesk Main JS
// =============================

// Typewriter Effect
const typewriterText = document.getElementById('typewriter-text');
const welcomeMessage = "Welcome to MindDesk";
let i = 0;

function typeWriter() {
  if (i < welcomeMessage.length) {
    typewriterText.innerHTML += welcomeMessage.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Live Date, Time, and Timezone
function updateClockAndDate() {
  const now = new Date();

  const dateString = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('date').innerText = dateString;

  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').innerText = timeString;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById('timezone').innerText = `Time Zone: ${timeZone}`;
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// Daily Quote
const quotes = [
  "Believe you can and you're halfway there.",
  "The best way to predict the future is to create it.",
  "You are capable of amazing things.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Every day is a fresh start."
];

function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("daily-quote").innerText = quote;
}
showRandomQuote();
