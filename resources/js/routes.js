import {createRouter, createWebHistory} from "vue-router";
import ExampleComponent from "./components/ExampleComponent.vue";
import Bookables from "./bookables/Bookables.vue"

const routes = [
    {
        path: "/",
        component: ExampleComponent,
        name: "Home"
    },
    {
        path: "/bookables",
        component: Bookables,
        name: "Bookables",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;