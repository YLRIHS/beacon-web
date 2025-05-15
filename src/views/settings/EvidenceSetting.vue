<template>
    <div class="w-full h-full bg-white">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <template v-if="Object.keys(pureDataStore.EvidenceSettingInfo).length > 0">
                <div class="w-full h-full flex-1 flex flex-col gap-4 p-4">
                    <div class="flex justify-between gap-4 flex-1">
                        <div class="flex-1 flex flex-col gap-2">
                            <p><strong>Narrow Down Prompt:</strong></p>
                            <a-textarea class="flex-1"
                                v-model:value="pureDataStore.EvidenceSettingInfo.narrow_down_prompt"
                                @change="isChanged = true"></a-textarea>
                        </div>
                        <div class="flex-1 flex flex-col gap-2">
                            <p><strong>Run Screening Prompt:</strong></p>
                            <a-textarea class="flex-1"
                                v-model:value="pureDataStore.EvidenceSettingInfo.run_screening_prompt"
                                @change="isChanged = true"></a-textarea>
                        </div>
                    </div>
                    <div class="flex justify-end p-2">
                        <a-button type="primary" :disabled="!isChanged" @click.prevent="save">Submit</a-button>
                    </div>
                </div>
            </template>

        </template>


    </div>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from 'vue';
import LoadingSpin from '@/components/common/LoadingSpin.vue';
import { usePureDataStore } from "@/stores/setting/pure_dara";
import { evidenceTaskAPI } from "@/api";
import { useBasicStore } from '@/stores/basic';

const pureDataStore = usePureDataStore();
const basicStore = useBasicStore();
const isChanged = ref(false);
const instance = getCurrentInstance();
let { proxy }: any = instance;



const isLoading = ref(false);




// getEvidenceSettingAPI

const getEvidenceSetting = async () => {
    proxy.$loadingBar.start();
    isLoading.value = true;
    const res: any = await evidenceTaskAPI.getEvidenceSetting(basicStore.currentIndicationLabel.id);
    if (res && res.data) {
        pureDataStore.setEvidenceSettingInfo(res.data)
    } else {

        pureDataStore.setEvidenceSettingInfo({})
    }
    isLoading.value = false;
    proxy.$loadingBar.finish();
}

const save = () => {
    // updateEvidenceSettingAPI
    // EvidenceSettingInfo 不能为空

    if (!pureDataStore.EvidenceSettingInfo.narrow_down_prompt || !pureDataStore.EvidenceSettingInfo.run_screening_prompt) {
        proxy.$message.error('Narrow down prompt and run screening prompt cannot be empty');
        return;
    }

    evidenceTaskAPI.updateEvidenceSetting(basicStore.currentIndicationLabel.id, pureDataStore.EvidenceSettingInfo).then((res: any) => {
        if (res) {
            proxy.$message.success('Evidence setting updated successfully');
            isChanged.value = false;
        } else {
            proxy.$message.error('Failed to update evidence setting');
        }
    }).catch((_: any) => {

        proxy.$message.error('Failed to update evidence setting');
    });
}

watch(() => basicStore.currentIndicationLabel, (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {

        getEvidenceSetting();
    }
}, { immediate: true })





</script>
<style lang="scss"></style>