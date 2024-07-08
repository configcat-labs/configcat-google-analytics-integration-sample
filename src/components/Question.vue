<script setup>
    import { onBeforeMount } from 'vue';
    import * as configcat from 'configcat-js'; 
    import { initializeClient } from '@/utils/configcatClient'
    import { useUserStore } from '@/stores/user';

    let configcatClient;
    let isAnswerHighlightEnabled;

    onBeforeMount(() => {
        configcatClient = initializeClient();  
        setHighlightStatus();
    })

    const emit = defineEmits(['optionSelected']);
    const props = defineProps({
        question: Object,
        optionsDisabled: Boolean
    })

    async function setHighlightStatus() {
        isAnswerHighlightEnabled = await configcatClient.getValueAsync(
            'show_answer',
            false,
            new configcat.User(useUserStore().userID)
        );
    }
    
    function selectOption(option) {
        emit('optionSelected', option);  
    }
</script>

<template>
    <div>
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
</template>

<style scoped>
    .option {
        background-color: orange;
    }

    .selected {
        background-color: rgb(187, 127, 16);
    }

    .correct__option {
        background-color: lime
    }
</style>