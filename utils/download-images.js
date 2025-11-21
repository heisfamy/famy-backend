const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image URLs from Wikimedia Commons (public domain or CC licensed)
const imageUrls = {
  'mathematics.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/200px-Python-logo-notext.svg.png',
  'physics.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Double-compound-pendulum.gif/200px-Double-compound-pendulum.gif',
  'chemistry.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Chemicals_in_flasks.jpg/320px-Chemicals_in_flasks.jpg',
  'biology.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Human_karyotype_with_bands_and_sub-bands.png/200px-Human_karyotype_with_bands_and_sub-bands.png',
  'computer-science.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Computer_code.jpg/320px-Computer_code.jpg',
  'english.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Shakespeare.jpg/200px-Shakespeare.jpg',
  'history.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Parthenon_%28Nashville%29.JPG/320px-Parthenon_%28Nashville%29.JPG',
  'art.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/200px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
  'music.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Johann_Sebastian_Bach.jpg/200px-Johann_Sebastian_Bach.jpg',
  'french.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tour_Eiffel_Wikimedia_Commons.jpg/200px-Tour_Eiffel_Wikimedia_Commons.jpg',
  'spanish.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/200px-Flag_of_Spain.svg.png',
  'geography.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/World_map_blank_without_borders.svg/320px-World_map_blank_without_borders.svg.png'
};

// Sources information for attribution
const sources = {
  'mathematics.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Python-logo-notext.svg',
    license: 'Python Software Foundation License',
    attribution: 'Python Software Foundation'
  },
  'physics.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Double-compound-pendulum.gif',
    license: 'CC BY-SA 3.0',
    attribution: 'Wikimedia Commons'
  },
  'chemistry.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Chemicals_in_flasks.jpg',
    license: 'CC BY-SA 3.0',
    attribution: 'Joe Sullivan'
  },
  'biology.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Human_karyotype_with_bands_and_sub-bands.png',
    license: 'Public Domain',
    attribution: 'National Human Genome Research Institute'
  },
  'computer-science.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Computer_code.jpg',
    license: 'CC BY-SA 2.0',
    attribution: 'Wikimedia Commons'
  },
  'english.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Shakespeare.jpg',
    license: 'Public Domain',
    attribution: 'Unknown artist'
  },
  'history.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Parthenon_(Nashville).JPG',
    license: 'CC BY-SA 3.0',
    attribution: 'Wikimedia Commons'
  },
  'art.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream',
    license: 'Public Domain',
    attribution: 'Edvard Munch'
  },
  'music.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Johann_Sebastian_Bach.jpg',
    license: 'Public Domain',
    attribution: 'Elias Gottlob Haussmann'
  },
  'french.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons.jpg',
    license: 'CC BY-SA 3.0',
    attribution: 'Benh LIEU SONG'
  },
  'spanish.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:Flag_of_Spain.svg',
    license: 'Public Domain',
    attribution: 'Government of Spain'
  },
  'geography.jpg': {
    source: 'https://commons.wikimedia.org/wiki/File:World_map_blank_without_borders.svg',
    license: 'Public Domain',
    attribution: 'Wikimedia Commons'
  }
};

// Function to download image
function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image download...');
  
  for (const [filename, url] of Object.entries(imageUrls)) {
    try {
      await downloadImage(filename, url);
    } catch (error) {
      console.error(`Failed to download ${filename}`);
    }
  }
  
  // Save sources.json
  const sourcesPath = path.join(imagesDir, 'sources.json');
  fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2));
  console.log('Created sources.json with attribution information');
  
  console.log('Image download completed!');
}

// Run if executed directly
if (require.main === module) {
  downloadAllImages();
}

module.exports = downloadAllImages;
