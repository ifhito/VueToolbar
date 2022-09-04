<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    interface Props {
        onClick: () => void;
    }
    const props = defineProps<Props>()
</script>
    
<template>
    <button @click="() => onClick()">
    <slot></slot>
    </button>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
    