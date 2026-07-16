const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Dell/Downloads/construction-1/construction';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern 1: Navbar
    content = content.replace(
        /<div class="flex items-center gap-2 text-2xl font-bold">\s*<div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-dark text-xl">\s*<i class="fa-solid fa-layer-group"><\/i>\s*<\/div>\s*stackly\s*<\/div>/g,
        '<div class="flex items-center gap-2 text-2xl font-bold"><img src="assest/logo.1.webp" alt="Stackly Logo" class="h-10 w-auto object-contain"></div>'
    );

    // Pattern 2: Footer
    content = content.replace(
        /<div class="flex items-center gap-2 text-2xl font-bold text-white mb-6">\s*<div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-dark text-xl">\s*<i class="fa-solid fa-layer-group"><\/i>\s*<\/div>\s*stackly\s*<\/div>/g,
        '<div class="flex items-center gap-2 text-2xl font-bold text-white mb-6"><img src="assest/logo.1.webp" alt="Stackly Logo" class="h-10 w-auto object-contain rounded"></div>'
    );

    // Pattern 3: Login/Signup Desktop
    content = content.replace(
        /<div class="brand-logo">\s*<div class="brand-icon"><i class="fa-solid fa-layer-group"><\/i><\/div>\s*stackly\s*<\/div>/g,
        '<div class="brand-logo"><img src="assest/logo.1.webp" alt="Stackly Logo" style="height: 40px; width: auto; border-radius: 4px;"></div>'
    );

    // Pattern 4: Login/Signup Mobile
    content = content.replace(
        /<div class="mobile-logo">\s*<div class="brand-icon" style="width: 2rem; height: 2rem; font-size: 1rem;"><i class="fa-solid fa-layer-group"><\/i><\/div>\s*stackly\s*<\/div>/g,
        '<div class="mobile-logo"><img src="assest/logo.1.webp" alt="Stackly Logo" style="height: 32px; width: auto; border-radius: 4px;"></div>'
    );

    // Dashboard Navbar ?
    // Dashboard might have slightly different classes. Let's check user-dashboard.html
    // user-dashboard.html:55:                    <i class="fa-solid fa-layer-group"></i>

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done replacing logos');
