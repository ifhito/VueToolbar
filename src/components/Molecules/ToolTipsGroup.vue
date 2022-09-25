<script setup lang="ts">
    import { ref, defineProps  } from 'vue'
    import { tooltipsGroupType } from '../../lib';
    import ButtonWrapper from '../Atoms/ButtonWrapper.vue';
    type Props = {
        tooltipsList: tooltipsGroupType;
        explanation: string;
        opacity: number;
    }
    const props = defineProps<Props>()
    console.log(props.tooltipsList[0].areaPropaties.isDisabled)
</script>
    
<template>
    <div class="toolGroup" :aria-label="explanation">
        <button-wrapper :opacity="opacity"  :button-tab-index="tooltips.tabindex" v-for="tooltips in tooltipsList" v-bind:key="tooltips.iconName" :onClick="tooltips.onClick" v-bind:isDisabled="tooltips.areaPropaties.isDisabled" v-bind:isPressed="tooltips.areaPropaties.isPressed" :tooltip-text="tooltips.tooltipText">
            <font-awesome-icon :icon="tooltips.iconName"/>
        </button-wrapper>
    </div>
</template>

<style scoped>
    
    .toolGroup {
        margin: 0.2rem 0.5rem;
        padding: 0.1rem 0.3rem;
        border-radius: 10px;
        box-shadow: inset 1px 1px 7px 0px rgb(15 0 0 / 60%);
    }

</style>
    