require('./bootstrap');
import router from "./routes";
import { createApp, devtools } from "vue";
import {createStore} from "vuex";

import Index from "./Index.vue"
import StarRating from "./shared/components/StarRating.vue"
import FatalError from "./shared/components/FatalError.vue"
import Success from "./shared/components/Success.vue"
import ValidationErrors from "./shared/components/ValidationErrors.vue"
import storeDefinition from "./store";

const store = createStore(storeDefinition);
const app = createApp({
    components: {
        "index" : Index,
    },
    beforeCreate(){
        this.$store.dispatch("loadStoredState");
    }
});

// adding here to allow access appwide
app.component("star-rating", StarRating);
app.component("fatal-error", FatalError);
app.component("success", Success);
app.component("v-errors", ValidationErrors);

app.use(router);
app.use(store);

app.config.devtools = true;
app.mount('#app')
