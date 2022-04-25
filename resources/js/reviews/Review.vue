<template>
    <div>
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
            }
        }
    },
    methods: {
        onRatingChanged(rating){
            this.review.rating = rating; 
        }
    }
}
</script>
