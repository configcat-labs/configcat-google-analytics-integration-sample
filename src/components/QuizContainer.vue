<script setup>
    import { ref } from 'vue';
    import Question from './Question.vue';

    const props = defineProps({
        questions: Object
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
            // load game over component. should put it in template when you're done
        }
    }

</script>

<template>
    <div class="question">
        <div>
            <div class="btn btn-info" @click="playSound">
                Play Sound
            </div>
        </div>
        <Question :question="questions[questionCounter]" :options-disabled="optionsDisabled" @option-selected="checkAnswer"/>
        <button class="btn bg-primary-subtle" @click="loadNextQuestion">Next</button>
    </div>
    
</template>

<style scoped>

</style>