import sharp from 'sharp';
import fs from 'fs';

async function generateIcons() {
  const svgBuffer = fs.readFileSync('public/icon.svg');

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/pwa-192x192.png');

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-512x512.png');

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-maskable-512x512.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  await sharp(svgBuffer)
    .resize(64, 64)
    .png()
    .toFile('public/favicon.ico');

  console.log('PWA PNG and ICO icons generated successfully!');
}

generateIcons().catch(console.error);
