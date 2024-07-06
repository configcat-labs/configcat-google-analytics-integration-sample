import ANIMAL_SOUNDS from '../assets/data/animal_sounds.json';

function generateRandomIndex(array) {
	const MIN = 0
	const MAX = array.length;
	return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
	var randomElement = array[generateRandomIndex(array)];
	return randomElement;
}

export default function generateQuestions() {
    const ANIMAL_OPTIONS = [
  'dog', 'cat', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'turkey',
  'rabbit', 'deer', 'bear', 'lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'monkey', 'kangaroo',
  'dolphin', 'whale', 'shark', 'eagle', 'owl', 'parrot', 'snake', 'frog', 'turtle', 'fish'
];

    const NUMBER_OF_QUESTIONS = 5;
    const NUMBER_OF_OPTIONS = 4;

    function createQuestions() {
        var randomAudioFiles = [];
        var questions = [];
        // fetch random audio files we'll use as questions
        while(randomAudioFiles.length < NUMBER_OF_QUESTIONS) {
            var randomAudioFile = getRandomElement(ANIMAL_SOUNDS);
            if(!randomAudioFiles.includes(randomAudioFile)) {
                randomAudioFiles.push(randomAudioFile);
            } else {
                continue;
            }
        
            var options = [];
            while(options.length < NUMBER_OF_OPTIONS) {
                var option = getRandomElement(ANIMAL_OPTIONS);
                if(!options.includes(option)) {
                    options.push(option);
                }
            }

            // The question and answer are equal. Since the question is an audio file, the answer has to match it
            const answer = randomAudioFile;
            // // put the answer into the options array, IF the random generation in the loop didn't put in already
            if(!options.includes(answer)) {
                const answerIndex = generateRandomIndex(options);
                options.splice(answerIndex, 1, answer)
            }

            questions.push({
                audio: randomAudioFile,
                options: options,
                answer: answer
            });
        }
        return questions;
    }
    return createQuestions();
}
