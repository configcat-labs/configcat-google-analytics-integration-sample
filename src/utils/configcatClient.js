import * as configcat from 'configcat-js';

export function initializeClient() {
    const logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

    const configCatClient = configcat.getClient(import.meta.env.VITE_CONFIGCAT_SDK_KEY,
        configcat.PollingMode.AutoPoll,
        {
            setupHooks: (hooks) => {
                hooks.on('flagEvaluated', evaluationDetails => {
                    /* const variant = "configcat-" + evaluationDetails.key + "-" + evaluationDetails.value;
                    gtag('event', 'experience_impression', {
                            'exp_variant_string': variant,
                            'variation_id': evaluationDetails.variationId
                    }); */
                    console.log(evaluationDetails);
                })
            },
            logger: logger
        });

    return configCatClient;
}