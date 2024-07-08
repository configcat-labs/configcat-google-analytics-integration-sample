import { defineStore } from "pinia";
import generateQuestions from "@/utils/quizGenerator";

export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        questions: generateQuestions()
    }),
    actions: {
        setQuestions() {
            this.questions = generateQuestions();
        }
    }
})