const fs = require('fs');
const path = require('path');

const directory = './';
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

const headInjection = `
    <!-- AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <style>
        /* Prevent overflow issues caused by AOS animations */
        html, body {
            overflow-x: hidden;
            width: 100%;
        }
    </style>
`;

const bodyInjection = `
    <!-- AOS JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="aos-init.js"></script>
`;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Check if already injected to avoid duplicates
    if (!content.includes('aos@2.3.1/dist/aos.css')) {
        // Inject right before </head>
        content = content.replace('</head>', headInjection + '\n</head>');
    }
    
    if (!content.includes('aos-init.js')) {
        // Inject right before </body>
        content = content.replace('</body>', bodyInjection + '\n</body>');
    }
    
    fs.writeFileSync(f, content);
    console.log(`Injected AOS into ${f}`);
});

console.log('All HTML files updated with AOS dependencies.');
