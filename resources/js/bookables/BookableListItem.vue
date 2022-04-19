<template>
    <div class="card w-100">
        <div class="card-body">
            <router-link style="text-decoration: none;" :to="{ name: `Bookable`, params: {id} }">
                <h5 class="card-title">{{ title }}</h5>
            </router-link>
                <p class="card-text">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title : String, 
        description: String, 
        price: Number,
        id: Number, 
    }
};
</script>