<template>
    <div>
        <h2>{{ bookable.title }}</h2>
        <p>{{ bookable.description }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookable : null,
        }
    },
    created(){
        const p = axios.get(`/api/bookables/${this.$route.params.id}`).then(response => {
            this.bookable = response.data;
        });
    }
}
</script>