<script setup>
    import { ref, onMounted } from 'vue';
    import Question from './Question.vue';
    import { Modal } from 'bootstrap';
    import { useUserStore } from '@/stores/user'; 

    const props = defineProps({
        questions: Object
    })

    const emit = defineEmits(['generateQuestions']);

    const userStore = useUserStore();

    let gameOverModal;

    onMounted(() => {
        userStore.setHighScore();
        gameOverModal = new Modal('#gameOverModal');
    })

    let score = 0;
    
    let questionCounter = ref(0);
    let currentQuestion = ref(props.questions[questionCounter.value]);
    let optionsDisabled = ref(false);

    function playSound() {
        var questionAudio = new Audio(`sounds/${currentQuestion.value.audio}.mp3`);
        questionAudio.play();
    }

    function checkAnswer(option) {
        optionsDisabled.value = true;
        if(option === currentQuestion.value.answer) {
            score++;
        }
    }

    function loadNextQuestion() {
        questionCounter.value++;
        if(questionCounter.value < props.questions.length) {
            optionsDisabled.value = false;
            currentQuestion.value = props.questions[questionCounter.value];
        } else {
            userStore.incrementTimesPlayed();
            if(score > userStore.highScore) {
                userStore.setHighScore(score);
            } 
            // open game over modal
            gameOverModal.show();
        }
    }

    function restart() {
        emit('generateQuestions');
        gtag('event', 'restart');

        questionCounter.value = 0;
        currentQuestion.value = props.questions[questionCounter.value];
        score = 0;
        optionsDisabled.value = false;
    }

</script>

<template>
    <div class="question">
        <!-- Game over Modal -->
        <div class="modal fade" id="gameOverModal" tabindex="-1" aria-labelledby="gameOverModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <h1 class="modal-title fs-5" id="gameOverModalLabel">Game Over!</h1> -->
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">
                        <p>You scored {{score}}</p>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="restart">Restart</button>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button id="sound__icon__button" class="btn btn-info" @click="playSound">
                <img id="sound__icon" src="/loudspeaker.svg" width="50"/>
            </button>
            <img src="/arrow.svg" width="50"/>
            <!-- <span>Click to hear the sound</span> -->
        </div>
        <Question :question="currentQuestion" :options-disabled="optionsDisabled" @option-selected="checkAnswer"/>
        <button
         class="btn"
         id="next__button" 
         @click="loadNextQuestion"
         :disabled="!optionsDisabled"
        >
         Next
        </button>
    </div>
    
</template>

<style scoped>
.question {
    margin-top: max(20vh, 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
}

#next__button {
    background-color: greenyellow;
}

#sound__icon__button {
    padding-right: 0.25rem;
    border-radius: 1.75rem;
}
</style>