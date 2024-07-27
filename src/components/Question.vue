<script setup>
    import { inject, onBeforeMount, ref } from 'vue';
    import { User } from 'configcat-vue'
    import { useUserStore } from '@/stores/user';

    // Inject the ConfigCat client
    const configCatClient = inject('configCatClient');

    let isAnswerHighlightEnabled;

    const props = defineProps({
        question: Object,
        optionsDisabled: Boolean
    })

    const emit = defineEmits(['optionSelected']);

    onBeforeMount(() => {
        configCatClient.on('flagEvaluated', evaluationDetails => {
            // send feature flag information to Google Analytics
            const variant = "configcat-" + evaluationDetails.key + "-" + evaluationDetails.value;
            gtag('event', 'experience_impression', {
                'exp_variant_string': variant,
                'variation_id': evaluationDetails.variationId
            });
        });

        setHighlightStatus();
    });

    async function setHighlightStatus() {
        // get the value of the Highlight answer feature flag
        isAnswerHighlightEnabled = await configCatClient.getValueAsync('highlight_answer',
            false,
            new User(useUserStore().userID)
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
        width: 70%;
        justify-content: center;
    }

    .option {
        margin: 0.75rem;
        width: 100%;
        background-color: orange;
    }

    @media (min-width: 576px) {
        .options {
            padding-left: 10%;
        }

        .option {
            width: 100px;
            padding: 0.75rem;
        }
    }

    .selected {
        background-color: rgb(187, 127, 16);
    }

    .correct__option {
        background-color: lime
    }
</style>