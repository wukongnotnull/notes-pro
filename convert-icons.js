const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const svgPath = path.join(__dirname, 'icons', 'icon.svg');

async function convertToPng(size) {
  const pngPath = path.join(__dirname, 'icons', `icon${size}.png`);
  try {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    console.log(`Successfully created ${pngPath}`);
  } catch (error) {
    console.error(`Error creating ${pngPath}:`, error);
  }
}

Promise.all(sizes.map(size => convertToPng(size)))
  .then(() => console.log('All icons generated successfully!'))
  .catch(error => console.error('Error generating icons:', error));