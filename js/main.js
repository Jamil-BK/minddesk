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

  // Date
  const dateString = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('date').innerText = dateString;

  // Time
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').innerText = timeString;

  // Time Zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById('timezone').innerText = `Time Zone: ${timeZone}`;
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate(); // run once immediately
