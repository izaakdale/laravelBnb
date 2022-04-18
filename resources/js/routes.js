import {createRouter, createWebHistory} from "vue-router";
import ExampleComponent from "./components/ExampleComponent.vue";
import IzaakTestComponent from "./components/IzaakTestComponent.vue"

const routes = [
    {
        path: "/",
        component: ExampleComponent,
        name: "Home`"
    },
    {
        path: "/test",
        component: IzaakTestComponent,
        name: "Test",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;