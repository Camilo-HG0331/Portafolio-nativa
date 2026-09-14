const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const imgs = [
  'img/portfolio/1-green.png',
  'img/portfolio/2-blue.png',
  'img/portfolio/3-green.png',
  'img/portfolio/4-purple.png',
  'img/portfolio/5-green.png',
  'img/portfolio/6-purple.png',
  'img/portfolio/7-green.png',
  'img/portfolio/8-blue.png',
  'img/portfolio/9-green.png'
];

async function recognize() {
  for (let img of imgs) {
    try {
      const { data: { text } } = await Tesseract.recognize(img, 'eng');
      console.log(img + ': ' + text.trim().replace(/\n/g, ' '));
    } catch (e) {
      console.error('Error on ' + img, e.message);
    }
  }
}

recognize();
