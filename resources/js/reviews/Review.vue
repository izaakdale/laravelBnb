<template>
    <div>
        <div v-if="loading">
            loading..
        </div>
        <div v-else>
            <div v-if="alreadyReviewed">
                <h3>
                    Review already submitted for this booking...
                </h3>
            </div>
            <div v-else>
                <div class="form-group">
                    <label class="text-muted" for="">Select Star Rating</label>
                    <star-rating
                        class="fa-3x"
                        v-model="review.rating"
                    ></star-rating>
                </div>
                <div class="form-group">
                    <label for="content" class="text-muted">Describe your experience</label>
                    <textarea name="content" cols="30" rows="10" class="form-control" v-model="review.content"></textarea>
                </div>

                <button class="btn btn-md btn-primary col-md-12">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from '../shared/components/StarRating.vue';
export default {
  components: { StarRating },
    data() {
        return {
            review: {
                rating: 0,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
        }
    },
    methods: {
        onRatingChanged(rating){
            this.review.rating = rating; 
        }
    },
    created(){
        this.loading = true;
        const p = axios.get(`/api/reviews/${this.$route.params.id}`).then(response => {
            this.existingReview = response.data.data;
            this.loading = false;
        }).catch(error => {
            return axios.get(`/api/bookingByReview/${this.$route.params.id}`).then(response => {
                this.booking = response.data.data;
            });
            // // will probably want to catch this, here we have the case where an invalid reviewKey has been entered
            // // which means booking cannot be found/doesnt exist. Causes not stop loading
            // .catch(error => {
            //     this.booking = null;
            // });
        }).then(() => {
            this.loading = false;
        });
    },
    computed: {
        hasReview(){
            return this.existingReview != null;
        },
        hasBooking(){
            return this.booking != null;
        },
        alreadyReviewed(){
            return this.hasReview || !this.booking;
        }
    }
}
</script>
