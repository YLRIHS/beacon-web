<script setup lang="ts">
import { ref } from "vue";
import PureDataFilter from "@/components/PureDataFilter.vue";
import PureContent from "@/components/PureContent.vue";
import { onUnmounted, getCurrentInstance } from "vue";
import { useBasicStore } from "@/stores/basic";

const basicStore = useBasicStore();
const instance = getCurrentInstance();
let { proxy }: any = instance;

const activeKey = ref(0);
const options = ref([
    { value: "1", label: "Clinical Trial" },
    { value: "2", label: "选项2" },
    { value: "3", label: "选项3" },
])
const cutIndication = (li: any) => {
    console.log(li);
}
onUnmounted(() => {
    proxy.$loadingBar.finish();
    basicStore.clear()
})

</script>

<template>
    <div class="all_tables flex-1 overflow-hidden   flex justify-between flex-col gap-4 px-5 py-4 ">
        <div class="search_box   flex justify-between bg-white p-1 rounded-md border border-[#e5e5e5]">
            <a-dropdown :trigger="['click']" class="border-r border-[#e5e5e5] pr-1 pl-1">
                <span class="ant-dropdown-link flex  cursor-pointer whitespace-nowrap items-center !font-bold"
                    @click.prevent>
                    Clinical Trial
                    <PureIcon icon="material-symbols:arrow-drop-down-rounded" class="text-2xl" />
                </span>
                <template #overlay>
                    <a-menu class="dropdown_menu">
                        <a-menu-item :class="[index === activeKey ? 'active' : '']" v-for="(li, index) of options"
                            @click.prevent="cutIndication(li)" :key="index">
                            {{ li.label }} </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <a-input class="!border-0 focus:!border-0 focus:!shadow-none" placeholder='Clinical Trial' />
            <a-button type="primary" size="large" class="font-bold">
                <PureIcon icon="material-symbols:search-rounded" class="inline text-lg" />
                Search
            </a-button>
        </div>
        <div class="flex-1 overflow-hidden   flex justify-between gap-4">
            <PureDataFilter />
            <PureContent />
        </div>
    </div>
</template>

<style scoped lang="scss">
.all_tables {
    background: #fbf8f8;
}
</style>