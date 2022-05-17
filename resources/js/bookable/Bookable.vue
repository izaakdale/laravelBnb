<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h1>{{ bookable.title }}</h1>
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
        <review-list :bookableId="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4 pb-4">
            <availability 
            :bookableId="this.$route.params.id" 
            @availability="checkPrice($event)"
            ></availability>

            <transition name="fade">
                <div v-if="price" >
                    <price-breakdown class="mt-3" :price="price"></price-breakdown>
                    <button class="btn btn-outline-secondary mt-3 col-md-12" 
                    @click="addToBasket"
                    :disabled="inBasket"
                    >Book</button>
                </div>
            </transition>
            
            <transition name="fade">
                <div v-if="inBasket">            
                    <button class="btn btn-outline-secondary mt-3 col-md-12" 
                    @click="removeFromBasket"
                    >Remove from basket</button>

                    <div class="mt-4 text-muted warning">
                        Item added...
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability.vue"
import ReviewList from "./ReviewList.vue"
import PriceBreakdown from "./PriceBreakdown.vue"
import {mapState} from "vuex";

export default {
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data() {
        return {
            bookable : null,
            loading : false,
            price : null,
        }
    },
    created(){
        this.loading = true;
        const p = axios.get(`/api/bookables/${this.$route.params.id}`).then(response => {
            this.bookable = response.data.data;
            this.loading = false;
        });
    },
    methods: {
        async checkPrice(availability)
        {
            if(false == availability)
            {
                $this.price = null;
                return;
            }

            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data;
            } catch (error) {
                
            }
        },
        addToBasket()
        {
            this.$store.dispatch("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch,
            });
        },
        removeFromBasket()
        {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch",
        }),
        inBasket() {
            if(null === this.bookable){
                return false;
            }

            return this.$store.getters.inBasket(this.bookable.id);
        }
    }
}
</script>

<style scoped>
.warning {
    font-size: 0.75rem;
    color: darkred;
}
</style>