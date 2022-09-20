<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import Button from '../Atoms/Button.vue';
    import ToolTipsGroup from '../Molecules/ToolTipsGroup.vue';
    import { tooltipsGroupType } from '../../lib';
    type Props = {
        toolBarList: {
            GroupName: string;
            tooltipsGroupList: tooltipsGroupType;
            explanation: string;
        }[];
    }
    const props = defineProps<Props>()
    console.log(props.toolBarList[0].tooltipsGroupList[0].areaPropaties.isDisabled)
</script>
    
<template>
    <div class="toolbar" role="toolbar" aria-controls="textarea-sent">
        <ToolTipsGroup v-for="toolBar in toolBarList" v-bind:key="toolBar.GroupName" :tooltips-list="toolBar.tooltipsGroupList" :explanation="toolBar.explanation"/>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    justify-content: space-around;
    width: fit-content;
    margin: 0.5rem auto;
    padding: 0.1em 1.5rem;
    box-shadow: 1px 1px 7px 0px rgb(15 0 0 / 60%);
    border-radius: 10px;
}
</style>
    