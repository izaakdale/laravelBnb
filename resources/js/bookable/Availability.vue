<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Availability checker
        </h6>
        <transition name="fade">
            <h6 v-if="isAvailable" class="text-success">Available for booking</h6>
        <!-- </transition> -->
        <!-- <transition name="fade"> -->
            <h6 v-else-if="notAvailable" class="text-danger">Listing not available for selected dates</h6>        
        </transition>
        <div class="form row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input type="date" name="from" 
                class="form-control form-control-sm" 
                placeholder="Start date" 
                v-model="from" 
                @keyup.enter="check"
                :class="[{'is-invalid': errorFor('from')}]"
                >
                <v-errors :errors="errorFor('from')"></v-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input type="date" name="to" 
                class="form-control form-control-sm" 
                placeholder="End date" 
                v-model="to" 
                @keyup.enter="check"
                :class="[{'is-invalid': errorFor('to')}]"
                >
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
        </div>
            <button @click="check" class="btn btn-outline-secondary mt-3 col-md-12" :disabled="loading">
                <span v-if="!loading">Check</span>
                <span v-if="loading"><i class="fa-solid fa-arrows-spin fa-spin"></i> Checking...</span>
            </button>
        </div>
    <div>
    </div>
</template>

<script>
import { is422 } from "../shared/utils/response"
import validationErrors from "../shared/mixins/validationErrors"
export default {
    mixins: [validationErrors],
    emits: ["availability"],
    props: {
        bookableId: [String, Number],
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            status: null,
            loading: false,
        }
    },
    methods: {
        async check(){
            this.$store.dispatch('setLastSearch', {
                from : this.from,
                to : this.to,
            });

            this.loading = true;
            this.status = null;
            this.errors = null;

            try {
                this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status;
            } catch (error) {
                if(is422(error)){
                    this.errors = error.response.data.errors;
                }
                this.status = error.response.status;
                
            }
            this.loading = false;
            this.$emit("availability", this.isAvailable)

            // axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
            // .then(response => {
            //     this.status = response.status;
            // })
            // .catch(error => {
            //     if(is422(error)){
            //         this.errors = error.response.data.errors;
            //     }
            //     this.status = error.response.status;
            // })
            // .then(() => (this.loading = false));
        },
    },
    beforeCreate() {
        if(!this.$store.state.lastSearch.from)
        {
            this.$store.commit('setFromToday');
        }
    },
    computed: {
        hasErrors(){
            return 422 == this.status && this.errors != null;
        },
        isAvailable(){
            return 200 == this.status;
        },
        notAvailable(){
            return 404 == this.status;
        }
    },
}
</script>

<style scoped>
    label{
        font-size: 0.75rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }
    .is-invalid{
        border-color: brown;
    }
</style>