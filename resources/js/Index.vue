<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand ms-3 me-auto" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="btn nav-button me-3" :to="{ name: 'Bookables' }">Bookables Page</router-link>
        </nav>

        <div class="container mt-4 mb-4 p-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data()
    {
        return {
            lastSearch : this.$store.state.lastSearch
        };
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch"
        }),
    }
}
</script>