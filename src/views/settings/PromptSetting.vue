<template>
    <div class="w-full h-full bg-gray-100 p-4">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <div class=" func_box w-full h-full  overflow-hidden flex justify-between gap-2.5 ">
                <div
                    class="func_call_left_box  p-2 w-[260px] bg-white rounded-lg h-full bg-theme-body flex flex-col gap-2.5 overflow-auto">

                    <template v-for="(info) of promptLibList">
                        <p :class="[' leading-10  text-sm cursor-pointer rounded-lg py-0 px-2.5 border border-white', activeLibInfo.value === info.value ? ' bg-purple-50 text-purple-500  border-purple-200' : ' ']"
                            @click.prevent="cuts(info)">
                            {{ info.label }}
                        </p>
                    </template>


                </div>

                <template v-if="Object.keys(currentFuncInfo).length > 0">
                    <div class="flex-1 h-full bg-theme-body bg-white p-5 rounded-lg flex flex-col gap-5">
                        <template v-if="activePromptLibsLoading">
                            <LoadingSpin />
                        </template>
                        <template v-else>
                            <div class="base_info_items relative rounded-lg ">
                                <span class="base_title absolute bg-white font-bold">Model</span>
                                <div class=" flex flex-col gap-2.5">

                                    <div class="base_info_item flex gap-5 items-center  mb-5">
                                        <div class="cont  flex flex-1 cursor-pointer items-center gap-1.5">
                                            <a-select v-model:value="currentFuncInfo.instructionModelName" show-search
                                                placeholder="Select a Model" :allowClear="true" style="width: 300px"
                                                :options="filterModelOption" @change="handleChange"></a-select>
                                        </div>
                                    </div>
                                    <template v-if="currentFuncInfo && currentFuncInfo.instructionModelConfig">
                                        <div class="flex items-center gap-2.5">
                                            <p class="flex items-center gap-0.5">
                                                <span class="font-medium">Temperature: </span>
                                                <a-input-number
                                                    v-model:value="currentFuncInfo.instructionModelConfig.temperature"
                                                    :min="0" :max="1" @change="handleChange" />
                                            </p>
                                            <p class="flex items-center gap-0.5">
                                                <span class="font-medium"> Top p: </span>
                                                <a-input-number
                                                    v-model:value="currentFuncInfo.instructionModelConfig.topP" :min="0"
                                                    :max="1" @change="handleChange" />
                                            </p>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="base_info_items relative rounded-lg flex-1">
                                <span class="base_title absolute bg-white font-bold">Prompt</span>
                                <div class="w-full h-full flex gap-2.5 overflow-hidden">
                                    <div class="h-full flex flex-col gap-2.5 w-1/2 ">
                                        <span class="font-medium text-sm">System Prompt</span>
                                        <a-textarea class="flex-1" v-model:value="currentFuncInfo.systemPrompt"
                                            auto-size style="height: 100%!important;" @change="handleChange" />
                                    </div>
                                    <div class="h-full flex flex-col gap-2.5 w-1/2 ">
                                        <span class="font-medium text-sm">Instructions Prompt</span>
                                        <a-textarea class="flex-1" v-model:value="currentFuncInfo.instructionPrompt"
                                            auto-size style="height: 100%!important;" @change="handleChange" />
                                    </div>
                                </div>
                            </div>
                            <div class="relative flex justify-end gap-2.5">
                                <a-button @click.prevent="cancelFun">Cancel</a-button>
                                <a-button type="primary" :disabled="!isChange" :loading="confirmLoading"
                                    @click.prevent="save">Save</a-button>
                            </div>
                        </template>

                    </div>
                </template>
                <template v-else>
                    <div class="w-full h-full flex justify-center items-center bg-white rounded-lg">
                        <a-empty description="No data available" />
                    </div>
                </template>
            </div>
        </template>


    </div>
</template>

<script setup lang="ts">
import LoadingSpin from "@/components/common/LoadingSpin.vue";
import { watch, ref, getCurrentInstance, onMounted } from "vue";
import { PROJECT_MUTATIONS } from "@/graphql/mutations"
import { PURE_QUERIES } from "@/graphql/queries";
import { useQuery, useMutation } from "@vue/apollo-composable";

import { useProjectService } from '@/services';
const projectService = useProjectService();

const instance = getCurrentInstance();
let { proxy }: any = instance;


