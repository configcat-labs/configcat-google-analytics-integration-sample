<script setup>
    import { onBeforeMount } from 'vue';
    import * as configcat from 'configcat-js'; 
    import { initializeClient } from '@/utils/configcatClient'
    import { useUserStore } from '@/stores/user';

    let configcatClient;
    let isAnswerHighlightEnabled;

    const props = defineProps({
        question: Object,
        optionsDisabled: Boolean
    })
    const emit = defineEmits(['optionSelected']);

    onBeforeMount(() => {
        configcatClient = initializeClient();  
        setHighlightStatus();
    })

    async function setHighlightStatus() {
        isAnswerHighlightEnabled = await configcatClient.getValueAsync(
            'highlight_answer',
            false,
            new configcat.User(useUserStore().userID)
        );
    }
    
    function selectOption(option) {
        emit('optionSelected', option);  
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="options">
                <button
                 v-for="(option, index) in question.options"
                 :id="`option${index + 1}`" 
                 class="btn option"
                 :class="{ correct__option: (optionsDisabled && option === question.answer && isAnswerHighlightEnabled) }"
                 :disabled="optionsDisabled"
                 @click="selectOption(option)">
                    {{option}}
                </button>
            </div>
        </div>    
    </div>
</template>

<style scoped>

    .options {
        margin: 0 auto;
        width: 60%;
    }

    .option {
        margin: 0.75rem;

        background-color: orange;
    }

    .selected {
        background-color: rgb(187, 127, 16);
    }

    .correct__option {
        background-color: lime
    }
</style>