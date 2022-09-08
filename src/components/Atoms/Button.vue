<script setup lang="ts">
    import { ref, defineProps, PropType} from 'vue'
    import { areaPropaties } from '../../lib';
    interface Props extends areaPropaties {
        onClick: (disabled:boolean | null) => void;
    };
    const props = defineProps<Props>()
</script>
    
<template>
    <button  class="tooltip">
    <slot></slot>
    </button>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
    