<script setup lang="ts">
import { reactive, ref, getCurrentInstance, watch, onMounted } from 'vue';
import { useBasicStore } from '@/stores/basic';
import { globalAPI } from "@/api";
import { clinicalTrialsGovAPI } from '@/api';
import dayjs, { Dayjs } from 'dayjs';

const instance = getCurrentInstance();
let { proxy }: any = instance;

const basicStore = useBasicStore();

const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

const emit = defineEmits(['updateSelect']);

const searchKwargs = reactive<any>({
    study_start_date_from: Dayjs,
    study_start_date_to: Dayjs,
    primary_completion_from: Dayjs,
    primary_completion_to: Dayjs,
    first_posted_from: Dayjs,
    first_posted_to: Dayjs,
    last_update_posted_from: Dayjs,
    last_update_posted_to: Dayjs,
    result_first_posted_from: Dayjs,
    result_first_posted_to: Dayjs,
    study_completion_form: Dayjs,
    study_completion_to: Dayjs,
});
const showFilter = ref(true);

const dateFormat = 'DD/MM/YYYY';


const rT = (data: any, keyword: any) => {
    const result = data.filter((item: any) => item.key === keyword)
    return result.length > 0 ? result : [
        {
            key: keyword,
            doc_count: 0
        }
    ]
}



const processFilter = (filter: any) => {
    const result = { ...filter };

    // Process each key in the filter object
    for (const key in result) {
        if (Array.isArray(result[key]) && result[key].length === 0) {
            // Remove empty arrays
            delete result[key];
        } else if (typeof result[key] === 'boolean') {
            if (result[key] === true) {
                // Convert true boolean values to string "true"
                result[key] = ['true'];
            } else {
                // Delete false boolean values
                delete result[key];
            }
        }
    }
    for (let key in result) {
        if (key === 'study_type' && Array.isArray(result[key])) {
            if (result[key].includes('study_type_observational_patient_registry')) {
                result['study_type_observational_patient_registry'] = ['true'];
                result[key] = result[key].filter((item: any) => item !== 'study_type_observational_patient_registry');
            }
            if (result[key].includes('study_type_expanded_access_individual')) {
                result['study_type_expanded_access_individual'] = ['true'];
                result[key] = result[key].filter((item: any) => item !== 'study_type_expanded_access_individual');
            }
            if (result[key].includes('study_type_expanded_access_intermediate')) {
                result['study_type_expanded_access_intermediate'] = ['true'];
                result[key] = result[key].filter((item: any) => item !== 'study_type_expanded_access_intermediate');
            }
            if (result[key].includes('study_type_expanded_access_treatment')) {
                result['study_type_expanded_access_treatment'] = ['true'];
                result[key] = result[key].filter((item: any) => item !== 'study_type_expanded_access_treatment');
            }

            // Only delete the key if the array is empty after filtering
            if (result[key].length === 0) {
                delete result[key];
            }
        } else if (key === 'funder_type_nih') {
            result['funder_type_nih'] = ['NIH'];
        } else if (key === 'funder_type_other_fed') {
            result['funder_type_other_fed'] = ['FED'];
        } else if (key === 'funder_type_industry') {
            result['funder_type_industry'] = ['INDUSTRY'];
        } else if (key === 'funder_type_other') {
            result['funder_type_other'] = ['OTHER'];
        }
    }

    return result;
}


const hasSelectedFilters = () => {
    let count = 0;
    // Check arrays for selected values
    for (const key in basicStore.filterSubmit) {
        if (Array.isArray(basicStore.filterSubmit[key]) && basicStore.filterSubmit[key].length > 0) {
            count += basicStore.filterSubmit[key].length;
        }
        // Check boolean values that are true
        else if (typeof basicStore.filterSubmit[key] === 'boolean' && basicStore.filterSubmit[key] === true) {
            count += 1;
        }
        // Check string values that are not empty
        else if (typeof basicStore.filterSubmit[key] === 'string' && basicStore.filterSubmit[key].length > 0) {
            count += 1;
        }
    }
    // searchKwargs的也需要记录下来
    for (const key in searchKwargs) {
        if (searchKwargs[key] && searchKwargs[key] !== '') {
            count += 1;
        }
    }

    return count > 0 ? count : false;
}



