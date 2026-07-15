const fs = require('fs');
const files = ['index.html', 'about.html', 'service.html', 'blog.html', 'contact.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Use regex to match the anchor tag containing the fa-angle-up icon, ignoring whitespaces and newlines
    const regex = /<a href="404\.html" class="[^"]*fa-angle-up[^>]*>[\s\S]*?<\/a>/g;
    const regex2 = /<a[^>]*>\s*<i class="fa-solid fa-angle-up"><\/i>\s*<\/a>/g;
    
    let original = content;
    content = content.replace(regex2, '');
    
    // If regex2 didn't catch it, try matching the specific class string with whitespace tolerance
    const specificRegex = /<a href="404\.html" class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark mt-4 md:mt-0 hover:bg-yellow-400 transition shadow-lg">\s*<i class="fa-solid fa-angle-up"><\/i>\s*<\/a>/g;
    content = content.replace(specificRegex, '');
    
    if (original !== content) {
        console.log(`Replaced in ${f}`);
    } else {
        console.log(`No match in ${f}`);
    }
    
    fs.writeFileSync(f, content);
});
console.log('Update finished.');
