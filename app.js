const { generateUserStyleProblem } = require('./math-generator');
const { generateFindCharacterPuzzle } = require('./find-character-generator');
const { generateWordSearch } = require('./word-search-generator');
const { generateMathImage } = require('./image-generator');
const { postTweetWithImage } = require('./twitter-client');
const path = require('path');
const fs = require('fs');

async function main() {
    try {
        const types = ['math', 'find_char', 'wordsearch_ko', 'wordsearch_en'];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        let content;
        let tweetText;
        const imagePath = path.join(__dirname, 'temp_post.png');

        if (chosenType === 'math') {
            console.log('Generating math problem...');
            content = generateUserStyleProblem();
            tweetText = '오늘의 수학 퀴즈! 정답은 무엇일까요? #수학 #퀴즈 #MathQuiz';
            await generateMathImage(content, imagePath, 'math');
        } else if (chosenType === 'find_char') {
            console.log('Generating find character puzzle...');
            const puzzle = generateFindCharacterPuzzle();
            content = puzzle.grid;
            tweetText = `다른 한 글자를 찾아보세요! 👀\n'${puzzle.targetChar}'는 어디에 있을까요?\n#틀린그림찾기 #눈미션 #Game`;
            await generateMathImage(content, imagePath, 'grid');
        } else if (chosenType === 'wordsearch_ko') {
            console.log('Generating Korean word search...');
            const puzzle = generateWordSearch('ko');
            content = puzzle;
            tweetText = `${puzzle.title}\n가장 먼저 보이는 단어 3개는 무엇인가요? 🧐\n#심리테스트 #운세 #재미`;
            await generateMathImage(content, imagePath, 'wordsearch');
        } else if (chosenType === 'wordsearch_en') {
            console.log('Generating English word search...');
            const puzzle = generateWordSearch('en');
            content = puzzle;
            tweetText = `${puzzle.title}\nFind 3 words you see first! 🔍\n#WordSearch #Game #Quiz`;
            await generateMathImage(content, imagePath, 'wordsearch');
        }

        console.log('Posting to X...');
        await postTweetWithImage(tweetText, imagePath);

        // Cleanup
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        console.log('Done!');
    } catch (error) {
        console.error('Main execution failed:', error);
        process.exit(1);
    }
}

main();
