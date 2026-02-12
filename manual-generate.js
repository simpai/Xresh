/**
 * Manual Image Generation Script
 * 
 * Usage:
 *  node manual-generate.js math      -> Generates a random math quiz
 *  node manual-generate.js grid      -> Generates a random character puzzle
 *  node manual-generate.js           -> Generates one of each
 */

const { generateUserStyleProblem } = require('./math-generator');
const { generateFindCharacterPuzzle } = require('./find-character-generator');
const { generateWordSearch } = require('./word-search-generator');
const { generateMathImage } = require('./image-generator');

async function run() {
    const args = process.argv.slice(2);
    const mode = args[0];

    if (mode === 'math' || !mode) {
        const problem = generateUserStyleProblem();
        const path = await generateMathImage(problem, 'manual_math.png', 'math');
        console.log(`Math image generated: ${path} (Problem: ${problem})`);
    }

    if (mode === 'grid' || !mode) {
        const puzzle = generateFindCharacterPuzzle();
        const path = await generateMathImage(puzzle.grid, 'manual_grid.png', 'grid');
        console.log(`Grid image generated: ${path} (Target: ${puzzle.targetChar})`);
    }

    if (mode === 'ws_ko' || !mode) {
        const puzzle = generateWordSearch('ko');
        const path = await generateMathImage(puzzle, 'manual_ws_ko.png', 'wordsearch');
        console.log(`Word Search (KO) generated: ${path} (Title: ${puzzle.title})`);
    }

    if (mode === 'ws_en' || !mode) {
        const puzzle = generateWordSearch('en');
        const path = await generateMathImage(puzzle, 'manual_ws_en.png', 'wordsearch');
        console.log(`Word Search (EN) generated: ${path} (Title: ${puzzle.title})`);
    }
}

run().catch(console.error);
