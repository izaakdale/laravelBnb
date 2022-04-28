<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Availability checker
        </h6>
        <h6>
            <span v-if="isAvailable" class="text-success">Available for booking</span>
            <span v-if="notAvailable" class="text-danger">Listing not available for selected dates</span>
        </h6>
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
            <button @click="check" class="btn btn-outline-secondary mt-3 col-md-12" :disabled="loading">Check</button>
        </div>
    <div>
    </div>
</template>

<script>
import { is422} from "../shared/utils/response"
import validationErrors from "../shared/mixins/validationErrors"
export default {
    mixins: [validationErrors],
    props: {
        bookableId: String,
    },
    data() {
        return {
            from: null,
            to: null,
            status: null,
            loading: false,
        }
    },
    methods: {
        check(){
            this.loading = true;
            this.status = null;
            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
            .then(response => {
                this.status = response.status;
            })
            .catch(error => {
                if(is422(error)){
                    this.errors = error.response.data.errors;
                }
                this.status = error.response.status;
            })
            .then(() => (this.loading = false));
        },
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