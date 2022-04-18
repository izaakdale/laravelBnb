require('./bootstrap');
import router from "./routes";
import { createApp } from "vue";

//window.Vue = require('vue').default;

const app = createApp({})
app.use(router)
app.component('example-component' , require('./components/ExampleComponent.vue').default);
app.component('test-component', require('./components/IzaakTestComponent.vue').default)
app.config.devtools = true;
app.mount('#app')
