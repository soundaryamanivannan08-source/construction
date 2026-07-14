document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const hamburgerBtn = document.querySelector('nav button.lg\\:hidden');
    
    if (!hamburgerBtn || !nav) return;

    // Create the mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-darker/98 backdrop-blur-md z-40 hidden flex-col items-center justify-center space-y-8 transition-opacity duration-300 opacity-0';
    
    // Clone links from desktop menu
    const desktopLinksContainer = document.querySelector('nav .lg\\:flex.items-center');
    if (desktopLinksContainer) {
        const links = desktopLinksContainer.querySelectorAll('a');
        links.forEach(link => {
            const newLink = link.cloneNode(true);
            newLink.className = 'text-white text-2xl font-medium hover:text-primary transition';
            mobileMenu.appendChild(newLink);
        });
    }

    // Clone Auth button
    const authBtnContainer = document.getElementById('auth-btn-container');
    const authBtn = authBtnContainer ? authBtnContainer.querySelector('a') : null;
    if (authBtn) {
        const newAuthBtn = authBtn.cloneNode(true);
        newAuthBtn.className = 'bg-primary text-dark px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition inline-flex items-center gap-2 mt-4 text-xl';
        mobileMenu.appendChild(newAuthBtn);
    }

    // Append to body
    document.body.appendChild(mobileMenu);

    // Toggle menu
    let isMenuOpen = false;
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent body click from immediately closing it
        isMenuOpen = !isMenuOpen;
        
        // Toggle Icon
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }

        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            // small delay to allow display:block to apply before changing opacity
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
            }, 10);
            
            // Bring hamburger to front
            hamburgerBtn.style.position = 'relative';
            hamburgerBtn.style.zIndex = '50';
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300); // match duration-300
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburgerBtn.click();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Stat Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter); // only animate once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar Background on Scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        navbar.classList.add('transition-all', 'duration-300');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-darker', 'shadow-lg');
                navbar.classList.remove('bg-transparent', 'border-b', 'border-white/20');
            } else {
                navbar.classList.add('bg-transparent', 'border-b', 'border-white/20');
                navbar.classList.remove('bg-darker', 'shadow-lg');
            }
        });
    }
});
