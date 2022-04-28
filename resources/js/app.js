require('./bootstrap');
import router from "./routes";
import { createApp, devtools } from "vue";
import Index from "./Index.vue"
import StarRating from "./shared/components/StarRating.vue"
import FatalError from "./shared/components/FatalError.vue"
import ValidationErrors from "./shared/components/ValidationErrors.vue"

const app = createApp({
    components: {
        "index" : Index,
    },
});
// adding here to allow access appwide
app.component("star-rating", StarRating);
app.component("fatal-error", FatalError);
app.component("v-errors", ValidationErrors);
app.use(router);
app.config.devtools = true;
app.mount('#app')
