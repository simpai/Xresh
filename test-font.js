const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

const fontPath = path.resolve(__dirname, 'NanumGothic-Bold.ttf');
console.log('Font path:', fontPath);
console.log('Exists:', fs.existsSync(fontPath));

try {
    registerFont(fontPath, { family: 'NanumGothic' });
    console.log('Font registered successfully');
} catch (e) {
    console.error('Failed to register font:', e);
}

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
ctx.font = '20px NanumGothic';
ctx.fillText('Test 한글', 10, 50);
console.log('Drawing test done');
