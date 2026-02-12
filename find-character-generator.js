/**
 * Generates a grid of characters where one character is different.
 */

const charPairs = [
    ['0', 'O'],
    ['5', '6'],
    ['M', 'N'],
    ['E', 'F'],
    ['1', 'I'],
    ['8', 'B'],
    ['P', 'R'],
    ['W', 'V'],
    ['u', 'v'],
    ['o', 'c'],
];

function generateFindCharacterPuzzle() {
    const pair = charPairs[Math.floor(Math.random() * charPairs.length)];
    const [baseChar, targetChar] = Math.random() > 0.5 ? pair : [pair[1], pair[0]];

    const rows = 15;
    const cols = 45; // Increased to 45 as requested
    const targetRow = Math.floor(Math.random() * rows);
    const targetCol = Math.floor(Math.random() * cols);

    let grid = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r === targetRow && c === targetCol) {
                grid += targetChar;
            } else {
                grid += baseChar;
            }
        }
        if (r < rows - 1) grid += '\n';
    }

    return { grid, baseChar, targetChar };
}

module.exports = { generateFindCharacterPuzzle };

if (require.main === module) {
    const puzzle = generateFindCharacterPuzzle();
    console.log(puzzle.grid);
    console.log(`Find the '${puzzle.targetChar}' among '${puzzle.baseChar}'s`);
}
