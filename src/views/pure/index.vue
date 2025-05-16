<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue';
import PureDataFilter from "@/components/PureDataFilter.vue";
import PureContent from "@/components/PureContent.vue";
import { useProjectService } from '@/services';
import { useBasicStore } from '@/stores/basic';

const basicStore = useBasicStore();
const iseSearchEnabled = ref(false);
const projectService = useProjectService();

const instance = getCurrentInstance();
let { proxy }: any = instance;
const searchParams = ref<any>({
    keywords: '',
    indication: 'MM',
    page_idx: 0,
    page_size: 10,
})

const { SearchCtgov, refetch: SearchReftch, onError } = projectService.getSearchCtGov({
    kwargs: searchParams,
    enable: iseSearchEnabled.value
});



onError((err: any) => {
    console.log('onError', err)
    basicStore.setTableLoading(false);
    basicStore.setPureLists([])
    basicStore.setTotal(0)
    iseSearchEnabled.value = false;
    proxy.$loadingBar.error();
})
const getSearchCTGov = async () => {
    basicStore.setTableLoading(true)
    proxy.$loadingBar.start();
    searchParams.value.keywords = basicStore.keyword
    searchParams.value.indication = basicStore.currentIndicationLabel.id
    searchParams.value.page_idx = Math.max(0, basicStore.pageIdx - 1)
    searchParams.value.page_size = basicStore.pageSize;
    if (basicStore.filters && Object.keys(basicStore.filters).length > 0) {
        const filters = JSON.parse(JSON.stringify(basicStore.filters));
        searchParams.value['filters'] = Object.entries(filters).flatMap(([key, values]: any) =>
            values.map((value: any) => ({ key: key, values: value }))
        );

    } else {
        searchParams.value['filters'] = []
    }
    if (basicStore.dateFilters && Object.keys(basicStore.dateFilters).length > 0) {
        searchParams.value = { ...searchParams.value, ...basicStore.dateFilters }
    }
    iseSearchEnabled.value = true;
    getFilterStr()
    await SearchReftch()
    basicStore.setTableLoading(false);
    iseSearchEnabled.value = false;
    basicStore.setIsApplyFilter(false)
    proxy.$loadingBar.finish();
}

const getFilterStr = () => {
    // Get human-readable filter names from filterMaps based on keys in basicStore.filters
    const result = [];
    const filters = basicStore.filters;
    const filterMaps = basicStore.filterMaps;

    if (filters && filterMaps) {
        for (const key in filters) {
            // Skip empty arrays or falsy values
            if (!filters[key] || (Array.isArray(filters[key]) && filters[key].length === 0)) {
                continue;
            }

            // Find the corresponding name in filterMaps
            if (filterMaps[key]) {
                const filterName = filterMaps[key].Name || key;
                const filterValue = Array.isArray(filters[key]) ? filters[key].join(', ') : filters[key];
                result.push({
                    key: key,
                    name: filterName,
                    value: filterValue
                });
            } else {
                // Handle special date filters or other unmapped filters
                // Use a more readable format for keys like study_start_date_from
                const readableName = key
                    .replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase();

                result.push({
                    key: key,
                    name: readableName,
                    value: filters[key]
                });
            }
        }
    }

    basicStore.setFilterStr(result);
}

watch(() => basicStore.currentIndicationLabel.id, (newVal) => {
    if (newVal) {
        basicStore.setFilters({})
        basicStore.clearFilterSubmit()
        basicStore.clearKeyword()
        basicStore.resetPage()

        getSearchCTGov()

    }
}, { immediate: true })

watch(() => SearchCtgov.value, (newVal) => {
    if (newVal) {
        if (newVal && newVal.data && newVal.data.length > 0) {
            basicStore.setPureLists(newVal.data)
            basicStore.setTotal(newVal.total)
            basicStore.setTableFilterData(newVal.aggs)
        } else {
            basicStore.setPureLists([])
        }
    }
}, { immediate: true })


</script>

<template>
    <div class="all_tables flex-1 overflow-hidden   flex justify-between flex-col gap-4 px-5 py-4 ">
        <div class="search_box   flex justify-between bg-white p-1 rounded-md border border-[#e5e5e5]">

            <a-input class="!border-0 focus:!border-0 focus:!shadow-none" placeholder='Clinical Trial' />
            <a-button type="primary" size="large" class="font-bold">
                <PureIcon icon="material-symbols:search-rounded" class="inline text-lg" />
                Search
            </a-button>
        </div>
        <div class="flex-1 overflow-hidden   flex justify-between gap-4">
            <PureDataFilter @updateSelect="getSearchCTGov" />
            <PureContent @changePage="getSearchCTGov" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.all_tables {
    background: #fbf8f8;
}
</style>