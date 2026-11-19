// Set the footer year automatically.
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle the mobile navigation.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

// Close the mobile menu after a navigation link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  });
});

// Reveal content as it scrolls into view.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  // Show content immediately in browsers without IntersectionObserver.
  revealItems.forEach((item) => item.classList.add("visible"));
}
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js");
}


// Variable to store the install event
let deferredPrompt;

// Cache the install button element
const installBtn = document.getElementById('pwaInstallBtn');

// 1. Listen for the native PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome from automatically showing the default mini-infobar
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Show your custom "Install App" button in the portfolio UI
  if (installBtn) {
    installBtn.style.display = 'inline-flex'; // or 'block', matching your button layout
  }
});

// 2. Attach the click listener ONCE outside the event handler
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Trigger the native browser install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // We no longer need the prompt, clear it out
    deferredPrompt = null;

    // Hide the install button
    installBtn.style.display = 'none';
  });
}

// 3. Hide the button if the app is already installed
window.addEventListener('appinstalled', () => {
  if (installBtn) {
    installBtn.style.display = 'none';
  }
  deferredPrompt = null;
  console.log('PWA was successfully installed');
});
