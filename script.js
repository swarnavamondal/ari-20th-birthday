let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pagination = document.getElementById('pagination');

function updateSlider() {
    images.forEach((img, index) => {
        img.classList.remove('active', 'prev-2', 'prev-1', 'next-1', 'next-2', 'hidden');
        
        const diff = index - currentIndex;
        
        if (diff === 0) {
            img.classList.add('active');
        } else if (diff === -2) {
            img.classList.add('prev-2');
        } else if (diff === -1) {
            img.classList.add('prev-1');
        } else if (diff === 1) {
            img.classList.add('next-1');
        } else if (diff === 2) {
            img.classList.add('next-2');
        } else {
            img.classList.add('hidden');
        }
    });
    
    pagination.textContent = `${currentIndex + 1} / ${totalImages}`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize slider
updateSlider();
