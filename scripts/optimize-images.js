const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(__dirname, '../public/images-optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all jpg files
const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg'));

console.log(`Found ${files.length} images to optimize...`);

async function optimizeImages() {
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(optimizedDir, file);

    try {
      const stats = fs.statSync(inputPath);
      const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);

      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality: 75,
          progressive: true
        })
        .toFile(outputPath);

      const statsAfter = fs.statSync(outputPath);
      const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - statsAfter.size / stats.size) * 100).toFixed(1);

      console.log(`✓ ${file}: ${sizeBefore}MB → ${sizeAfter}MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('\nOptimization complete! Files saved in images-optimized folder.');
  console.log('Please manually move them to the images folder.');
}

optimizeImages().catch(console.error);
