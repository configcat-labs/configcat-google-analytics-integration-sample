<script setup>
import { ref, onMounted } from 'vue';
import { useQuestionsStore } from './stores/questions';
import { useUserStore } from './stores/user';
import QuizContainer from './components/QuizContainer.vue';

const userStore = useUserStore();
const questionStore = useQuestionsStore();
var gameStarted = ref(false);

onMounted(() => {
  userStore.setUserID();
});

</script>

<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <main>
        <div v-if="!gameStarted" id="splash__screen">
        <p id="app__title">Animal Sounds</p>
        <button class="btn lawn-green__button" @click="gameStarted = true">Start</button>
      </div>
      <div v-else>
        <QuizContainer
         :questions="questionStore.questions" 
         @generate-questions="questionStore.setQuestions"
         />      
      </div>
    </main>
  </div>
</template>

<style scoped>

  #splash__screen {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  #app__title {
    margin-bottom: 50px;
    font-size: 1.5rem;
  }

  .lawn-green__button {
    background-color: lawngreen;
    color: rgb(26, 65, 21);
  }
</style>