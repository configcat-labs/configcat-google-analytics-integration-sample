<script setup>
import { useQuestionsStore } from './stores/questions';

const { questions } = useQuestionsStore();
</script>

<template>
  <main>
    <button class="btn btn-warning">Person</button>
    <ul>
      <li v-for="question in questions">
        {{ question }}
      </li>
    </ul>
  </main>
</template>