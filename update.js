const fs = require('fs');
const files = ['index.html', 'about.html', 'service.html', 'blog.html', 'contact.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Fix footer logo
    const oldLogo = '<div class="flex items-center gap-2 text-2xl font-bold text-white mb-6"><img src="assest/logo.1.webp" alt="Stackly Logo" class="h-10 w-auto object-contain rounded"></div>';
    const newLogo = '<div class="flex items-center gap-2 text-2xl font-bold text-white mb-6"><a href="index.html"><img src="assest/logo.1.webp" alt="Stackly Logo" class="h-10 w-auto object-contain rounded"></a></div>';
    
    content = content.replace(oldLogo, newLogo);
    
    if (f === 'service.html') {
        content = content.replace(
            `<li><a href="404.html" class="hover:text-primary transition duration-300">Home</a></li>
                    <li><a href="404.html" class="hover:text-primary transition duration-300">About Us</a></li>
                    <li><a href="404.html" class="hover:text-primary transition duration-300">Services</a></li>
                    <li><a href="404.html" class="hover:text-primary transition duration-300">Blog</a></li>
                    <li><a href="404.html" class="hover:text-primary transition duration-300">Contact</a></li>`,
            `<li><a href="index.html" class="hover:text-primary transition duration-300">Home</a></li>
                    <li><a href="about.html" class="hover:text-primary transition duration-300">About Us</a></li>
                    <li><a href="service.html" class="hover:text-primary transition duration-300">Services</a></li>
                    <li><a href="blog.html" class="hover:text-primary transition duration-300">Blog</a></li>
                    <li><a href="contact.html" class="hover:text-primary transition duration-300">Contact</a></li>`
        );
    }
    
    fs.writeFileSync(f, content);
});
console.log('Update script finished.');
