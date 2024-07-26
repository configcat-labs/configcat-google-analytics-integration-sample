import '../src/assets/styles.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ConfigCatPlugin } from "configcat-vue";
import App from './App.vue'
import "bootstrap";

const app = createApp(App)

app.use(createPinia())

app.use(ConfigCatPlugin, {
    sdkKey: import.meta.env.VITE_CONFIGCAT_SDK_KEY,
});

app.mount('#app')
