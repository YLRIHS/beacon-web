<script setup lang="ts">
const props = defineProps<{
    info: any;

}>();
const emit = defineEmits(['goDetail']);

const goDetail = () => {
    emit('goDetail', props.info.nct_id)
}
</script>
<template>
    <div class="bg-white p-4 article_list_item rounded-md">
        <!-- {{ info }} -->
        <div class="flex gap-2 items-center">
            <a-checkbox v-model:checked="info.checked"> </a-checkbox>
            <span class="item_id text-gray-900 text-sm text-center font-bold  ">
                {{ info.nct_id }}
            </span>
            <template v-if="info.overall_status.length > 0">
                <template v-if="info.overall_status === 'COMPLETED' || info.overall_status === 'TERMINATED'">
                    <a-tag color="#cd201f">
                        {{ info.overall_status }}
                    </a-tag>
                </template>
                <template v-else-if="info.overall_status === 'RECRUITING'">
                    <a-tag color="#276e0f">
                        {{ info.overall_status }}
                    </a-tag>
                </template>
                <template v-else-if="info.overall_status === 'ACTIVE_NOT_RECRUITING'">
                    <a-tag color="#cd201f">
                        Active, not recruiting
                    </a-tag>
                </template>
                <template v-else-if="info.overall_status === 'NOT_YET_RECRUITING'">
                    <a-tag color="#008817">
                        {{ info.overall_status }}
                    </a-tag>
                </template>

                <template v-else>
                    <a-tag color="#cd201f">
                        {{ info.overall_status }}
                    </a-tag>
                </template>
            </template>

        </div>
        <p class=" item_official_title text-xl cursor-pointer py-3" @click.prevent="goDetail"> {{ info.brief_title }}
        </p>
        <div class="conditions_item">
            <p class="conditions text-sm text-gray-500">Conditions</p>
            <p class="condition_box">
                <template v-for="(tags) of info.conditions">
                    <a-tag :bordered="false" color="purple">{{ tags }}</a-tag>
                </template>
            </p>
        </div>

        <div>
            <p class="conditions text-sm text-gray-500">Locations</p>
            <div class="locations_box">
                <template v-for="(local) of info.locations">
                    <!-- {{ local }} -->
                    <p class="text-sm text-gray-700 flex items-center gap-1">

                        <HopeIconify icon="material-symbols:pin-drop-rounded" class="text-base" />
                        {{ local.city }},
                        <template v-if="local.state">
                            {{ local.state }} {{ local.zip }},
                        </template>
                        {{ local.country }}
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.article_list_item {
    border: 1px solid #e5e7eb;
}

.item_id,
.item_official_title {
    font-weight: 700;


}

.item_official_title {
    &:hover {
        text-decoration: underline;
    }
}

.conditions {
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
}

.conditions_item {
    margin-bottom: 14px;
}

.locations_box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    margin-top: 4px;
}

.condition_box {
    margin-top: 4px;
}
</style>