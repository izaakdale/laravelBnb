<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                Hwllo
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bold">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{ itemsInBasket }} </span>
                        <span v-else>Empty Basket</span>
                    </h6>
                </div>

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
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items,
        })
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