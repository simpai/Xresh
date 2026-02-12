/**
 * Generates a random math problem involving basic arithmetic operations.
 * Uses unicode symbols for division (÷) and multiplication (×).
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    const types = ['basic', 'withBrackets'];
    const type = types[getRandomInt(0, types.length - 1)];

    if (type === 'basic') {
        const a = getRandomInt(1, 10);
        const b = getRandomInt(1, 10);
        const c = getRandomInt(1, 10);
        const ops = ['+', '-', '×', '÷'];
        const op1 = ops[getRandomInt(0, ops.length - 1)];
        const op2 = ops[getRandomInt(0, ops.length - 1)];

        // Ensure division results in an integer for simplicity if possible, 
        // but for "order of operations" puzzles, it's okay if it's tricky.
        // Let's refine for "attractive" puzzles.
        return `${a}${op1}${b}${op2}${c}=?`;
    } else {
        // Pattern: a - (b / c) * d
        const b = getRandomInt(2, 20);
        const divisors = [];
        for (let i = 1; i <= b; i++) if (b % i === 0) divisors.push(i);
        const c = divisors[getRandomInt(0, divisors.length - 1)];

        const a = getRandomInt(5, 20);
        const d = getRandomInt(2, 5);

        const ops = ['+', '-', '×', '÷'];
        const opOuter = ops[getRandomInt(0, 1)]; // + or -
        const opInner = '÷';

        // Omit multiplication symbol before/after brackets
        return `${a}${opOuter}(${b}${opInner}${c})${d}=?`;
    }
}

// Example generation logic tuned to user's requested style
function generateUserStyleProblem() {
    const choice = getRandomInt(0, 1);
    if (choice === 0) {
        // 4-(4/2)*2 style -> 4-(4÷2)2=?
        const b = getRandomInt(2, 10);
        const divisors = [];
        for (let i = 1; i <= b; i++) if (b % i === 0) divisors.push(i);
        const c = divisors[getRandomInt(0, divisors.length - 1)];
        const d = getRandomInt(2, 5);
        const a = getRandomInt(Math.floor((b / c) * d), 20);

        return `${a}-(${b}÷${c})${d}=?`;
    } else {
        // 2+3(2*9) style -> 2+3(2×9)=?
        const a = getRandomInt(1, 10);
        const b = getRandomInt(2, 5);
        const c = getRandomInt(2, 10);
        const d = getRandomInt(2, 10);
        return `${a}+${b}(${c}×${d})=?`;
    }
}

module.exports = { generateUserStyleProblem };

if (require.main === module) {
    for (let i = 0; i < 5; i++) {
        console.log(generateUserStyleProblem());
    }
}
