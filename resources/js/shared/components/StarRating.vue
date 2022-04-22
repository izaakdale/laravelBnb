<template>
    <div>
        <div class="row">   
            <div class="col" v-for="(i, index) in rating" :key="index">
                <i class="fa-solid fa-star"></i>
            </div>
        </div>

    </div>
    <div>
    </div>
</template>

<script>
export default {
    props :{
        rating: Number,
    },
}
</script>