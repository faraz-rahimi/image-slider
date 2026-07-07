const images = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
];

const slideTrack = document.querySelector(".slide-track");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;
let isAnimating = false;

const dots = images.map((src, index) => {
  const slide = document.createElement("img");
  slide.src = src;
  slide.alt = `Slide ${index + 1}`;
  slideTrack.appendChild(slide);

  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
  return dot;
});

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function updateTrack() {
  slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToSlide(index) {
  if (isAnimating || index === currentIndex) return;
  isAnimating = true;
  currentIndex = index;
  updateDots();
  updateTrack();
}

slideTrack.addEventListener("transitionend", (event) => {
  if (event.target !== slideTrack) return;
  isAnimating = false;
});

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateDots();
  updateTrack();
});

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex + 1) % images.length;
  updateDots();
  updateTrack();
}

const autoSlide = setInterval(nextSlide, 3000);

slideTrack.addEventListener("mouseover", () => {
  clearInterval(autoSlide);
});

updateDots();
updateTrack();
