<template>
    <div>
        <h6 class="text-uppercase text-secondary priceBold">
            Price breakdown
        </h6>

        <div class="d-flex priceSpace">
            <span>
                Per day
            </span>
            <span>
                {{ price.breakdown.num_days }} x ${{ price.breakdown.price_per_day }}
            </span>
        </div>
        <div class="priceBold d-flex priceSpace">
            <span>
                Total
            </span>
            <span>
                ${{price.total}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        price : Object,
    }
}
</script>

<style scoped>

.priceSpace {
    justify-content: space-between;
}

.priceBold {
    font-weight: bold;
}

</style>