<script setup>

    const emit = defineEmits(['optionSelected']);
    const props = defineProps({
        question: Object,
        optionsDisabled: Boolean
    })

    // var optionsDisabled = ref(false);

    function selectOption(option) {
        // optionsDisabled.value = true;
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
</style>