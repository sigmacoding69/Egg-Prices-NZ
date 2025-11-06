// Slideshow JavaScript
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = 12;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    
    document.getElementById('counter').textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
}

function nextSlide() { 
    showSlide(currentSlide + 1); 
}

function previousSlide() { 
    showSlide(currentSlide - 1); 
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    else if (e.key === 'ArrowLeft') previousSlide();
});

showSlide(0);