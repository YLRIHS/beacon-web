<template>
    <div class="flex-1 h-full overflow-hidden flex flex-col gap-4">
        <template v-if="basicStore.tableLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <div class="flex flex-1  flex-col items-center gap-2  overflow-hidden">
                <PureCriteria />
                <div
                    class="list_checkbox bg-white w-full flex items-center justify-between px-4 py-2 rounded-md border border-[#e5e5e5]">

                    <a-checkbox v-model:checked="isAllChecked" @change="selectAll"> Select All</a-checkbox>
                </div>
                <div class="flex flex-1 overflow-auto">
                    <a-list item-layout="vertical" :pagination="pagination" :data-source="basicStore.pureLists">
                        <template #renderItem="{ item }">
                            <a-list-item key="item.title" class="bg-white !mb-3 border !border-[#e5e5e5] rounded-md">
                                <div class="flex gap-2 ">
                                    <div class=" items-baseline">
                                        <a-checkbox v-model:checked="item.checked"></a-checkbox>
                                    </div>
                                    <div class="flex flex-col flex-1 gap-2">
                                        <p>
                                            <span class="text-base text-purple-800 !font-semibold">{{ item.study_title
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
                                                    <span>{{ item.study_type ? item.study_type.charAt(0).toUpperCase() +
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
                </div>
            </div>
        </template>
    </div>

</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, } from 'vue';//onMounted
import { useBasicStore } from '@/stores/basic';
import LoadingSpin from '@/components/common/LoadingSpin.vue';
import PureCriteria from '@/components/PureCriteria.vue';

// import { PURE_QUERIES } from "@/graphql/queries";
// import { useQuery } from "@vue/apollo-composable";

const instance = getCurrentInstance();
let { proxy }: any = instance;
const isInitLoading = ref(true);
const basicStore = useBasicStore();
const emit = defineEmits(['updateSelect']);
const isAllChecked = ref(false);

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://www.antdv.com/',
        title: `ant design vue part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
const pagination = {
    onChange: (page: number) => {
        console.log(page);
    },
    pageSize: basicStore.pageSize,
    total: basicStore.total,
};


const selectAll = () => {
    basicStore.pureLists.forEach((item: any) => {
        item.checked = isAllChecked.value;
    });
};

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