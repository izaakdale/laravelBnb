import {createRouter, createWebHistory} from "vue-router";
import Bookables from "./bookables/Bookables.vue"
import Bookable from "./bookable/Bookable.vue"
import Home from "./home/Home.vue"
import Review from "./reviews/Review.vue"

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
    {
        path: "/review/:id",
        component: Review,
        name: "Review"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;