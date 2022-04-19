<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr>
                        <article>
                            <p>{{ bookable.description }}</p>
                        </article>
                    </div>
                    <div v-else>
                        loading...
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            Availability & Price
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookable : null,
            loading : false
        }
    },
    created(){
        this.loading = true;
        const p = axios.get(`/api/bookables/${this.$route.params.id}`).then(response => {
            this.bookable = response.data.data;
            this.loading = false;
        });
    }
}
</script>