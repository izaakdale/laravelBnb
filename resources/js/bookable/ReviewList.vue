<template>
    <div style="padding: 1rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4" >User Reviews</h6>
        
        <div v-if="loading">
            loading...
        </div>
        <div v-else>              
            <div class="border-bottom" v-for="(review, index) in reviews" :key="index">
                <div class="row pt-4">
                    <div class="col-md-6">
                        User name
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        {{ review.rating }}/5
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {{ fromNow(review.created_at) }}
                    </div>
                </div>
                <div class="row pt-4 pb-4">
                    <div class="col-12">
                        {{ review.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        bookableId: String,
    },
    data(){
        return {
            loading: false,
            reviews: null,
        }
    },
    methods: {
        fromNow(time){
            return moment(time).fromNow();
        }
    },
    created() {
        this.loading = true;
        const p = axios.get(`/api/bookables/${this.bookableId}/reviews`).then(response => {
            console.log('Hitting');
            this.reviews = response.data.data;
            this.loading = false;
        });
    },
}
</script>