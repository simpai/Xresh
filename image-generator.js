const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Try to use premium Windows font
const premiumFont = 'Malgun Gothic, "맑은 고딕", sans-serif';
/**
 * Renders text (math, grid, or wordsearch) onto a canvas and saves as an image.
 */
async function generateMathImage(content, outputPath, type = 'math') {
    const width = 1200;
    // 4:3 ratio for wordsearch (1200x900)
    let canvasHeight = 675; // Standard 16:9
    if (type === 'wordsearch') canvasHeight = 900;

    const canvas = createCanvas(width, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Random Background Color
    const hue = Math.floor(Math.random() * 360);
    const saturation = 45 + Math.floor(Math.random() * 15);
    const lightness = type === 'math' ? (65 + Math.floor(Math.random() * 10)) : (75 + Math.floor(Math.random() * 10));

    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    ctx.fillRect(0, 0, width, canvasHeight);

    ctx.fillStyle = '#111111';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Use NanumGothic for all premium content if available
    const premiumFont = 'Malgun Gothic, "맑은 고딕", sans-serif';

    if (type === 'math') {
        ctx.font = `bold 150px ${premiumFont}`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillText(content, width / 2, canvasHeight / 2);
    } else if (type === 'grid') {
        // Grid puzzle (Character find)
        const lines = content.split('\n');
        ctx.font = `bold 24px ${premiumFont}`;
        const lineHeight = 30;
        const startY = (canvasHeight - (lines.length * lineHeight)) / 2 + (lineHeight / 2);
        lines.forEach((line, index) => {
            ctx.fillText(line.split('').join(' '), width / 2, startY + (index * lineHeight));
        });
    } else if (type === 'wordsearch') {
        const { title, grid } = content;

        // Render Title
        ctx.font = `bold 70px ${premiumFont}`;
        ctx.fillStyle = '#222222';
        ctx.fillText(title, width / 2, 80);

        // Render Grid
        const size = grid.length;
        const horizontalPadding = 200;
        const gridWidth = width - (horizontalPadding * 2);

        // Dynamic cellSize calculation to fit height
        // Available vertical space approx: 900 - 80 (title) - 100 (footer) = 720
        // Let's leave some margin
        const maxGridHeight = 600;
        const cellSize = Math.min(gridWidth / size, maxGridHeight / size);

        const startX = (width - (cellSize * size)) / 2;
        const startY = 160;

        ctx.font = `bold ${Math.floor(cellSize * 0.6)}px ${premiumFont}`;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#333333';
        ctx.fillStyle = '#111111';

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const x = startX + (c * cellSize);
                const y = startY + (r * cellSize);
                ctx.strokeRect(x, y, cellSize, cellSize);
                ctx.fillText(grid[r][c], x + (cellSize / 2), y + (cellSize / 2));
            }
        }

        // Render Footer
        ctx.font = `bold 32px ${premiumFont}`;
        ctx.fillStyle = '#444444';
        const footerY = startY + (size * cellSize) + 70;
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
}

module.exports = { generateMathImage };

// Test script
if (require.main === module) {
    const { generateUserStyleProblem } = require('./math-generator');
    const problem = generateUserStyleProblem();
    generateMathImage(problem, path.join(__dirname, 'test-output.png'))
        .then(path => console.log(`Test image saved to ${path}`))
        .catch(err => console.error(err));
}
