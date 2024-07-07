<script setup>
    import { ref, onMounted } from 'vue';
    import Question from './Question.vue';
    import { Modal } from 'bootstrap';

    const props = defineProps({
        questions: Object
    })

    let gameOverModal;

    onMounted(() => {
        gameOverModal = new Modal('#gameOverModal');
    })

    let score = 0;
    
    let questionCounter = ref(0);
    // currentQuestion is ONLY used within this component, and not passed down to the child, Question
    let currentQuestion = props.questions[questionCounter.value];
    let optionsDisabled = ref(false);

    function playSound() {
        var questionAudio = new Audio(`sounds/${currentQuestion.audio}.mp3`);
        questionAudio.play();
    }

    function checkAnswer(option) {
        optionsDisabled.value = true;
        if(option === currentQuestion.answer) {
            score++;
        }
    }

    function loadNextQuestion() {
        questionCounter.value++;
        if(questionCounter.value < props.questions.length) {
            optionsDisabled.value = false;
            currentQuestion = props.questions[questionCounter.value];
        } else {
            // open game over modal
            gameOverModal.show();
        }
    }

</script>

<template>
    <div class="question">
        <!-- Game over Modal -->
        <div class="modal fade" id="gameOverModal" tabindex="-1" aria-labelledby="gameOverModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gameOverModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>You scored Change ME</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="btn btn-info" @click="playSound">
                Play Sound
            </div>
        </div>
        <Question :question="questions[questionCounter]" :options-disabled="optionsDisabled" @option-selected="checkAnswer"/>
        <button
         class="btn bg-primary-subtle" 
         @click="loadNextQuestion"
        >
         Next
        </button>
    </div>
    
</template>

<style scoped>

</style>