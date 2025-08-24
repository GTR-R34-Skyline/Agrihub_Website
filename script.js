// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    navMenu.classList.remove("show");
  });
});

// Pest diagnosis simulation
function diagnosePest() {
  const pests = ["Stem Borer 🐛", "Brown Plant Hopper 🦗", "Armyworm 🐜"];
  const random = pests[Math.floor(Math.random() * pests.length)];
  document.getElementById("pestResult").textContent =
    "Likely pest detected: " + random;
}

// Analytics chart (basic bar chart)
const canvas = document.getElementById("cropChart");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const crops = ["Wheat", "Paddy", "Tomato", "Onion"];
  const values = [80, 65, 90, 50];

  ctx.fillStyle = "#5bd17d";
  values.forEach((val, i) => {
    ctx.fillRect(80 + i*150, 250 - val*2, 80, val*2);
    ctx.fillText(crops[i], 80 + i*150, 280);
  });

  ctx.fillStyle = "#fff";
  ctx.font = "14px Inter";
  ctx.fillText("Crop Yield Index", 10, 20);
}

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Fade-in on scroll observer
const fadeElements = document.querySelectorAll('.fade-in, section, footer > .container');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach(el => observer.observe(el));
