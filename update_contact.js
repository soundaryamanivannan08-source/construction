const fs = require('fs');
const files = ['index.html', 'about.html', 'service.html', 'blog.html', 'contact.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Pattern to match the contact info <ul>
    const oldContact = `<ul class="space-y-5 text-gray-400 text-sm">
                    <li class="flex items-start gap-4">
                        <i class="fa-solid fa-location-dot mt-1.5 text-primary text-base"></i>
                        <span class="leading-relaxed">123 Construction Way,<br>BuildCity, BC 56789</span>
                    </li>
                    <li class="flex items-center gap-4">
                        <i class="fa-solid fa-phone text-primary text-base"></i>
                        <span>+1 (234) 567-8900</span>
                    </li>
                    <li class="flex items-center gap-4">
                        <i class="fa-solid fa-envelope text-primary text-base"></i>
                        <span>info@stackly.com</span>
                    </li>
                </ul>`;

    const newContact = `<ul class="space-y-5 text-gray-400 text-sm">
                    <li class="flex items-start gap-4">
                        <i class="fa-solid fa-location-dot mt-1.5 text-primary text-base"></i>
                        <span class="leading-relaxed">MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008</span>
                    </li>
                    <li class="flex items-center gap-4">
                        <i class="fa-solid fa-phone text-primary text-base"></i>
                        <span>9876543210</span>
                    </li>
                    <li class="flex items-center gap-4">
                        <i class="fa-solid fa-envelope text-primary text-base"></i>
                        <span>info@stackly.com</span>
                    </li>
                </ul>`;

    // Regex replacement for flexibility in case of white space differences
    // But since they were copied and pasted directly, simple replacement should work.
    
    // First let's just do a string replacement
    let updatedContent = content.replace(oldContact, newContact);
    
    // Fallback if exact string match fails:
    if (updatedContent === content) {
        // Fallback replacement strategy
        updatedContent = updatedContent.replace(
            /<span class="leading-relaxed">123 Construction Way,<br>BuildCity, BC 56789<\/span>/g, 
            '<span class="leading-relaxed">MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008</span>'
        );
        updatedContent = updatedContent.replace(
            /<span>\+1 \(234\) 567-8900<\/span>/g, 
            '<span>9876543210</span>'
        );
    }
    
    fs.writeFileSync(f, updatedContent);
});
console.log('Update contact info finished.');