const apply_filter = () => {

    const sendSearchKwargs = JSON.parse(JSON.stringify(searchKwargs));

    for (const key in sendSearchKwargs) {
        if (sendSearchKwargs[key] === '' || sendSearchKwargs[key] === undefined || sendSearchKwargs[key] === null) {
            delete sendSearchKwargs[key];
        }
    }
    for (const key in sendSearchKwargs) {
        sendSearchKwargs[key] = dayjs(sendSearchKwargs[key]).format('YYYY-MM-DD');
    }


    // Add the date filters to the main filter object
    let dateFilters = Object.fromEntries(
        Object.entries(sendSearchKwargs).filter(([_, value]) => value !== '')
    );
    // setDateFilters
    basicStore.setDateFilters(dateFilters);
    getActiveFilters()
    // Process the filter data for display or analytics 

    // Merge with the existing filter data
    let sends = JSON.parse(JSON.stringify(basicStore.filterSubmit));
    let newSend = processFilter(sends);


    if (newSend['Sex'] && newSend['Sex'].length > 0) {
        const sexed = {
            [basicStore.tableFilterData[sends['Sex']].meta.field]: basicStore.tableFilterData[sends['Sex']].meta.values
        }
        newSend = {
            ...newSend,
            ...sexed
        }
    }
    if (newSend['Sex']) {
        delete newSend['Sex']
    }
    basicStore.setFilters(newSend);
    basicStore.resetPage();
    emit('updateSelect');
    // getSearchData()
}


// Extract values from filterSubmit that are true or have values
const getActiveFilters = () => {
    const activeFilters: any = {};

    for (const key in basicStore.filterSubmit) {
        const value = basicStore.filterSubmit[key];

        // Check if array has values
        if (Array.isArray(value) && value.length > 0) {
            activeFilters[key] = value;
        }
        // Check if boolean is true
        else if (value === true) {
            activeFilters[key] = true;
        }
        // Check if string has content
        else if (typeof value === 'string' && value.trim() !== '') {
            activeFilters[key] = value;
        }
    }

    return activeFilters;
}



