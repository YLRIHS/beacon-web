<template>
    <div class="hopeai-menu w-[260px] flex flex-col h-full bg-white ">
        <div class="flex-1">
            <a-menu class="menu-box" id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
                :inline-collapsed="systemStore.collapsed" style="width: 256px" mode="inline" :items="items"
                @click="handleClick"></a-menu>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement } from 'vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import { useAppStore } from "@/stores/app";

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>(['monitor_task']);
const openKeys = ref<string[]>(['sub1']);
const systemStore = useAppStore();
function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType;
}

const items: ItemType[] = reactive([

    getItem('Prompt Libs', 'prompt_setting'),
]);


const handleClick: MenuProps['onClick'] = e => {
    if (e.key === 'prompt_setting') {
        selectedKeys.value = ['prompt_setting'];
        router.push('/set/prompt_setting');
    }
};



watch(route, val => {
    selectedKeys.value = [val.name as string];

}, { immediate: true });
</script>

<style lang="scss">
.hopeai-menu {
    border-right: 1px solid rgba(5, 5, 5, 0.06);

    .logo {
        border-block-end: 1px solid rgba(5, 5, 5, 0.06);
    }
}

.menu-box {
    border-inline-end: none !important;
}
</style>