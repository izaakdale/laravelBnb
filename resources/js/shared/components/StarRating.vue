<template>
    <div class="d-flex star-review">
        <i class="fa-solid fa-star" 
        v-for="star in fullStars" 
        :key="'full' + star"
        :value="modelValue"
        @click="$emit('update:modelValue', star)"
        ></i>

        <i class="fa-solid fa-star-half-stroke" v-if="halfStars"></i>

        <i class="fa-regular fa-star" 
        v-for="star in emptyStars" 
        :key="'empty' + star"
        :value="modelValue"
        @click="$emit('update:modelValue', fullStars + star)"
        ></i>
    </div>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],

    computed: {
        halfCeil(){
            return Math.ceil(this.modelValue * 2) / 2;
        },
        fullStars(){
            return Math.floor(this.halfCeil);
        },
        halfStars(){
            return (this.halfCeil) % 1 != 0;
        },
        emptyStars(){
            return 5-Math.ceil(this.modelValue);
        }
    },
}
</script>

<style scoped>

    .star-review{
        text-shadow: 3px 3px 8px #bdbdbd;
    }

</style>