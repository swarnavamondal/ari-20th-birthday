let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;



function updateSlider() {
    images.forEach((img, index) => {
        img.classList.remove('active', 'prev-2', 'prev-1', 'next-1', 'next-2', 'hidden');

        let diff = (index - currentIndex);

        // Adjust for cyclic wrap-around
        if (diff > totalImages / 2) {
            diff -= totalImages;
        } else if (diff < -totalImages / 2) {
            diff += totalImages;
        }

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
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
}


// Scroll and Swipe Navigation
const sliderContainer = document.querySelector('.slider-container');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startTime = 0;

// Prevent default context menu on long press
window.oncontextmenu = function (event) {
    if (event.target.closest('.slider-container')) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}

// Touch events
// Touch events
sliderContainer.addEventListener('touchstart', touchStart);
sliderContainer.addEventListener('touchend', touchEnd);
sliderContainer.addEventListener('touchmove', touchMove);

// Mouse events
sliderContainer.addEventListener('mousedown', touchStart);
sliderContainer.addEventListener('mouseup', touchEnd);
sliderContainer.addEventListener('mouseleave', () => {
    if (isDragging) touchEnd();
});
sliderContainer.addEventListener('mousemove', touchMove);

// Wheel event
sliderContainer.addEventListener('wheel', handleWheel);

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    currentTranslate = startPos; // Initialize to avoid jump on click
    startTime = new Date().getTime();
    sliderContainer.style.cursor = 'grabbing';
}

function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - startPos;
    const timeElapsed = new Date().getTime() - startTime;

    // Threshold for swipe
    // Check movedBy is not 0 (to prevent clicks triggering slides)
    // Lowered threshold to 30 for better responsiveness
    if (movedBy !== 0 && (Math.abs(movedBy) > 30 || (Math.abs(movedBy) > 10 && timeElapsed < 200))) {
        if (movedBy < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }

    sliderContainer.style.cursor = 'grab';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = currentPosition;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}


let isThrottled = false;
function handleWheel(event) {
    // Determine if horizontal scroll is dominant
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault(); // Prevent browser back/forward or horizontal scroll

        if (isThrottled) return;

        // Low threshold for immediate response
        if (Math.abs(event.deltaX) > 5) {
            if (event.deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }

            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, 500); // Cooldown to match transition or prevent rapid firing
        }
    }
}


// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Click navigation for images
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        if (currentIndex !== index) {
            currentIndex = index;
            updateSlider();
        }
    });
});

// Initialize slider
updateSlider();
