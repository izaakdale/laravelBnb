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
              <!-- <label class="text-muted" for="">Select Star Rating</label> -->
              <star-rating class="fa-3x mb-3" v-model="review.rating"></star-rating>
            </div>
            <div class="form-group">
              <!-- <label for="content" class="text-muted"
                >Describe your experience</label
              > -->
              <textarea
                name="content"
                cols="30"
                rows="10"
                class="form-control"
                v-model="review.content"
              ></textarea>
            </div>
            <button
              class="btn btn-md btn-primary col-md-12"
              @click.prevent="submit"
              :disabled="loading"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div :class="[{ 'col-md-4': twoColumns }, { 'd-none': oneColumn }]">
        <div v-if="loading">loading..</div>
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
import { is404 } from "../shared/utils/response";
import StarRating from "../shared/components/StarRating.vue";
import FatalError from "../shared/components/FatalError.vue";
export default {
  components: { StarRating, FatalError },
  data() {
    return {
      review: {
        id: null,
        rating: 0,
        content: null,
      },
      existingReview: null,
      loading: false,
      booking: null,
      error: false,
    };
  },
  methods: {
    onRatingChanged(rating) {
      this.review.rating = rating;
    },
    submit() {
      this.loading = true;
      const p = axios
        .post(`/api/reviews/`, this.review)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.error = true;
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.review.id = this.$route.params.id;
    this.loading = true;
    const p = axios
      .get(`/api/reviews/${this.review.id}`)
      .then((response) => {
        this.existingReview = response.data.data;
        this.loading = false;
      })
      .catch((error) => {
        if (is404(error)) {
          return axios
            .get(`/api/bookingByReview/${this.review.id}`)
            .then((response) => {
              this.booking = response.data.data;
            })
            .catch((error) => {
              // set this error to fault when the error isn't a 404.
              // 404 errors are thrown by the backend when the review or booking is not found
              this.error = !is404(error);
            });
        }
      })
      .then(() => {
        this.loading = false;
      });
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
