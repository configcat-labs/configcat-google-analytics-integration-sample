import '../src/assets/styles.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ConfigCatPlugin } from "configcat-vue";
import App from './App.vue'
import "bootstrap";

const app = createApp(App)

app.use(createPinia())

app.use(ConfigCatPlugin, {
    // Don't forget to put in your actual SDK key below
    sdkKey: "YOUR-SDK-KEY"
});

app.mount('#app')
