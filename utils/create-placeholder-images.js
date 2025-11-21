const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a simple SVG placeholder for each subject
const subjects = [
  'mathematics',
  'physics', 
  'chemistry',
  'biology',
  'computer-science',
  'english',
  'history',
  'art',
  'music',
  'french',
  'spanish',
  'geography'
];

const colors = {
  'mathematics': '#2E86AB',
  'physics': '#A23B72',
  'chemistry': '#F18F01',
  'biology': '#73AB84',
  'computer-science': '#564256',
  'english': '#8D6B94',
  'history': '#B8336A',
  'art': '#FF6B6B',
  'music': '#4ECDC4',
  'french': '#FFE66D',
  'spanish': '#FF6B9D',
  'geography': '#95E1D3'
};

// Create SVG placeholders
subjects.forEach(subject => {
  const color = colors[subject] || '#666666';
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="${color}"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
  </text>
</svg>`;

  const filename = `${subject}.svg`;
  const filepath = path.join(imagesDir, filename);
  fs.writeFileSync(filepath, svgContent);
  console.log(`Created placeholder image: ${filename}`);
});

// Create JPEG versions (actually just rename to .jpg for simplicity)
subjects.forEach(subject => {
  const svgPath = path.join(imagesDir, `${subject}.svg`);
  const jpgPath = path.join(imagesDir, `${subject}.jpg`);
  
  // For a real implementation, we'd convert SVG to JPG
  // For now, we'll create a simple binary placeholder
  const buffer = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43
  ]);
  
  fs.writeFileSync(jpgPath, buffer);
  console.log(`Created JPEG placeholder: ${subject}.jpg`);
});

// Create sources.json with attribution
const sources = {
  'mathematics.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'physics.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'chemistry.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'biology.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'computer-science.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'english.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'history.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'art.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'music.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'french.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'spanish.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  },
  'geography.jpg': {
    source: 'Generated placeholder',
    license: 'MIT',
    attribution: 'Course Management System'
  }
};

const sourcesPath = path.join(imagesDir, 'sources.json');
fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2));
console.log('Created sources.json with attribution information');

console.log('Placeholder images created successfully!');
