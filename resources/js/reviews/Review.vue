<template>
  <div>
    <fatal-error v-if="error"></fatal-error>
    <div class="row" v-else>
      <div :class="[{ 'col-md-8': twoColumns }, { 'd-md-12': oneColumn }]">
        <div v-if="loading">loading...</div>
        <div v-else>
          <div v-if="alreadyReviewed">
            <h3>Review already submitted a review for this booking...</h3>
          </div>
          <div v-else>
            <div class="form-group">
              <star-rating class="fa-3x mb-3" v-model="review.rating"></star-rating>
            </div>
            <div class="form-group">
              <textarea
                name="content"
                cols="30"
                rows="10"
                class="form-control"
                v-model="review.content"
                :class="[{'is-invalid': errorFor('content')}]"
              ></textarea>
              <v-errors :errors="errorFor('content')"></v-errors>
              <!-- <div class="invalid-feedback"
                v-for="(error, index) in errorFor('content')" 
                :key="'content' + index"
              >{{ error }}</div> -->
            </div>
            <button
              class="btn btn-md btn-primary col-md-12 mt-4"
              @click.prevent="submit"
              :disabled="sending"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div :class="[{ 'col-md-4': twoColumns }, { 'd-none': oneColumn }]">
        <div v-if="sending">loading..</div>
        <div v-else>
          <div v-if="hasBooking" class="card">
            <div class="card-body">
              <h3>Your stay...</h3>
              <hr />
              <article>
                <router-link
                  :to="{
                    name: 'Bookable',
                    params: { id: booking.bookable.id },
                  }"
                  >{{ booking.bookable.title }}</router-link
                >
                From {{ booking.from }} to {{ booking.to }}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { is404, is422 } from "../shared/utils/response";
import validationErrors from "./../shared/mixins/validationErrors.js"

export default {
  mixins: [validationErrors],
  data() {
    return {
      review: {
        id: null,
        rating: 0,
        content: null,
      },
      existingReview: null,
      booking: null,
      error: false,
      sending: false,
      loading: false,
    };
  },
  methods: {
    onRatingChanged(rating) {
      this.review.rating = rating;
    },
    submit() {
      this.errors = null;
      this.sending = true;
      const p = axios
        .post(`/api/reviews/`, this.review)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
            if(is422(error)){
                const errors = error.response.data.errors;

                if(errors["content"] && 1 === _.size(errors) )
                {
                  this.errors = errors;
                  return;
                }
            }
            this.error = true;
        })
        .then(() => {
          this.sending = false;
        });
    },
  },
  async created() {
    this.review.id = this.$route.params.id;
    this.loading = true;

    try {
      const result = await axios.get(`/api/reviews/${this.review.id}`);
      this.existingReview = result.data.data;
    } catch (error) {
        if (is404(error)) {
          try {
            const result = await axios.get(`/api/bookingByReview/${this.review.id}`);
            this.booking = result.data.data;
          } catch (error) {
            // set this error to fault when the error isn't a 404.
            // 404 errors are thrown by the backend when the review or booking is not found
            this.error = !is404(error);
          }
        }
    }
    this.loading = false;
  },
  computed: {
    hasReview() {
      return this.existingReview != null;
    },
    hasBooking() {
      return this.booking != null;
    },
    alreadyReviewed() {
      return this.hasReview || !this.booking;
    },
    oneColumn() {
      return !this.loading && this.alreadyReviewed;
    },
    twoColumns() {
      return this.loading || !this.alreadyReviewed;
    },
  },
};
</script>
