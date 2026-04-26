import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

// Import Quasar styles
import 'quasar/src/css/index.sass';

const app = createApp(App);
app.use(Quasar, { config: {} });
app.use(createPinia());
app.use(router);
app.mount('#app');