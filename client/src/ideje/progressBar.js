// Get DOM elements
const sliderContainer = document.querySelector('.slider-container');
const sliderThumb = document.getElementById('slider-thumb');
const sliderValue = document.getElementById('slider-value');
const sliderTrack = document.querySelector('.slider-track');

// Slider properties
const minValue = 0;
const maxValue = 100;
let isDragging = false;

// Update slider value and thumb position
function updateSlider(value) {
    const percent = ((value - minValue) / (maxValue - minValue)) * 100;
    sliderThumb.style.left = `${percent}%`;
    sliderValue.textContent = Math.round(value);
}

// Handle mouse/touch events
sliderThumb.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width)); // Clamp within track
        const percent = (offsetX / rect.width) * 100;
        const value = minValue + (percent / 100) * (maxValue - minValue);
        updateSlider(value);
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Handle touch events for mobile
sliderThumb.addEventListener('touchstart', () => {
    isDragging = true;
});

window.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        let offsetX = e.touches[0].clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width)); // Clamp within track
        const percent = (offsetX / rect.width) * 100;
        const value = minValue + (percent / 100) * (maxValue - minValue);
        updateSlider(value);
    }
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

// Initialize slider
updateSlider(50); // Set initial value