<template>
    <div class="flex-1 h-full overflow-hidden flex flex-col gap-4">
        <template v-if="basicStore.tableLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <div class="flex flex-1  flex-col items-center gap-4  overflow-hidden">
                <div class="data_base_tool flex justify-between w-full">
                    <div class="flex items-center gap-2">
                        <a-button type="primary">
                            <PureIcon icon="material-symbols:notifications-outline" class="inline text-lg" />
                            Create Alert
                        </a-button>
                        <a-button type="primary" ghost>
                            <PureIcon icon="mdi-light:note-text" class="inline text-lg" />
                            Export Results
                        </a-button>
                    </div>
                </div>
                <div
                    class="list_checkbox bg-white w-full flex items-center justify-between px-4 py-2 rounded-md border border-[#e5e5e5]">
                    <a-checkbox class="!border-0 !bg-transparent !text-[#000] !p-0 !m-0">
                        <!-- @change="select_all_to_costom" -->
                        Select All
                    </a-checkbox>
                </div>
                <div class="flex flex-1 overflow-auto">
                    <a-list item-layout="vertical" :pagination="pagination" :data-source="listData">

                        <template #renderItem="{ item }">
                            <a-list-item key="item.title" class="bg-white !mb-3 border !border-[#e5e5e5] rounded-md">
                                <template #actions>
                                    <span v-for="{ icon, text } in actions" :key="icon">
                                        <component :is="icon" style="margin-right: 8px" />
                                        {{ text }}
                                    </span>
                                </template>
                                <template #extra>
                                    <img width="272" alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                                </template>
                                <a-list-item-meta :description="item.description">
                                    <template #title>
                                        <a :href="item.href">{{ item.title }}</a>
                                    </template>
                                    <template #avatar><a-avatar :src="item.avatar" /></template>
                                </a-list-item-meta>
                                {{ item.content }}
                            </a-list-item>
                        </template>
                    </a-list>
                </div>
            </div>
        </template>
    </div>

</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, watch, reactive } from 'vue';//onMounted
import { useBasicStore } from '@/stores/basic';
import LoadingSpin from '@/components/common/LoadingSpin.vue';

import { clinicalTrialsGovAPI } from '@/api';

// import { PURE_QUERIES } from "@/graphql/queries";
// import { useQuery } from "@vue/apollo-composable";

const instance = getCurrentInstance();
let { proxy }: any = instance;
const isInitLoading = ref(true);
const basicStore = useBasicStore();
const emit = defineEmits(['updateSelect']);

import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
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
    pageSize: 10,
};

const actions: Record<string, any>[] = [
    { icon: StarOutlined, text: '156' },
    { icon: LikeOutlined, text: '156' },
    { icon: MessageOutlined, text: '2' },
];







const getSearchData = () => {
    basicStore.setTableLoading(true)
    proxy.$loadingBar.start();
    let sendData: any = {
        keyword: basicStore.keyword,
        page_idx: Math.max(0, basicStore.pageIdx - 1),
        page_size: basicStore.pageSize,
        indication: basicStore.currentIndicationLabel.id,
    }
    if (basicStore.filters && Object.keys(basicStore.filters).length > 0) {
        sendData['filters'] = basicStore.filters
    }
    if (basicStore.dateFilters && Object.keys(basicStore.dateFilters).length > 0) {
        sendData = { ...sendData, ...basicStore.dateFilters }
    }
    clinicalTrialsGovAPI.searchDatabase(sendData).then((res: any) => {
        if (res && res.data) {
            // Add a unique key to each row of data
            const dataWithKeys = res.data.data && res.data.data.length > 0
                ? res.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: item.nct_number || `row-${index}-${Date.now()}` // Use NCT number as key or generate one
                }))
                : [];
            basicStore.setTableInfo({
                data: dataWithKeys,
                headers: res.data.headers
            })

            basicStore.setTotal(res.data.totals)
            basicStore.setTableFilterData(res.data.aggs)
        } else {
            basicStore.setTableInfo({
                data: [],
                headers: []
            })
        }
        proxy.$loadingBar.finish();
    }).catch(() => {

        proxy.$loadingBar.error();
    }).finally(() => {
        proxy.$loadingBar.finish();
        isInitLoading.value = false;
        basicStore.setTableLoading(false)
    })
}


// watch(() => basicStore.currentIndicationLabel.id, (newVal) => {
//     if (newVal) {
//         basicStore.setFilters({})
//         basicStore.clearFilterSubmit()
//         basicStore.clearKeyword()
//         basicStore.resetPage()
//         getSearchData()


//     }
// }, { immediate: true })


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