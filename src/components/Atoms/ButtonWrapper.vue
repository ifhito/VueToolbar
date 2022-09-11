<script setup lang="ts">
    import { ref, defineProps, PropType} from 'vue'
    import { areaPropaties } from '../../lib';
    interface Props {
        onClick: (disabled:boolean | null) => void;
        isPressed: boolean | null;
        isDisabled: boolean | null;
    };
    const props = defineProps<Props>()
    console.log(props.onClick, props.isDisabled, props.isPressed)
</script>
    
<template>
    <button  class="tool tooltip" :area-pressed="isPressed" :area-disabled="isDisabled" @click="props.onClick(isDisabled)">
    <slot></slot>
    </button>
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
    .tool[area-disabled="true"] {
        opacity: 0.5;
    }


</style>
    