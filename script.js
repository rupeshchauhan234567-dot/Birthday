let currentStep = 1;
const totalSteps = 7;
let userName = "My Sweet Sister";

/* Initialize particles.js */
particlesJS("particles-js", {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: "#f06292" },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true },
    size: { value: 6, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#f8bbd0",
      opacity: 0.4,
      width: 1.5,
    },
    move: { enable: true, speed: 1.5, random: true, out_mode: "out" },
  },
});

/* Show step */
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
  createPetals();
});

/* Next Step */
function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

/* Save Name */
function saveName() {
  const input = document.getElementById("nameInput").value.trim();
  if (input) {
    userName = input;
    document.getElementById("displayName").textContent = userName;
    document.getElementById("finalName").textContent = userName;
    document.getElementById("heartName").textContent = userName;
    nextStep();
  } else {
    alert("Please enter your name, my lovely sister 💖");
  }
}

/* Show Step Function */
function showStep(step) {
  document
    .querySelectorAll(".step")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(`step${step}`).classList.add("active");
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  gsap.to("#progressBar", {
    width: `${progress}%`,
    duration: 1,
    ease: "power2.out",
  });

  if (step === 4) typeMessage();
  if (step === 6) createFireworks();
}

/* Floating Hearts */
function createHearts() {
  const container = document.getElementById("floatingHearts");
  const colors = ["#ff4081", "#f06292", "#f8bbd0", "#d81b60", "#ff80ab"];
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    heart.style.fontSize = `${20 + Math.random() * 25}px`;
    heart.style.top = `${60 + Math.random() * 30}%`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
  gsap.to(".heart", { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 });
}

/* Petals */
function createPetals() {
  const container = document.getElementById("petalsContainer");
  const petalColors = ["#ffcdd2", "#f8bbd0", "#fce4ec", "#f48fb1"];
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    const shapes = [
      "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0",
      "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0",
      "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0",
    ];
    const petalShape = shapes[Math.floor(Math.random() * 3)];
    petal.style.width = `${10 + Math.random() * 20}px`;
    petal.style.height = `${10 + Math.random() * 20}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.top = "-20px";
    petal.innerHTML = `<svg viewBox="0 0 100 50" width="100%" height="100%"><path d="${petalShape}" fill="${
      petalColors[Math.floor(Math.random() * petalColors.length)]
    }"/></svg>`;
    container.appendChild(petal);
    gsap.to(petal, {
      y: window.innerHeight + 50,
      x: `+=${50 + Math.random() * 100}`,
      rotation: 360,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 15,
      ease: "none",
      onComplete: () => petal.remove(),
    });
  }
}

/* Typing message */
function typeMessage() {
  const messages = [
    `Dear ${userName} 💖`,
    "You are not just my sister...",
    "You are my best friend and my strength 🤍",
    "Your smile makes everything feel better 😊",
    "Your happiness means the world to me 🌸",
    "I am always here for you, no matter what 🛡️",
    "May all your dreams come true 💫",
    "Never stop being this wonderful person 💕",
    "Happy Birthday, Meri pyaari Moti 🎂💖",
  ];
  const typingText = document.getElementById("typingText");
  let mIndex = 0,
    charIndex = 0,
    isDeleting = false,
    typingSpeed = 100;
  function type() {
    const currentMessage = messages[mIndex];
    if (isDeleting) {
      typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    if (!isDeleting && charIndex === currentMessage.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      mIndex = (mIndex + 1) % messages.length;
      typingSpeed = 500;
    }
    setTimeout(type, typingSpeed);
  }
  setTimeout(
    () => document.getElementById("typedMessage").classList.add("show"),
    500
  );
  type();
}

/* Fireworks */
function createFireworks() {
  const colors = [
    "#ff4081",
    "#f06292",
    "#f8bbd0",
    "#d81b60",
    "#ff80ab",
    "#ffcdd2",
  ];
  for (let i = 0; i < 8; i++) setTimeout(() => firework(colors), i * 800);
  setInterval(() => {
    if (Math.random() > 0.7) firework(colors);
  }, 2000);
}
function firework(colors) {
  const fw = document.createElement("div");
  fw.classList.add("firework");
  fw.style.color = colors[Math.floor(Math.random() * colors.length)];
  fw.style.setProperty("--x", `${Math.random() * window.innerWidth}px`);
  fw.style.setProperty("--y", `${Math.random() * window.innerHeight * 0.8}px`);
  fw.style.setProperty("--x-end", `${(Math.random() - 0.5) * 20}px`);
  fw.style.setProperty("--y-end", `${(Math.random() - 0.5) * 20}px`);
  document.body.appendChild(fw);
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.classList.add("firework-particle");
      p.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      p.style.left = fw.style.getPropertyValue("--x");
      p.style.top = fw.style.getPropertyValue("--y");
      p.style.setProperty("--tx", `${Math.cos((Math.PI * 2 * i) / 30) * 80}px`);
      p.style.setProperty("--ty", `${Math.sin((Math.PI * 2 * i) / 30) * 80}px`);
      document.body.appendChild(p);
      gsap.to(p, {
        x: `var(--tx)`,
        y: `var(--ty)`,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
    fw.remove();
  }, 400);
}

/* Social Share */
function shareOnSocial(platform) {
  let url = window.location.href;
  if (platform === "facebook")
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  if (platform === "twitter")
    window.open(
      `https://twitter.com/intent/tweet?text=Happy%20Birthday%20${userName}!&url=${url}`,
      "_blank"
    );
  if (platform === "whatsapp")
    window.open(
      `https://api.whatsapp.com/send?text=Happy%20Birthday%20${userName}!%20Check%20this%20out:%20${url}`,
      "_blank"
    );
}
