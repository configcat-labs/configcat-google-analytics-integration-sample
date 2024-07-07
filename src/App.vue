<script setup>
import { ref } from 'vue';
import { useQuestionsStore } from './stores/questions';
import QuizContainer from './components/QuizContainer.vue';

const { questionBank } = useQuestionsStore();
var gameStarted = ref(false);
</script>

<template>
  <main>
    <div v-if="!gameStarted" class="splash-screen">
      <p>Animal Sounds</p>
      <button class="btn lemon-green" @click="gameStarted = true">Start</button>
    </div>
    <div v-else>
      <QuizContainer :questions="questionBank"/>      
    </div>
  </main>
</template>

<style scoped>
  .lemon-green {
    background-color: lawngreen;
    color: rgb(253, 250, 245);
  }
</style>