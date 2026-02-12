const { generateWordSearch } = require('./word-search-generator');

console.log("Testing Title Randomness (100 iterations):");
const counts = { ko: {}, en: {} };

for (let i = 0; i < 100; i++) {
    const ko = generateWordSearch('ko');
    counts.ko[ko.title] = (counts.ko[ko.title] || 0) + 1;

    const en = generateWordSearch('en');
    counts.en[en.title] = (counts.en[en.title] || 0) + 1;
}

console.log("Korean Titles:", counts.ko);
console.log("English Titles:", counts.en);
