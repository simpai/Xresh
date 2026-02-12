/**
 * Word Search Generator for Korean (Type 3) and English (Type 4)
 */

const WORDS = {
    ko: {
        titles: ["다음달에 얻게될 3가지", "내년에 얻게될 3가지"],
        positive: [
            "건강", "이직", "당첨", "합격", "행운", "가족", "자신감", "재력", "연봉인상", "행복", "명예", "대학", "사랑", "성공", "기회", "근육", "비밀", "평화", "우정", "여유",
            "진급", "보너스", "결혼", "수익", "지혜", "용기", "열정", "희망", "축복", "인기", "매력", "안정", "자산", "성장", "창의성", "집중력", "여행", "휴식", "새차", "아파트"
        ],
        negative: [
            "뱃살", "숙취", "탈모", "성피로", "주름", "변비", "야근", "과로", "불면증", "두통",
            "지각", "결근", "실수", "감기", "피로", "스트레스", "구설수", "낭비", "정체", "낙방", "싸움", "이별", "품절", "교통체증", "카드값", "세금", "잔소리", "악몽", "부상", "분실"
        ],
        funny: [
            "맛집", "고양이", "강아지", "갑수", "키스", "치킨", "피자", "복권", "휴가", "낮잠",
            "삼겹살", "마라탕", "커피", "디저트", "넷플릭스", "유튜브", "치맥", "탕후루", "떡볶이", "햄버거", "탕수육", "짬뽕", "콜라", "라면", "만화책", "인형", "슬리퍼", "잠옷", "택배", "선물"
        ]
    },
    en: {
        titles: ["3 Things You'll Get Next Month", "3 Things You'll Get Next Year"],
        positive: [
            "SUCCESS", "LOVE", "MONEY", "WEALTH", "PEACE", "ROMANCE", "HEALTH", "FREEDOM", "PROMOTION", "WISDOM", "JOY", "GENIUS", "STRENGTH", "BEAUTY", "KNOWLEDGE", "FAME", "FOLLOWERS", "TRAVEL", "VACATION", "HAPPINESS",
            "BONUS", "VICTORY", "HARMONY", "PASSION", "COURAGE", "FAITH", "LUCK", "GLORY", "FRIENDS", "RESPECT", "HONOR", "ENERGY", "CLARITY", "FOCUS", "ASSETS", "GROWTH", "TALENT", "MIRACLE", "REWARD", "DREAMS"
        ],
        negative: [
            "FAT", "FLU", "HEADACHE", "STRESS", "DEBT", "LAZINESS", "JAIL", "IMPEACHMENT", "INSOMNIA", "TIREDNESS",
            "MISTAKE", "LATENESS", "OVERTIME", "FAILURE", "CONFLICT", "BILLS", "TRAFFIC", "ANXIETY", "GOSSIP", "BREAKUP", "DRAMA", "REJECTION", "POVERTY", "BOREDOM", "QUARREL", "REGRET", "DANGER", "LOSS", "BADLUCK", "ENVY"
        ],
        funny: [
            "PIZZA", "CAT", "DOG", "NETFLIX", "CHICKEN", "TACOS", "BEER", "COCKTAIL", "CRABS", "NACHOS",
            "BURGER", "COFFEE", "DONUTS", "SUSHI", "PASTA", "STEAK", "ICECREAM", "WINE", "GAMING", "YOUTUBE", "MEMES", "PANDA", "KOALA", "ROBOT", "BALLOON", "CANDY", "COOKIES", "BANANA", "UNICORN", "DRAGON"
        ]
    }
};

function generateWordSearch(lang = 'ko') {
    const data = WORDS[lang];
    const title = data.titles[Math.floor(Math.random() * data.titles.length)];
    const size = lang === 'ko' ? 10 : 12; // Korean words are usually shorter but take more space visually

    // Choose 15-20 random words to hide
    const allWords = [...data.positive, ...data.negative, ...data.funny];
    const selectedWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 20);

    const grid = Array.from({ length: size }, () => Array(size).fill(''));

    // Word placement: Horizontal and Vertical
    for (const word of selectedWords) {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            attempts++;
            const isHorizontal = Math.random() > 0.5;

            let row, col;
            if (isHorizontal) {
                row = Math.floor(Math.random() * size);
                col = Math.floor(Math.random() * (size - word.length + 1));
            } else {
                row = Math.floor(Math.random() * (size - word.length + 1));
                col = Math.floor(Math.random() * size);
            }

            let possible = true;
            for (let i = 0; i < word.length; i++) {
                const r = isHorizontal ? row : row + i;
                const c = isHorizontal ? col + i : col;
                if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
                    possible = false;
                    break;
                }
            }

            if (possible) {
                for (let i = 0; i < word.length; i++) {
                    const r = isHorizontal ? row : row + i;
                    const c = isHorizontal ? col + i : col;
                    grid[r][c] = word[i];
                }
                placed = true;
            }
        }
    }

    // Fill empty cells
    const alphabet = lang === 'ko'
        ? "가나다라마바사아자차카타파하각난닫랄맘밥삿았장착캌탙팦핳"
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    const gridString = grid.map(row => row.join(' ')).join('\n');
    return { title, grid, gridString };
}

module.exports = { generateWordSearch };

if (require.main === module) {
    const ko = generateWordSearch('ko');
    console.log(ko.title);
    console.log(ko.gridString);
}