const confirmLoading = ref(false);
const currentFuncInfo = ref<any>({
    id: '',
    systemPrompt: '',
    instructionPrompt: '',
    instructionModelName: '',
    instructionModelConfig: {
        temperature: 0,
        topP: 0
    }
});
const activeLibInfo = ref<any>({});
const isChange = ref(false);
const promptLibList = ref<any[]>([]);
const filterModelOption = ref<any[]>([]);
type SearchParams = {
    id: string;
};
const isChangeSearchParams = ref(false);
const searchParams = ref<SearchParams>({
    id: '',
});

const { result: promptListResult, loading: isLoading, refetch: PromptLibRefetch } = useQuery<any>(PURE_QUERIES.GET_PROMPT_LIB_LIST);

const { result: LLMModelList, refetch: LLMModelListRefetch } = useQuery<any>(PURE_QUERIES.GET_LLM_MODEL_LIST);

const { mutate: updatePrompt } = useMutation(PROJECT_MUTATIONS.CREATE_OR_UPDATE_PROMPT_LIB);


const cuts = (info: any) => {
    if (isChange.value) {
        proxy.$message.warning('Please save the current changes before switching.');
        return;
    }
    activeLibInfo.value = info;

}

const handleChange = () => {

    isChange.value = true;
}

const save = async () => {
    try {
        // updatePrompt
        const res = await updatePrompt({
            id: currentFuncInfo.value.id,
            systemPrompt: currentFuncInfo.value.systemPrompt,
            instructionPrompt: currentFuncInfo.value.instructionPrompt,
            instructionModelName: currentFuncInfo.value.instructionModelName,
            instructionModelConfig: {
                temperature: currentFuncInfo.value.instructionModelConfig.temperature,
                topP: currentFuncInfo.value.instructionModelConfig.topP
            }
        })
        if (res) {
            confirmLoading.value = false;
            isChange.value = false;
            proxy.$message.success('Save successful');

        }
    } catch (e) {
        console.log('save error', e)
    }
}
const cancelFun = () => {
    isChange.value = false;


}


const { GetPromptLibById, loading: activePromptLibsLoading, onError } = projectService.getPromptLibById({
    ids: searchParams,
    enable: isChangeSearchParams,
});
onError(() => {
    currentFuncInfo.value = {
        id: searchParams.value.id,
        systemPrompt: '',
        instructionPrompt: '',
        instructionModelName: '',
        instructionModelConfig: {
            temperature: 0,
            topP: 0
        }
    }
});

watch(() => GetPromptLibById.value, (val) => {
    if (val && Object.keys(val).length > 0) {
        currentFuncInfo.value = {
            id: val.id,
            systemPrompt: val.systemPrompt,
            instructionPrompt: val.instructionPrompt,
            instructionModelName: val.instructionModelName,
            instructionModelConfig: {
                temperature: val.instructionModelConfig.temperature,
                topP: val.instructionModelConfig.topP
            }
        }
    }

}, { immediate: true, deep: true })


watch(() => promptListResult.value, (val) => {

    if (val && val.GetPromptLibList && val.GetPromptLibList.length > 0) {
        promptLibList.value = val.GetPromptLibList.map((item: any) => {
            return {
                label: item.label,
                value: item.value
            }
        });
        activeLibInfo.value = promptLibList.value[0];
    } else {
        promptLibList.value = [];
    }
}, { immediate: true, deep: true })

watch(() => LLMModelList.value, (val) => {
    if (val && val.GetLlmModelList && val.GetLlmModelList.length > 0) {
        filterModelOption.value = val.GetLlmModelList.map((item: any) => {
            return {
                label: item.value,
                value: item.key
            }
        });
    } else {
        filterModelOption.value = [];
    }
}, { immediate: true, deep: true })



watch(() => activeLibInfo.value, (val) => {
    if (val && val.value && val.value !== '') {
        const dats = {
            id: val.value,
        }
        isChangeSearchParams.value = true;
        searchParams.value = dats;

    }
}, { immediate: true, deep: true })




onMounted(() => {
    LLMModelListRefetch()
    PromptLibRefetch()
})


</script>

<style lang="scss" scoped>
.base_info_items {
    padding: 16px 20px;
    border: 1px solid #f0f0f0;

    .base_title {
        left: 20px;
        top: -16px;
        height: 30px;
        line-height: 30px;
        z-index: 12;
        padding: 0 20px;
    }

    .bottom_content {
        right: 20px;
        bottom: -16px;
        height: 30px;
        line-height: 30px;
        z-index: 12;
        padding: 0 14px;
        color: #666;

    }

}
</style>