<template>
    <div class="flex-1 h-full overflow-hidden flex flex-col gap-4">

        <template v-if="basicStore.tableLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <template v-if="basicStore.pureLists.length > 0">
                <div class="flex flex-1  flex-col items-center gap-2  overflow-hidden">
                    <PureCriteria />
                    <div
                        class="list_checkbox bg-white w-full flex items-center justify-between px-4 py-2 rounded-md border border-[#e5e5e5]">

                        <a-checkbox v-model:checked="isAllChecked" @change="selectAll"> Select All</a-checkbox>
                        <p class=" whitespace-nowrap flex gap-1 items-center">
                            Showing results for:
                            <template v-if="basicStore.filterStr.length > 0">
                                <a-tooltip placement="top">
                                    <template #title>
                                        <div>
                                            <strong v-for="(strN) of basicStore.filterStr" class="text-sm">
                                                {{ strN.name }}
                                                <template v-if="strN.value !== 'true'">
                                                    : {{ strN.value }}
                                                </template>
                                                <template
                                                    v-if="strN !== basicStore.filterStr[basicStore.filterStr.length - 1]">
                                                    |
                                                </template>
                                            </strong>
                                        </div>
                                    </template>
                                    <div class="left_filters">
                                        <strong v-for="(strs) of basicStore.filterStr" class="text-sm">
                                            {{ strs.name }}
                                            <template v-if="strs.value !== 'true'">
                                                : {{ strs.value }}
                                            </template>
                                            <template
                                                v-if="strs !== basicStore.filterStr[basicStore.filterStr.length - 1]">
                                                |
                                            </template>
                                        </strong>
                                    </div>
                                </a-tooltip>

                            </template>
                            <template v-else>
                                <strong class="text-sm">all studies</strong>
                            </template>
                        </p>
                    </div>
                    {{ basicStore.pageIdx }}
                    <div class="flex-1 overflow-auto w-full">
                        <a-list item-layout="vertical" :data-source="basicStore.pureLists">
                            <template #renderItem="{ item }">
                                <a-list-item key="item.title"
                                    class="bg-white !mb-3 border !border-[#e5e5e5] rounded-md">
                                    <div class="flex gap-2 ">
                                        <div class=" items-baseline">
                                            <a-checkbox v-model:checked="item.checked"></a-checkbox>
                                        </div>
                                        <div class="flex flex-col flex-1 gap-2">
                                            <p>
                                                <span class="text-base text-purple-800 !font-semibold">{{
                                                    item.study_title
                                                    }}</span>
                                                <span class="text-gray-600 pl-1">({{ item.nct_number }})</span>
                                            </p>
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="flex flex-col gap-2">
                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Start Date</span>
                                                        <span>{{ item.study_start.date ? item.study_start.date : ''
                                                            }}</span>
                                                    </p>

                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Enrollment Count</span>
                                                        <span>{{ item.enrollment }}</span>
                                                    </p>

                                                </div>
                                                <div class="flex flex-col gap-2">
                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Last Post Date</span>
                                                        <span>{{ item.last_update_posted }}</span>
                                                    </p>

                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Sponsor</span>
                                                        <span>{{ item.sponsor }}</span>
                                                    </p>

                                                </div>
                                                <div class="flex flex-col gap-2">
                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Overall Status</span>
                                                        <span>
                                                            {{ item.status ? item.status.charAt(0).toUpperCase() +
                                                                item.status.slice(1) : '' }}</span>
                                                    </p>

                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Study Type</span>
                                                        <span>{{ item.study_type ?
                                                            item.study_type.charAt(0).toUpperCase() +
                                                            item.study_type.slice(1) : '' }}</span>
                                                    </p>

                                                    <p class="flex flex-col gap-1">
                                                        <span class="text-gray-500">Phase</span>
                                                        <span>{{ item.phase.length > 0 ? item.phase : '-' }}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- {{ item }} -->
                                </a-list-item>
                            </template>
                        </a-list>
                        <div class="flex  justify-end">
                            <a-pagination v-model:current="current2" v-model:page-size="basicStore.pageSize"
                                :total="basicStore.total"
                                :show-total="(total: any, range: any) => `${range[0]}-${range[1]} of ${total} totals`"
                                @change="handlePaginate" />
                        </div>

                    </div>
                </div>
            </template>
            <template v-else>
                <a-empty description=""></a-empty>
            </template>

        </template>
    </div>

</template>
<script lang="ts" setup>
import { ref, watch, } from 'vue';//onMounted
import { useBasicStore } from '@/stores/basic';
import LoadingSpin from '@/components/common/LoadingSpin.vue';
import PureCriteria from '@/components/PureCriteria.vue';


const basicStore = useBasicStore();
const emit = defineEmits(['updateSelect', 'changePage']);
const isAllChecked = ref(false);

const current2 = ref(1);
// const pagination = {
//     onChange: (page: number) => {
//         console.log(page);
//         basicStore.setPageIdx(page);
//         emit('changePage');
//     },
//     pageSize: basicStore.pageSize,
//     total: basicStore.total,
//     current: basicStore.pageIdx,
// };

const handlePaginate = (page: number, pageSize: number) => {
    basicStore.setPageIdx(page);
    basicStore.setPageSize(pageSize);
    emit('changePage');
};

const selectAll = () => {
    basicStore.pureLists.forEach((item: any) => {
        item.checked = isAllChecked.value;
    });
};

watch(() => basicStore.total, (newVal: any) => {
    if (newVal > 0) {

        current2.value = basicStore.pageIdx;
    }
}, {
    immediate: true,
    deep: true
});
</script>

<style lang="scss">
.left_filters {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 560px;
    /* Adjust max-width as needed */
}

.manages {
    display: flex !important;
}
</style>