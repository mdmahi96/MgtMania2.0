document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const navMenu = document.getElementById('navMenu');
    const content = document.getElementById('content');
    
    // Initialize - show toggle button, hide close button at start
    if(mobileNavClose) {
        mobileNavClose.style.display = 'none';
    }
    
    // Handle screen size changes
    function handleResponsiveLayout() {
        // Get current screen width
        const screenWidth = window.innerWidth;
        
        // Define breakpoint for mobile (you can adjust this value)
        const mobileBreakpoint = 768; // Typically 768px is used for tablet/mobile breakpoint
        
        if(screenWidth <= mobileBreakpoint) {
            // Mobile view
            if(mobileNavToggle) mobileNavToggle.style.display = 'block';
            // Keep nav menu hidden initially on mobile
            if(navMenu) navMenu.classList.remove('active');
        } else {
            // Desktop view
            if(mobileNavToggle) mobileNavToggle.style.display = 'none';
            if(mobileNavClose) mobileNavClose.style.display = 'none';
            // Always show nav menu on desktop
            if(navMenu) navMenu.classList.add('active');
        }
    }
    
    // Run on page load
    handleResponsiveLayout();
    
    // Run on window resize
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Add overlay for mobile menu
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.id = 'menuOverlay';
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            this.classList.remove('active');
            mobileNavToggle.style.display = 'block';
            mobileNavClose.style.display = 'none';
        });
        document.body.appendChild(overlay);
        return overlay;
    }
    
    const menuOverlay = createOverlay();
    
    // Event listeners for mobile nav buttons
    if(mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            menuOverlay.classList.add('active');
            mobileNavToggle.style.display = 'none';
            mobileNavClose.style.display = 'block';
        });
    }
    
    if(mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            this.style.display = 'none';
            mobileNavToggle.style.display = 'block';
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fixed Event slider functionality
    const eventSlider = document.getElementById('eventSlider');
    const eventSlides = document.querySelectorAll('.event-slide');
    const eventDots = document.querySelectorAll('.slider-dots .dot');
    let eventCurrentSlide = 0;
    let eventSlideInterval;
    
    // Initialize event slider
    function initEventSlider() {
        if (eventSlides.length === 0) return;
        
        // Reset all slides
        eventSlides.forEach(slide => {
            slide.classList.remove('active');
            // Reset animation
            slide.style.animation = 'none';
            slide.offsetHeight; // Trigger reflow
            slide.style.animation = null;
        });
        
        // Update dots
        updateEventDots(0);
        
        // Activate first slide
        if (eventSlides[0]) {
            eventSlides[0].classList.add('active');
            // Set animation duration to match our 3 second interval
            eventSlides[0].style.animation = 'fadeSlide 3s forwards';
        }
        
        // Start automatic sliding
        startEventSlideInterval();
    }
    
    function updateEventDots(index) {
        // Update dots to reflect current slide
        eventDots.forEach(dot => dot.classList.remove('active'));
        if (eventDots[index]) {
            eventDots[index].classList.add('active');
        }
    }
    
    function showEventSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = eventSlides.length - 1;
        if (index >= eventSlides.length) index = 0;
        
        eventCurrentSlide = index;
        
        // Reset all slides
        eventSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.animation = 'none';
            slide.offsetHeight; // Trigger reflow
            slide.style.animation = null;
        });
        
        // Update dots
        updateEventDots(index);
        
        // Activate current slide with animation
        if (eventSlides[index]) {
            eventSlides[index].classList.add('active');
            eventSlides[index].style.animation = 'fadeSlide 3s forwards';
        }
        
        // Restart the interval timer
        startEventSlideInterval();
    }
    
    // Function to handle next slide
    function nextSlide() {
        showEventSlide((eventCurrentSlide + 1) % eventSlides.length);
    }
    
    // Function to handle previous slide
    function prevSlide() {
        showEventSlide((eventCurrentSlide - 1 + eventSlides.length) % eventSlides.length);
    }
    
    // Function to go to a specific slide
    function goToSlide(n) {
        showEventSlide(n);
    }
    
    // Start or restart the automatic slide interval
    function startEventSlideInterval() {
        // Clear any existing interval
        clearInterval(eventSlideInterval);
        // Set new interval - 3 seconds as requested
        eventSlideInterval = setInterval(nextSlide, 3000);
    }
    
    // Handle user interaction - pause when user interacts
    if (eventSlider) {
        eventSlider.addEventListener('mouseenter', function() {
            clearInterval(eventSlideInterval);
        });
        
        eventSlider.addEventListener('mouseleave', function() {
            startEventSlideInterval();
        });
    }
    
    // Make functions available globally
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.goToSlide = goToSlide;
    
    // Initialize event slider
    initEventSlider();
    
    // Reveal animation on scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.card');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('reveal', 'active');
            }
        }
    }
    
    // Add reveal class to all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for elements in view
    revealOnScroll();
});