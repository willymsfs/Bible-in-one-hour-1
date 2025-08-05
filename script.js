let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${(idx - index) * 100}%)`;
  });
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

// Allow navigation through arrow keys
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Load the first slide
showSlide(currentSlide);