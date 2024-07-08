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
  <main>
    <p>Player ID: {{ userStore.userID }}</p>
    <p>High score: {{ userStore.highScore }}</p>
    <p>Number of times played: {{ userStore.timesPlayed }}</p>
    <div v-if="!gameStarted" class="splash-screen">
      <p>Animal Sounds</p>
      <button class="btn lemon-green" @click="gameStarted = true">Start</button>
    </div>
    <div v-else>
      <QuizContainer
       :questions="questionStore.questions" 
       @generate-questions="questionStore.setQuestions"
       />      
    </div>
  </main>
</template>

<style scoped>
  .lemon-green {
    background-color: lawngreen;
    color: rgb(253, 250, 245);
  }
</style>