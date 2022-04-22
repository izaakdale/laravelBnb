<template>
    <div class="d-flex">
        <i class="fa-solid fa-star" v-for="(i, index) in fullStars" :key="index"></i>
        <i class="fa-solid fa-star-half-stroke" v-if="halfStars"></i>
        <i class="fa-regular fa-star" v-for="(i, index) in emptyStars" :key="index"></i>
    </div>
</template>

<script>
export default {
    props :{
        rating: Number,
    },
    computed: {
        halfCeil(){
            return Math.ceil(this.rating * 2) / 2;
        },
        fullStars(){
            return Math.floor(this.halfCeil);
        },
        halfStars(){
            return (this.halfCeil) % 1 != 0;
        },
        emptyStars(){
            return 5-Math.ceil(this.rating);
        }
    },
}
</script>