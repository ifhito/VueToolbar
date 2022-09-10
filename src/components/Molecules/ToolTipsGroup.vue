<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import Button from '../Atoms/Button.vue';
    import { tooltipsGroupType } from '../../lib';
    type Props = {
        tooltipsList: tooltipsGroupType;
    }
    const props = defineProps<Props>()
</script>
    
<template>
    <div class="toolGroup">
        <button class="tool tooltip" :area-pressed="tooltips.areaPropaties.pressed" :area-disabled="tooltips.areaPropaties.disabled" :tabindex="tooltips.tabindex" v-for="tooltips in tooltipsList" v-bind:key="tooltips.iconName" :onClick="tooltips.onClick" @click="() => tooltips.onClick(tooltips.areaPropaties.disabled)">
            <span class="tooltip-text">{{tooltips.tooltipText}}</span>
            <font-awesome-icon :icon="tooltips.iconName"/>
        </button>
    </div>
</template>

<style scoped>
    
    .toolGroup {
        margin: 0.2rem 0.5rem;
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
    .tool[area-disabled="true"] {
        opacity: 0.5;
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
    