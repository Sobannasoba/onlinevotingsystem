import fs from 'fs'

// Read the contents of index.html
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');

// Create 404.html with the same content as index.html
fs.writeFileSync('dist/404.html', indexHtml, 'utf8');