import { defineStore } from "pinia";
import generateQuestions from "@/utils/quizGenerator";

export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        questions: generateQuestions()
    }),
    getters: {
        questionBank: state => state.questions
    }
})