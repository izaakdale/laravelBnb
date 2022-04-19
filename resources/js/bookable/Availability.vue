<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
        </h6>
        <div class="form row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input type="date" name="from" 
                class="form-control form-control-sm" 
                placeholder="Start date" 
                v-model="from" @keyup.enter="check">
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input type="date" name="to" 
                class="form-control form-control-sm" 
                placeholder="End date" 
                v-model="to" @keyup.enter="check">
            </div>
        </div>
        <button @click="check" class="btn btn-outline-secondary mt-3 col-md-12">Check</button>
    </div>
</template>

<script>
export default {
    data(){
        from: null;
        to: null;
    },
    methods: {
        check(){
            alert('Checking');
        }
    }
}
</script>

<style scoped>
    label{
        font-size: 0.75rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }
</style>