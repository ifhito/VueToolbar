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
        <Button class="tool" :tabindex="tooltips.tabindex" v-for="tooltips in tooltipsList" v-bind:key="tooltips.iconName" :onClick="tooltips.onClick">
            <span class="tooltip-text">{{tooltips.tooltipText}}</span>
            <font-awesome-icon :icon="tooltips.iconName"/>
        </Button>
    </div>
</template>

<style scoped>
    
    .toolGroup {
        margin: 0.2rem;
        padding: 0.1rem 0.3rem;
        border-radius: 10px;
        box-shadow: inset 1px 1px 7px 0px rgb(15 0 0 / 60%);
    }
    .tool {
        position: relative;
        cursor: pointer;
        margin: 0.1em;
        font-size: 0.7rem;
        box-shadow: 1px 1px 4px 0px rgb(15 0 0 / 60%);
    }

    /* ツールチップのテキスト */
    .tooltip-text {
        opacity: 0; 
        visibility: hidden; 
        position: absolute; 
        left: 50%; 
        transform: translateX(-50%); 
        bottom: 40px; 
        display: inline-block;
        padding: 5px; 
        white-space: nowrap; 
        font-size: 0.5rem;
        line-height: 1.3; 
        background: #333; 
        color: #fff; 
        border-radius: 3px;
        transition: 0.5s tooltip-test ease;
    }

    

    /* ホバー時にツールチップの非表示を解除 */
    .tool:hover .tooltip-text {
        opacity: 1;
        visibility: visible;
    }
    .tool:focus .tooltip-text {
        opacity: 1;
        visibility: visible;
    }


</style>
    