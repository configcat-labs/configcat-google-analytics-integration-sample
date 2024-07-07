<script setup>
    import { ref, onMounted } from 'vue';
    import Question from './Question.vue';
    import { Modal } from 'bootstrap';

    const props = defineProps({
        questions: Object
    })

    const emit = defineEmits(['generateQuestions']);

    let gameOverModal;

    onMounted(() => {
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
            // open game over modal
            gameOverModal.show();
        }
    }

    function restart() {
        emit('generateQuestions');
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
            <div class="btn btn-info" @click="playSound">
                Play Sound
            </div>
        </div>
        <Question :question="currentQuestion" :options-disabled="optionsDisabled" @option-selected="checkAnswer"/>
        <button
         class="btn bg-primary-subtle" 
         @click="loadNextQuestion"
         :disabled="!optionsDisabled"
        >
         Next
        </button>
    </div>
    
</template>

<style scoped>

</style>