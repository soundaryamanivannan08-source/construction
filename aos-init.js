document.addEventListener("DOMContentLoaded", function() {
    // Dynamically add AOS attributes to key elements for a smooth experience
    // without risking layout breakage from hardcoded HTML changes.
    
    // 1. Headings
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(h => {
        if(!h.hasAttribute('data-aos')) {
            h.setAttribute('data-aos', 'fade-down');
        }
    });

    // 2. Main sections, cards, and grid items
    // We target common structural classes like grids, flex rows, and white box cards
    const gridItems = document.querySelectorAll('section .grid > div, footer .grid > div, .bg-white.rounded-xl, .bg-white.rounded-2xl');
    gridItems.forEach((item, index) => {
        if(!item.hasAttribute('data-aos')) {
            item.setAttribute('data-aos', 'fade-up');
            // Stagger delay based on index for a cascading effect
            item.setAttribute('data-aos-delay', (index % 5) * 100);
        }
    });

    // 3. Images and prominent graphic elements
    const images = document.querySelectorAll('img:not(.logo):not([class*="h-10"])');
    images.forEach(img => {
        if(!img.hasAttribute('data-aos')) {
            img.setAttribute('data-aos', 'zoom-in');
            img.setAttribute('data-aos-duration', '1000');
        }
    });

    // Initialize AOS
    AOS.init({
        once: true,       // whether animation should happen only once - while scrolling down
        offset: 50,       // offset (in px) from the original trigger point
        duration: 800,    // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic', // default easing for AOS animations
    });
});
