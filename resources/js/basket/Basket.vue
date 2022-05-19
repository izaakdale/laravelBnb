<template>
    <div>
        <success v-if="success">
            Your order was processed
        </success>
        <div v-else class="row">
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_names">First Names</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="first_names" 
                        v-model="customer.first_names"
                        :class="[{'is-invalid': errorFor('customer.first_names')}]"
                        >
                        <v-errors :errors="errorFor('customer.first_names')"></v-errors>
                    </div>
                    <div class="col-md-6">
                        <label for="last_name">Last Name</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="last_name" 
                        v-model="customer.last_name"
                        :class="[{'is-invalid': errorFor('customer.last_name')}]"
                        >
                        <v-errors :errors="errorFor('customer.last_name')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="Email">Email</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="email" 
                        v-model="customer.email"
                        :class="[{'is-invalid': errorFor('customer.email')}]"
                        >
                        <v-errors :errors="errorFor('customer.email')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="street">Street</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="street" 
                        v-model="customer.street"
                        :class="[{'is-invalid': errorFor('customer.street')}]"
                        >
                        <v-errors :errors="errorFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6">
                        <label for="city">City</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="city" 
                        v-model="customer.city"
                        :class="[{'is-invalid': errorFor('customer.city')}]"
                        >
                        <v-errors :errors="errorFor('customer.city')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label for="state">State</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="state" 
                        v-model="customer.state"
                        :class="[{'is-invalid': errorFor('customer.state')}]"
                        >
                        <v-errors :errors="errorFor('customer.state')"></v-errors>
                    </div>
                    <div class="col-md-6">
                        <label for="country">Country</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="country" 
                        v-model="customer.country"
                        :class="[{'is-invalid': errorFor('customer.country')}]"
                        >
                        <v-errors :errors="errorFor('customer.country')"></v-errors>
                    </div>
                    <div class="col-md-4">
                        <label for="zipcode">Zip</label>
                        <input 
                        class="form-control" 
                        type="text" 
                        name="zipcode" 
                        v-model="customer.zipcode"
                        :class="[{'is-invalid': errorFor('customer.zipcode')}]"
                        >
                        <v-errors :errors="errorFor('customer.zipcode')"></v-errors>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="d-grid gap-2 form-group">
                        <button 
                        type="button" 
                        class="btn btn-secondary" 
                        @click="book"
                        :disabled="loading"
                        >Book</button>
                    </div>
                </div>
            </div>
            <div v-else class="col-md-8">
                <div class="jumbotron jumbotron-fluid text-center">
                    <h2>Empty</h2>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bold">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{ itemsInBasket }} </span>
                        <span v-else>Empty Basket</span>
                    </h6>
                </div>

                <transition-group name="fade">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                            <span>
                                <router-link :to="{name:'Bookable', params: {id:item.bookable.id} }" >
                                    {{item.bookable.title}}
                                </router-link>
                            </span>
                            <span> ${{ item.price.total }} </span>
                        </div>
                        
                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span>
                                From {{ item.dates.from }}
                            </span>
                            <span>
                                To {{ item.dates.to }}
                            </span>
                        </div>

                        <div class="pt-2 pb-2 right">
                            <button class="btn btn-sm btn-outline-secondary">
                                <i class="fa fa-trash-alt" @click="$store.dispatch('removeFromBasket', item.bookable.id)"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Success from '../shared/components/Success.vue';
import validationErrors from "./../shared/mixins/validationErrors";

export default {
  components: { Success },
    mixins: [
        validationErrors,
    ],
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items,
        }),
        success() {
            return !this.loading && 0 === this.itemsInBasket && this.bookingAttempted
        }
    },
    methods: {
        async book() {
            this.loading = true;
            this.errors = null;
            this.bookingAttempted = false;
            try {
                await axios.post(`/api/checkout`, {
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to,
                    })),
                    customer: this.customer
                })
                this.$store.dispatch("clearBasket");
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }
            this.loading = false;
            this.bookingAttempted = true;
        }
    },
    data() {
        return {
            loading: false,
            bookingAttempted: false,
            customer: {
                first_names : null,
                last_name : null,
                email : null,
                street : null,
                city : null,
                state : null,
                country : null,
                zipcode : null
            },

        }
    }
}
</script>

<style scope>
    
.badge {
    background-color: grey;
}

a {
    color: black;
    text-decoration: none;
}

.right {
    text-align: right;
}

</style>