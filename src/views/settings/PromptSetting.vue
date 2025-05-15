<template>
    <div class="w-full h-full bg-gray-100 p-4">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <div class=" func_box w-full h-full  overflow-hidden flex justify-between gap-2.5 ">
                <div
                    class="func_call_left_box  p-2 w-[260px] bg-white rounded-lg h-full bg-theme-body flex flex-col gap-2.5 overflow-auto">

                    <template v-for="(info) of funcTools">
                        <p :class="[' leading-10  text-sm cursor-pointer rounded-lg py-0 px-2.5 border border-white', activeFuncInfo.value === info.value ? ' bg-purple-50 text-purple-500  border-purple-200' : ' ']"
                            @click.prevent="cuts(info)">
                            {{ info.label }}
                        </p>
                    </template>


                </div>
                {{ activeFuncInfo }}
                {{ currentFuncInfo }}
                <template v-if="Object.keys(currentFuncInfo).length > 0">
                    <div class="flex-1 h-full bg-theme-body bg-white p-5 rounded-lg flex flex-col gap-5">
                        <template v-if="activePromptLibsLoading">
                            <LoadingSpin />
                        </template>
                        <template v-else>
                            <div class="base_info_items relative rounded-lg ">
                                <span class="base_title absolute bg-white font-bold">Model</span>
                                <div class=" flex flex-col gap-2.5">
                                    <!-- {{ currentFuncInfo }} -->
                                    <div class="base_info_item flex gap-5 items-center  mb-5">
                                        <div class="cont  flex flex-1 cursor-pointer items-center gap-1.5">
                                            <a-select v-model:value="currentFuncInfo.instruction_model_name" show-search
                                                placeholder="Select a Model" :allowClear="true" style="width: 300px"
                                                :options="filterModelOption" @change="handleChange"></a-select>
                                        </div>
                                    </div>
                                    <template v-if="currentFuncInfo && currentFuncInfo.instruction_model_config">
                                        <div class="flex items-center gap-2.5">
                                            <p class="flex items-center gap-0.5">
                                                <span class="font-medium">Temperature: </span>
                                                <a-input-number
                                                    v-model:value="currentFuncInfo.instruction_model_config.temperature"
                                                    :min="0" :max="1" @change="handleChange" />
                                            </p>
                                            <p class="flex items-center gap-0.5">
                                                <span class="font-medium"> Top p: </span>
                                                <a-input-number
                                                    v-model:value="currentFuncInfo.instruction_model_config.top_p"
                                                    :min="0" :max="1" @change="handleChange" />
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
                                        <a-textarea class="flex-1" v-model:value="currentFuncInfo.system_prompt"
                                            auto-size style="height: 100%!important;" @change="handleChange" />
                                    </div>
                                    <div class="h-full flex flex-col gap-2.5 w-1/2 ">
                                        <span class="font-medium text-sm">Instructions Prompt</span>
                                        <a-textarea class="flex-1" v-model:value="currentFuncInfo.instruction_prompt"
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
import { promptLibsAPI } from "@/api";
import LoadingSpin from "@/components/common/LoadingSpin.vue";
import { useBasicStore } from "@/stores/basic";
import { watch, ref, getCurrentInstance, onMounted, computed } from "vue";

import { PURE_QUERIES } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";

const instance = getCurrentInstance();
let { proxy }: any = instance;
const basicStore = useBasicStore();
const isLoading = ref(true);
const confirmLoading = ref(false);
const currentFuncInfo = ref<any>({
    id: '',
    system_prompt: '',
    instruction_prompt: '',
    instruction_model_name: '',
    instruction_model_config: {
        temperature: 0,
        top_p: 0
    }
});
const activeFuncInfo = ref<any>({});

const isChange = ref(false);
const funcTools = ref<any[]>([]);

const filterModelOption = ref<any[]>([]);


const { result: promptListResult, refetch } = useQuery<any>(PURE_QUERIES.GET_PROMPT_LIB_LIST)


const cuts = (info: any) => {
    if (isChange.value) {
        proxy.$message.warning('Please save the current changes before switching.');
        return;
    }
    activeFuncInfo.value = info;
    activeKey.value = info.value;

}


const handleChange = () => {
    isChange.value = true;
}



const save = async () => {
    if (isChange.value) {
        confirmLoading.value = true;
        promptLibsAPI.createOrUpdatePromptLibs(currentFuncInfo.value).then((res: any) => {
            if (res) {
                proxy.$message.success('Save successfully');
                isChange.value = false;
                // fetchPromptLibsListFun();
            } else {
                proxy.$message.error(res.msg);
            }
        }).catch((err: any) => {
            proxy.$message.error(err);
        }).finally(() => {
            confirmLoading.value = false;
        });
    }
}

const cancelFun = () => {
    isChange.value = false;


}

const { result: ModelResult, refetch: ModelRefetch } = useQuery<any>(PURE_QUERIES.GET_LLM_MODEL_LIST)

const isEnabled = ref(false);
const activeKey = ref('');
const { result: activePromptLibsResult, loading: activePromptLibsLoading, refetch: activePromptLibsRefetch, onError } = useQuery(
    PURE_QUERIES.GET_PROMPT_LIB_BY_ID,
    () => ({
        id: activeKey.value
    }),
    // 关键参数：仅当 userId 有值时才执行查询
    { enabled: isEnabled }
);




watch(() => activeKey.value, (newVal) => {
    if (newVal) {
        isEnabled.value = true;
        activePromptLibsRefetch()
        isEnabled.value = false;
    }
}, { immediate: true, deep: true });

watch(() => promptListResult.value, (val) => {

    isLoading.value = true;
    if (val && val.GetPromptLibList && val.GetPromptLibList.length > 0) {
        funcTools.value = val.GetPromptLibList.map((item: any) => {
            return {
                label: item.label,
                value: item.value
            }
        });
        activeFuncInfo.value = funcTools.value[0];
        activeKey.value = funcTools.value[0].value;


    } else {
        funcTools.value = [];
    }
    isLoading.value = false;
}, { immediate: true, deep: true })

watch(() => ModelResult.value, (val) => {

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


// watch(() => activePromptLibsResult.value, (val) => {

//     if (val && val.GetPromptLibById) {
//         currentFuncInfo.value = val.GetPromptLibById;
//     } else {
//         currentFuncInfo.value = {
//             id: activePromptLibsResult.value.id,
//             systemPrompt: '',
//             instructionPrompt: '',
//             instructionModelName: '',
//             instructionModelConfig: {
//                 temperature: 0,
//                 topP: 0
//             }
//         };
//     }


// }, { immediate: true, deep: true })

onMounted(() => {
    ModelRefetch()
})



watch(() => basicStore.currentIndicationLabel, (newVal) => {
    if (newVal.id) {
        refetch()

    }
}, { immediate: true, deep: true });


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