<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import { tooltipsGroupType } from '../../lib';
    import Button from '../Atoms/Button.vue';
    interface Props {
        tooltipsList: tooltipsGroupType
    }
    const props = defineProps<Props>()
</script>
    
<template>
    <div class="toolGroup">
        <Button :tabindex="tooltips.tabindex" v-for="tooltips in tooltipsList" v-bind:key="tooltips.iconName" :onClick="tooltips.onClick">
            <font-awesome-icon :icon="tooltips.iconName"/>
        </Button>
    </div>
</template>

<style scoped>
</style>
    