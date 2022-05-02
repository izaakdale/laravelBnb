<template>
    <div class="text-center success">
        <i class="fa-solid fa-clipboard-check"></i>
        <h1 class="mt-4">Success!</h1>
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<style scoped>

.success{
    color: #999;
    font-size: 10rem;
    text-shadow: 3px 3px 8px #bdbdbd;
}

</style>