<template>
    <div class="empty">
        <a-empty>
            <template #description> 
                <a-button type="primary" v-if="show" @click.prevent="parentMethod">{{text}} </a-button>
            </template>
        </a-empty>
        
    </div>
</template>
<script setup lang="ts">
defineProps({
    show: Boolean,
    text:String,
    parentMethod: Function
})

</script>
<style lang="scss" scoped>
.empty {
    width: 100%; 
    display: flex; 
    justify-content: center;
    padding-top: 180px;
}
</style>