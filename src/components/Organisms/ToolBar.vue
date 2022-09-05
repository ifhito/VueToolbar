<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import Button from '../Atoms/Button.vue';
    import ToolTipsGroup from '../Molecules/ToolTipsGroup.vue';
    import { tooltipsGroupType } from '../../lib';
    interface Props {
        toolBarList: {
            GroupName: string;
            tooltipsGroupList: tooltipsGroupType;
        }[];
    }
    const props = defineProps<Props>()
</script>
    
<template>
    <div class="toolbar" >
        <ToolTipsGroup v-for="toolBar in toolBarList" v-bind:key="toolBar.GroupName" :tooltips-list="toolBar.tooltipsGroupList" />
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
    