const reset_filter = () => {
    basicStore.setFilters({})
    basicStore.clearKeyword()
    basicStore.clearFilterSubmit()
    basicStore.resetPage()
    // 将searchKwargs的值清空
    for (const key in searchKwargs) {
        searchKwargs[key] = '';
    }
    basicStore.setDateFilters({});
    emit('updateSelect');
    // getSearchData()
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

const getFilterMaps = () => {
    globalAPI.fetchFilterMaps().then((res: any) => {
        if (res && res.data) {
            basicStore.setFilterMaps(res.data)
        }
    }).catch(() => {

    })
}

onMounted(() => {
    getFilterMaps()
})

const handleSearch = () => {
    basicStore.setIsApplyFilter(true);
}

watch(() => basicStore.filterSubmit, (newVal: any) => {
    if (newVal) {
        basicStore.setIsApplyFilter(true);
    }
}, { deep: true })

watch(() => searchKwargs, (newVal: any) => {
    if (newVal) {
        basicStore.setIsApplyFilter(true);
    }
}, { deep: true })
</script>

<template>
    <div :class="[' h-full overflow-hidden flex flex-col bg-white border border-gray-300 rounded-lg', showFilter ? 'w-[320px]' : 'w-[26px]']"
        v-if="basicStore.tableFilterData && Object.keys(basicStore.tableFilterData).length > 0">
        <template v-if="showFilter">
            <div
                class="filter_header h-[60px] flex justify-between items-center px-4 bg-white border-b border-gray-300 ">
                <div class="flex-1 flex flex-col   items-start justify-center">
                    <span class="fonts_bold">FILTER</span>

                </div>
                <div class="filter_tool" @click="showFilter = !showFilter">
                    <PureIcon icon="material-symbols:double-arrow-rounded" class="text-2xl rotate-180 cursor-pointer" />
                </div>
            </div>
            <div class="filter_content flex-1 overflow-auto ">
                <template v-if="basicStore.tableFilterData && Object.keys(basicStore.tableFilterData).length > 0">

                    <div class="study_status border-b border-gray-300   flex flex-col gap-3  p-4">
                        <p class="sea_title   text-lg">Study Status</p>
                        <a-checkbox-group class="w-full flex flex-col gap-4 overflow-hidden"
                            v-model:value="basicStore.filterSubmit['study_status']">
                            <p class="nor_title">Looking for participants</p>
                            <div class="flex flex-col gap-2 pl-1 text-base">
                                <a-checkbox :value="rT(basicStore.tableFilterData.study_status.buckets,
                                    'NOT_YET_RECRUITING')[0].key">
                                    Not yet recruiting ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'NOT_YET_RECRUITING')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox :value="rT(basicStore.tableFilterData.study_status.buckets,
                                    'RECRUITING')[0].key">
                                    Recruiting ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'RECRUITING')[0].doc_count }})
                                </a-checkbox>
                            </div>

                            <p class="nor_title">No longer looking for participants</p>
                            <div class="flex flex-col gap-2 pl-1">
                                <!-- ACTIVE_NOT_RECRUITING,COMPLETED,TERMINATED -->
                                <a-checkbox
                                    v-if="rT(basicStore.tableFilterData.study_status.buckets, 'ACTIVE_NOT_RECRUITING')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'ACTIVE_NOT_RECRUITING')[0].key">
                                    Active, not recruiting ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'ACTIVE_NOT_RECRUITING')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'COMPLETED')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'COMPLETED')[0].key">
                                    Completed ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'COMPLETED')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'TERMINATED')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'TERMINATED')[0].key">
                                    Terminated ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'TERMINATED')[0].doc_count }})
                                </a-checkbox>
                            </div>
                            <p class="nor_title">Other</p>
                            <div class="flex flex-col gap-2 pl-1">
                                <!-- ENROLLING_BY_INVITATION,SUSPENDED,WITHDRAWN,UNKNOWN -->
                                <a-checkbox
                                    v-if="rT(basicStore.tableFilterData.study_status.buckets, 'ENROLLING_BY_INVITATION')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'ENROLLING_BY_INVITATION')[0].key">
                                    Enrolling by invitation ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'ENROLLING_BY_INVITATION')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'SUSPENDED')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'SUSPENDED')[0].key">
                                    Suspended ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'SUSPENDED')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'WITHDRAWN')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'WITHDRAWN')[0].key">
                                    Withdrawn ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'WITHDRAWN')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'UNKNOWN')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'UNKNOWN')[0].key">
                                    Unknown ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'UNKNOWN')[0].doc_count }})
                                </a-checkbox>
                            </div>
                            <p class="nor_title">Expanded access </p>
                            <div class="flex flex-col gap-2 pl-1">
                                <!-- AVAILABLE,NO_LONGER_AVAILABLE,TEMPORARILY_NOT_AVAILABLE,APPROVED_FOR_MARKETING-->
                                <a-checkbox v-if="rT(basicStore.tableFilterData.study_status.buckets, 'AVAILABLE')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'AVAILABLE')[0].key">
                                    Available ({{
                                        rT(basicStore.tableFilterData.study_status.buckets, 'AVAILABLE')[0].doc_count }})
                                </a-checkbox>

                                <a-checkbox
                                    v-if="rT(basicStore.tableFilterData.study_status.buckets, 'NO_LONGER_AVAILABLE')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'NO_LONGER_AVAILABLE')[0].key">
                                    No longer available ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'NO_LONGER_AVAILABLE')[0].doc_count
                                    }})
                                </a-checkbox>
                                <a-checkbox
                                    v-if="rT(basicStore.tableFilterData.study_status.buckets, 'TEMPORARILY_NOT_AVAILABLE')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'TEMPORARILY_NOT_AVAILABLE')[0].key">
                                    Temporarily not available ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'TEMPORARILY_NOT_AVAILABLE')[0].doc_count }})
                                </a-checkbox>
                                <a-checkbox
                                    v-if="rT(basicStore.tableFilterData.study_status.buckets, 'APPROVED_FOR_MARKETING')"
                                    :value="rT(basicStore.tableFilterData.study_status.buckets, 'APPROVED_FOR_MARKETING')[0].key">
                                    Approved for marketing ({{
                                        rT(basicStore.tableFilterData.study_status.buckets,
                                            'APPROVED_FOR_MARKETING')[0].doc_count }})
                                </a-checkbox>
                            </div>

                        </a-checkbox-group>
                    </div>

                    <div class="eligibility_criteria border-b border-gray-300  flex flex-col gap-3    p-4">
                        <p class="sea_title   text-lg">Eligibility Criteria</p>
                        <div class="flex flex-col gap-2">
                            <p class="nor_title">
                                Sex
                            </p>
                            <div class="pl-1">
                                <a-radio-group v-model:value="basicStore.filterSubmit['Sex']">
                                    <a-radio :style="radioStyle"
                                        :value="basicStore.tableFilterData.eligibility_criteria_sex_all.meta.field">
                                        All ({{ basicStore.tableFilterData.eligibility_criteria_sex_all.doc_count }})
                                    </a-radio>
                                    <a-radio :style="radioStyle"
                                        :value="basicStore.tableFilterData.eligibility_criteria_sex_female.meta.field">
                                        Female ({{ basicStore.tableFilterData.eligibility_criteria_sex_female.doc_count
                                        }})
                                    </a-radio>
                                    <a-radio :style="radioStyle"
                                        :value="basicStore.tableFilterData.eligibility_criteria_sex_male.meta.field">
                                        Male ({{ basicStore.tableFilterData.eligibility_criteria_sex_male.doc_count }})
                                    </a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="nor_title">
                                Age
                            </p>
                            <a-checkbox-group class="flex flex-col gap-1 pl-1 w-full"
                                v-model:value="basicStore.filterSubmit['eligibility_criteria_ages']">
                                <a-checkbox :value="rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                    'CHILD')[0].key">
                                    Child (birth - 17) ({{
                                        rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                            'CHILD')[0].doc_count }})
                                </a-checkbox>
                                <a-checkbox :value="rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                    'ADULT')[0].key">
                                    Adult (18 - 64) ({{
                                        rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                            'ADULT')[0].doc_count
                                    }})
                                </a-checkbox>
                                <a-checkbox :value="rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                    'OLDER_ADULT')[0].key">
                                    Older adult (65+) ({{
                                        rT(basicStore.tableFilterData.eligibility_criteria_ages.buckets,
                                            'OLDER_ADULT')[0].doc_count }})
                                </a-checkbox>
                            </a-checkbox-group>

                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="nor_title">
                                Accepts healthy volunteers
                            </p>
                            <div class="flex flex-col pl-1">
                                <a-checkbox
                                    v-model:checked="basicStore.filterSubmit['eligibility_criteria_volunteers']">
                                    Yes ({{
                                        rT(basicStore.tableFilterData.eligibility_criteria_volunteers.buckets,
                                            1)[0].doc_count }})
                                </a-checkbox>
                            </div>

                        </div>
                    </div>

                    <div class=" study_phase border-b border-gray-300   flex flex-col gap-3   p-4">
                        <p class="sea_title   text-lg">Study Phase</p>
                        <div>
                            <div class="flex flex-col gap-1 pl-1">
                                <a-checkbox-group class="flex flex-col gap-1 pl-1 w-full"
                                    v-model:value="basicStore.filterSubmit['study_phase']">
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'EARLY_PHASE1')[0].key">
                                        Early Phase 1 ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'EARLY_PHASE1')[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'PHASE1')[0].key">
                                        Phase 1 ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'PHASE1')[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'PHASE2')[0].key">
                                        Phase 2 ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'PHASE2')[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'PHASE3')[0].key">
                                        Phase 3 ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'PHASE3')[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'PHASE4')[0].key">
                                        Phase 4 ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'PHASE4')[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="rT(basicStore.tableFilterData.study_phase.buckets,
                                        'NA')[0].key">
                                        Not applicable ({{
                                            rT(basicStore.tableFilterData.study_phase.buckets,
                                                'NA')[0].doc_count }})
                                    </a-checkbox>
                                </a-checkbox-group>


                            </div>
                        </div>
                    </div>

                    <div class=" study_type border-b border-gray-300   p-4 flex flex-col gap-3">
                        <p class="sea_title   text-lg">Study Type </p>
                        <a-checkbox-group class="flex flex-col gap-2 pl-1 w-full"
                            v-model:value="basicStore.filterSubmit['study_type']">
                            <a-checkbox :value="rT(basicStore.tableFilterData.study_type.buckets,
                                'INTERVENTIONAL')[0].key">
                                Interventional ({{
                                    rT(basicStore.tableFilterData.study_type.buckets,
                                        'INTERVENTIONAL')[0].doc_count }})
                            </a-checkbox>
                            <div class="flex flex-col gap-2  ">
                                <a-checkbox :value="rT(basicStore.tableFilterData.study_type.buckets,
                                    'OBSERVATIONAL')[0].key">
                                    Observational ({{
                                        rT(basicStore.tableFilterData.study_type.buckets,
                                            'OBSERVATIONAL')[0].doc_count }})
                                </a-checkbox>
                                <div class="pl-[22px]">
                                    <a-checkbox :value="'study_type_observational_patient_registry'">
                                        Patient registries ({{
                                            rT(basicStore.tableFilterData.study_type_observational_patient_registry.buckets,
                                                1)[0].doc_count }})
                                    </a-checkbox>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2  ">
                                <a-checkbox :value="rT(basicStore.tableFilterData.study_type.buckets,
                                    'EXPANDED_ACCESS')[0].key">
                                    Expanded access ({{
                                        rT(basicStore.tableFilterData.study_type.buckets,
                                            'EXPANDED_ACCESS')[0].doc_count }})
                                </a-checkbox>
                                <div class="pl-[22px] flex flex-col gap-2">
                                    <a-checkbox :value="'study_type_expanded_access_individual'">
                                        Individual patients ({{
                                            rT(basicStore.tableFilterData.study_type_expanded_access_individual.buckets,
                                                1)[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="'study_type_expanded_access_intermediate'">
                                        Intermediate-size population ({{
                                            rT(basicStore.tableFilterData.study_type_expanded_access_intermediate.buckets,
                                                1)[0].doc_count }})
                                    </a-checkbox>
                                    <a-checkbox :value="'study_type_expanded_access_treatment'">
                                        Treatment IND/Protocol ({{
                                            rT(basicStore.tableFilterData.study_type_expanded_access_treatment.buckets,
                                                1)[0].doc_count }})
                                    </a-checkbox>
                                </div>
                            </div>
                        </a-checkbox-group>
                    </div>

                    <div class="study_results border-b border-gray-300  flex flex-col gap-3 p-4">
                        <p class="sea_title text-lg">Study Results</p>
                        <div class="flex flex-col gap-2 pl-1">
                            <a-checkbox-group class="flex flex-col gap-2 pl-1 w-full"
                                v-model:value="basicStore.filterSubmit['with_results']">
                                <a-checkbox :value="rT(basicStore.tableFilterData.with_results.buckets,
                                    1)[0].key_as_string">
                                    With results ({{
                                        rT(basicStore.tableFilterData.with_results.buckets,
                                            1)[0].doc_count }})
                                </a-checkbox>
                                <a-checkbox :value="rT(basicStore.tableFilterData.with_results.buckets,
                                    0)[0].key_as_string">
                                    Without results ({{
                                        rT(basicStore.tableFilterData.with_results.buckets,
                                            0)[0].doc_count }})
                                </a-checkbox>
                            </a-checkbox-group>



                        </div>
                    </div>

                    <div class="study_documents border-b border-gray-300   flex flex-col gap-3  p-4">
                        <p class="sea_title text-lg">Study Documents </p>
                        <div class="flex flex-col gap-2 pl-1">
                            <a-checkbox v-model:checked="basicStore.filterSubmit['document_section_has_protocol']">
                                Study protocols ({{
                                    rT(basicStore.tableFilterData.document_section_has_protocol.buckets,
                                        1)[0].doc_count }})
                            </a-checkbox>
                            <a-checkbox v-model:checked="basicStore.filterSubmit['document_section_has_sap']">
                                Statistical analysis plans ({{
                                    rT(basicStore.tableFilterData.
                                        document_section_has_sap.buckets,
                                        1)[0].doc_count }})
                            </a-checkbox>
                            <a-checkbox v-model:checked="basicStore.filterSubmit['document_section_has_icf']">
                                Informed consent forms ({{
                                    rT(basicStore.tableFilterData.document_section_has_icf
                                        .buckets,
                                        1)[0].doc_count }})
                            </a-checkbox>

                        </div>

                    </div>
                    <div class="study_documents border-b border-gray-300  flex flex-col gap-3  p-4">
                        <p class="sea_title text-lg">Funder Type </p>
                        <a-checkbox v-model:checked="basicStore.filterSubmit['funder_type_nih']">
                            NIH ({{ basicStore.tableFilterData.funder_type_nih.doc_count }})
                        </a-checkbox>
                        <a-checkbox v-model:checked="basicStore.filterSubmit['funder_type_other_fed']">
                            Other U.S. federal agency ({{
                                basicStore.tableFilterData.funder_type_other_fed.doc_count
                            }})
                        </a-checkbox>
                        <a-checkbox v-model:checked="basicStore.filterSubmit['funder_type_industry']">
                            Industry ({{ basicStore.tableFilterData.funder_type_industry.doc_count }})
                        </a-checkbox>
                        <a-checkbox v-model:checked="basicStore.filterSubmit['funder_type_other']">
                            All others (individuals, universities, organizations) ({{
                                basicStore.tableFilterData.funder_type_other.doc_count }})
                        </a-checkbox>
                    </div>
                    <div class="study_document border-b border-gray-300   flex flex-col gap-3   p-4">
                        <p class="sea_title text-lg">Date Range </p>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                Study start
                            </p>
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.study_start_date_from" :format="dateFormat"
                                    placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.study_start_date_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>

                            <!-- <a-range-picker v-model:value="study_start" :format="dateFormat" /> -->
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                Primary completion
                            </p>
                            <!-- <a-range-picker v-model:value="primary_completion" :format="dateFormat" /> -->
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.primary_completion_from" :format="dateFormat"
                                    placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.primary_completion_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                First posted
                            </p>
                            <!-- <a-range-picker v-model:value="first_posted" :format="dateFormat" /> -->
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.first_posted_from" :format="dateFormat"
                                    placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.first_posted_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                Results first posted
                            </p>
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.result_first_posted_from"
                                    :format="dateFormat" placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.result_first_posted_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>
                            <!-- <a-range-picker v-model:value="results_first_posted" :format="dateFormat" /> -->
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                Last update posted
                            </p>
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.last_update_posted_from" :format="dateFormat"
                                    placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.last_update_posted_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>
                            <!-- <a-range-picker v-model:value="last_update_posted" :format="dateFormat" /> -->
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="nor_title">
                                Study completion
                            </p>
                            <p class="flex gap-2">
                                <a-date-picker v-model:value="searchKwargs.study_completion_form" :format="dateFormat"
                                    placeholder="Start date" />
                                <a-date-picker v-model:value="searchKwargs.study_completion_to" :format="dateFormat"
                                    placeholder="End date" />
                            </p>
                            <!-- <a-range-picker v-model:value="study_completion" :format="dateFormat" /> -->
                        </div>

                    </div>
                </template>

            </div>
            <div class="filter_bottom flex py-2 px-4 justify-between gap-2 bg-gray-100 border-t border-gray-300">
                <a-button class="flex-1" @click.prevent="reset_filter" :disabled="!hasSelectedFilters()">Clear Filters
                    {{
                        hasSelectedFilters() ? `
                    (${hasSelectedFilters()})` : ''
                    }}</a-button>
                <a-button class="flex-1" type="primary" @click.prevent="apply_filter"
                    :disabled="!basicStore.isApplyFilter">
                    Apply Filters
                </a-button>
            </div>
        </template>
        <template v-else>
            <div
                class="filter_header h-[60px] flex justify-between items-center   bg-gray-100 border-b border-gray-300 ">
                <div class="filter_tool" @click="showFilter = !showFilter">
                    <PureIcon icon="material-symbols:double-arrow-rounded" class="text-2xl  cursor-pointer" />
                </div>
            </div>
        </template>

    </div>
</template>


<style lang="scss">
.fonts_bold {
    font-weight: bold;
}

.sea_title {
    font-weight: bold;
}

.nor_title {
    font-weight: bold;
    font-size: 16px;
    word-break: break-word;
    width: 100%;
    white-space: pre-line;
}

.filter_content {

    .ant-checkbox-wrapper,
    .ant-radio-wrapper {
        font-size: 16px;
    }
}
</style>