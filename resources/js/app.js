require('./bootstrap');
import router from "./routes";
import { createApp, devtools } from "vue";
import Index from "./Index.vue"

const app = createApp({
    components: {
        "index" : Index
    },
});
app.use(router);
app.config.devtools = true;
app.mount('#app')
