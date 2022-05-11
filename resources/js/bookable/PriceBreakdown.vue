<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Price breakdown
        </h6>

        <div class="font-weight-bold">
            Number of days:         {{ price.breakdown.num_days }}
        </div>
        <div>
            Price per day:          ${{ price.breakdown.price_per_day }}
        </div>

        <div class="font-weight-bolder">Total ${{price.total}}</div>
    </div>
</template>

<script>
export default {
    props: {
        price : Object,
    }
}
</script>