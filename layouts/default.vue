<template>
    <UiVortex
        :range-y="500"
        :particle-count="500"
        :range-speed="0.5"
    >
        <div class="container mx-auto px-4">
            <AppHeader/>
            <slot/>
        </div>
    </UiVortex>
</template>
<script setup lang="ts">
</script>