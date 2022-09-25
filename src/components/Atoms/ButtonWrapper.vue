<script setup lang="ts">
    import { ref, defineProps, PropType} from 'vue'
    import { areaPropaties } from '../../lib';
    interface Props {
        onClick: (disabled:boolean | null) => void;
        isPressed: boolean | null;
        isDisabled: boolean | null;
        tooltipText: string;
        buttonTabIndex: number;
        opacity: number;
    };
    const props = defineProps<Props>()
    console.log(props.onClick, props.isDisabled, props.isPressed)
</script>
    
<template>
    <button  class="tool tooltip" :tabindex="buttonTabIndex" :area-pressed="isPressed" :area-disabled="isDisabled" @click="props.onClick(isDisabled)">
    <slot></slot>
    </button>
    <span class="tooltip-text">{{tooltipText}}</span>
</template>

<style scoped>
    .read-the-docs {
        color: #888;
    }

    .tool {
            position: relative;
            cursor: pointer;
            margin: 0.1em;
            font-size: 0.7rem;
            box-shadow: 1px 1px 4px 0px rgb(15 0 0 / 60%);
        }
    .tool:focus {
        background-color: #DB0078;
    }
    .tool[area-disabled="true"] {
        opacity: 0.5;
    }

    /* ツールチップのテキスト */
    .tooltip-text {
        opacity: 0; 
        visibility: hidden; 
        position: absolute;
        transform: translate(-75%, -130%);
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
    .tool:hover + .tooltip-text {
        opacity: 1;
        visibility: visible;
    }
    .tool:focus + .tooltip-text {
        opacity: v-bind(opacity);
        visibility: visible;
    }


</style>
    