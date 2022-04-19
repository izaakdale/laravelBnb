import {createRouter, createWebHistory} from "vue-router";
import Bookables from "./bookables/Bookables.vue"
import Bookable from "./bookable/Bookable.vue"
import Home from "./home/Home.vue"

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home"
    },
    {
        path: "/bookables",
        component: Bookables,
        name: "Bookables",
    },
    {
        path: "/bookables/:id",
        component: Bookable,
        name: "Bookable",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;