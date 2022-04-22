require('./bootstrap');
import router from "./routes";
import { createApp, devtools } from "vue";
import Index from "./Index.vue"
import StarRating from "./shared/components/StarRating.vue"

const app = createApp({
    components: {
        "index" : Index,
    },
});
app.component("star-rating", StarRating);
app.use(router);
app.config.devtools = true;
app.mount('#app')
