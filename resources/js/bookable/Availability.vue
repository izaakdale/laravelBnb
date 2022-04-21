<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Availability checker
        </h6>
        <h8>
            <span v-if="isAvailable" class="text-success">Available for booking</span>
            <span v-if="notAvailable" class="text-danger">Listing not available for selected dates</span>
        </h8>
        <div class="form row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input type="date" name="from" 
                class="form-control form-control-sm" 
                placeholder="Start date" 
                v-model="from" 
                @keyup.enter="check"
                :class="[{'is-invalid': this.errorFor('from')}]"
                >
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('from')" :key="'from' + index">{{ error }}</div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input type="date" name="to" 
                class="form-control form-control-sm" 
                placeholder="End date" 
                v-model="to" 
                @keyup.enter="check"
                :class="[{'is-invalid': this.errorFor('to')}]"
                >
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('to')" :key="'to' + index">{{ error }}</div>
            </div>
        </div>
            <button @click="check" class="btn btn-outline-secondary mt-3 col-md-12" :disabled="loading">Check</button>
        </div>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null,
        }
    },
    methods: {
        check(){
            this.loading = true;
            this.status = null;
            axios.get(`/api/bookables/${this.$route.params.id}/availability?from=${this.from}&to=${this.to}`)
            .then(response => {
                this.status = response.status;
            })
            .catch(error => {
                if(422 === error.response.status){
                    this.errors = error.response.data.errors;
                }
                this.status = error.response.status;
            })
            .then(() => (this.loading = false));
        },
        errorFor(field){
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
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