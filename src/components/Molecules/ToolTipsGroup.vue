<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import Button from '../Atoms/Button.vue';
    interface Props {
        tooltipsList: {
            onClick: () => void;
            iconName: string; 
        }[]
    }
    const props = defineProps<Props>()
</script>
    
<template>
    <div class="toolGroup">
        <Button v-for="tooltips in tooltipsList" v-bind:key="tooltips.iconName" :onClick="tooltips.onClick">
            <font-awesome-icon :icon="tooltips.iconName"/>
        </Button>
    </div>
</template>

<style scoped>
</style>
    