// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryDots = document.querySelectorAll('.gallery-dots .dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentGalleryImage = 0;
    let galleryInterval;
    let userInteraction = false;

    // Initial setup to make sure first image shows properly
    showGalleryImage(0);

    function showGalleryImage(n, isUserInteraction = false) {
        // Update current index
        currentGalleryImage = n;
        userInteraction = isUserInteraction;
        
        // Reset all images
        galleryImages.forEach(image => {
            image.classList.remove('active');
        });
        
        // Reset all dots
        galleryDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Reset all thumbnails
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Make sure n is within bounds
        if (n >= galleryImages.length) {
            currentGalleryImage = 0;
        } else if (n < 0) {
            currentGalleryImage = galleryImages.length - 1;
        }
        
        // Display the current image and activate corresponding indicators
        galleryImages[currentGalleryImage].classList.add('active');
        
        // Check if elements exist before adding class
        if (galleryDots[currentGalleryImage]) {
            galleryDots[currentGalleryImage].classList.add('active');
        }
        
        if (thumbnails[currentGalleryImage]) {
            thumbnails[currentGalleryImage].classList.add('active');
            
            // Only scroll the thumbnail into view if this is from user interaction
            if (isUserInteraction) {
                thumbnails[currentGalleryImage].scrollIntoView({ 
                    behavior: 'smooth', 
                    inline: 'center', 
                    block: 'nearest' 
                });
            }
        }
    }

    function nextGalleryImage(isUserInteraction = false) {
        showGalleryImage(currentGalleryImage + 1, isUserInteraction);
    }

    function prevGalleryImage(isUserInteraction = false) {
        showGalleryImage(currentGalleryImage - 1, isUserInteraction);
    }

    function goToGalleryImage(n) {
        showGalleryImage(n, true); // User explicitly selected this image
    }

    // Override the global functions to track user interaction
    window.nextGalleryImage = function() {
        nextGalleryImage(true);
    };
    
    window.prevGalleryImage = function() {
        prevGalleryImage(true);
    };
    
    window.goToGalleryImage = goToGalleryImage;

    // Start auto-advance gallery
    startGalleryInterval();

    function startGalleryInterval() {
        // Clear any existing interval first
        if (galleryInterval) {
            clearInterval(galleryInterval);
        }
        galleryInterval = setInterval(() => nextGalleryImage(false), 2000);
    }

    // Pause auto-advance when user interacts with gallery
    const galleryElement = document.querySelector('.gallery');
    if (galleryElement) {
        galleryElement.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });

        // Resume auto-advance when user stops interacting
        galleryElement.addEventListener('mouseleave', () => {
            startGalleryInterval();
        });
    }

    // Add keyboard navigation for the gallery
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevGalleryImage(true);
        } else if (e.key === 'ArrowRight') {
            nextGalleryImage(true);
        }
    });
    
    // Add click handlers to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            goToGalleryImage(index);
        });
    });
});