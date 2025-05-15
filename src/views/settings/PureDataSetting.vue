<template>
    <div class="w-full h-full bg-white">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <template v-if="pureDataStore.pureTableList.length > 0">
                <div class="flex justify-center items-center h-full w-full p-2 gap-2">
                    <div class="w-[260px] border border-gray-300 h-full   flex flex-col gap-4 p-1">
                        <a-button type="primary" @click.prevent="add_table">Add Table</a-button>
                        <div class="flex-1 overflow-auto pure_data_table flex flex-col">
                            <div :class="['border px-2 py-1 border-gray-300 rounded-md overflow-hidden cursor-pointer flex justify-between', pureDataStore.activeTableListKey === info.id ? 'active bg-purple-100 border-purple-100' : '']"
                                v-for="(info) of pureDataStore.pureTableList"
                                @click.prevent="pureDataStore.setActiveTableListKey(info.id)">
                                <div class="flex-1 text-sm">
                                    <strong>{{ info.name }}</strong>
                                    <p> <a-tag color="blue">{{ info.type.toUpperCase() }}</a-tag> </p>
                                </div>
                                <div v-if="pureDataStore.activeTableListKey === info.id">
                                    <a-dropdown :trigger="['hover']">
                                        <HopeIconify class="text-base text-purple-800" icon="ic:outline-more-horiz" />
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item key="1" @click.stop="changes('edit', info)">
                                                    <span class="pri_span">
                                                        <HopeIconify class="text-base"
                                                            icon="material-symbols:edit-square-outline" />
                                                        Edit
                                                    </span>
                                                </a-menu-item>
                                                <a-menu-item key="3" @click.stop="changes('load', info)">
                                                    <span class="pri_span">
                                                        <svg-icon iconName="hope-ai-upload1"
                                                            color="var(--vt-c-primary)"></svg-icon>
                                                        Load CSV data
                                                    </span>
                                                </a-menu-item>
                                                <a-menu-item key="2" @click.stop="changes('del', info)">
                                                    <span class="re_gen">
                                                        <HopeIconify class="text-base"
                                                            icon="ic:baseline-delete-outline" />
                                                        Delete
                                                    </span>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex-1 h-full overflow-hidden p-2 flex justify-between flex-col gap-4 border border-gray-300">
                        <div class="  flex flex-col gap-4 overflow-hidden h-full">

                            <div class="manage-form flex-1  flex flex-col  justify-between overflow-hidden  gap-4">

                                <template v-if="canChangeColumns.length > 0">

                                    <div class="flex-1 flex  justify-between overflow-hidden   gap-4">
                                        <div class="column_left w-[240px] flex flex-col gap-2 overflow-auto">
                                            <VueDraggable ref="el" v-model="canChangeColumns" :animation="150"
                                                ghostClass="ghost" class="flex flex-col gap-1">
                                                <div v-for="(patient, index) of canChangeColumns" :key="index"
                                                    :class="[openColumnsIndex === index ? ' bg-purple-100' : '', 'px-4 py-2 cursor-pointer rounded-lg flex gap-2  justify-between items-center hover:bg-gray-200']"
                                                    @click="openColumnsIndex = index">
                                                    <span class="icons">
                                                        <svg-icon iconName="hope-ai-list" color="#888" />
                                                    </span>
                                                    <span class="flex-1">
                                                        {{ patient.name.length === 0 ? 'new column' : patient.name }}
                                                    </span>
                                                    <template v-if="openColumnsIndex === index">
                                                        <HopeIconify class="text-base text-red-700"
                                                            icon="ic:baseline-delete-outline"
                                                            @click.prevent="delOneColumns" />

                                                    </template>
                                                </div>
                                            </VueDraggable>
                                            <div class="flex flex-1">
                                                <a-button @click.prevent="addOneColumns" class="w-full">Add</a-button>
                                            </div>

                                        </div>
                                        <div class="column_right_content flex-1 flex flex-col gap-4">
                                            <div class="flex flex-col gap-4 flex-1">
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Name</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-input v-model:value="canChangeColumns[openColumnsIndex].name"
                                                        @change="handleName(canChangeColumns[openColumnsIndex].name)"></a-input>
                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Key</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-input v-model:value="canChangeColumns[openColumnsIndex].key"
                                                        @change="isChanges"></a-input>
                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Usage</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-select v-model:value="canChangeColumns[openColumnsIndex].usage"
                                                        style="width: 100%" :options="pureDataStore.columnUsages"
                                                        @change="isChanges"></a-select>
                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Used</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-switch
                                                        v-model:checked="canChangeColumns[openColumnsIndex].is_used"
                                                        @change="isChanges" />

                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Type</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-select
                                                        v-model:value="canChangeColumns[openColumnsIndex].data_type"
                                                        style="width: 100%" :options="pureDataStore.columnTypes"
                                                        @change="isChanges"></a-select>
                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Description</strong>
                                                    </p>
                                                    <a-textarea :rows="2"
                                                        v-model:value="canChangeColumns[openColumnsIndex].description"
                                                        @change="isChanges"></a-textarea>
                                                </div>
                                                <div class="column_item">
                                                    <p>
                                                        <strong>Summary strategy</strong>
                                                        <HopeIconify icon="stash:asterisk-duotone"
                                                            class=" text-base inline-block  text-red-700" />
                                                    </p>
                                                    <a-radio-group
                                                        v-model:value="canChangeColumns[openColumnsIndex].summary_strategy"
                                                        name="radioGroup" @change="isChanges">
                                                        <a-radio value="USE_LATEST">User Latest Data</a-radio>
                                                        <a-radio value="USE_LLM">User Large Language Model</a-radio>
                                                    </a-radio-group>
                                                </div>

                                                <div class="column_item"
                                                    v-if="canChangeColumns[openColumnsIndex].summary_strategy !== 'USE_LATEST'">
                                                    <p>
                                                        <strong>Summary prompt</strong>
                                                    </p>
                                                    <a-textarea :rows="6" @change="isChanges"
                                                        v-model:value="canChangeColumns[openColumnsIndex].summary_prompt"></a-textarea>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class=" flex-1 flex justify-center items-center flex-col h-[260px]">
                                        <a-empty :description="''"></a-empty>
                                        <a-button @click.prevent="addOneColumns">Add</a-button>
                                    </div>
                                </template>
                            </div>
                            <div class="flex justify-end gap-2 border-t border-gray-200 py-2">
                                <a-button class="mr-2" @click="createNewStatus = false">Cancel</a-button>
                                <a-button type="primary" @click.prevent="saveAllColumns" :loading="subLoading"
                                    :disabled="!isColumnsChanged">Submit
                                </a-button>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
            <template v-else>
                <div class="flex flex-col justify-center items-center h-full">
                    <a-empty description=""></a-empty>
                    <a-button type="primary" @click.prevent="add_table">Add Table</a-button>
                </div>
            </template>
        </template>

        <div>
            <a-modal v-model:open="table_open" title="Create/Edit New Table" width="600px" centered
                @cancel="table_open = false" :footer="null">
                <div class="manage-content">
                    <div class="manage-form_pure    overflow-auto">
                        <div class="flex flex-col gap-4 h-full">
                            <div class="flex items flex-col gap-2">
                                <p>
                                    <strong>Name</strong>
                                    <HopeIconify icon="stash:asterisk-duotone"
                                        class=" text-base inline-block  text-red-700" />
                                </p>
                                <a-input v-model:value="add_table_info.name" />
                            </div>
                            <div class="flex items flex-col gap-2">
                                <p>
                                    <strong>Type</strong>
                                    <HopeIconify icon="stash:asterisk-duotone"
                                        class=" text-base inline-block  text-red-700" />
                                </p>
                                <a-select v-model:value="add_table_info.type" style="width: 100%"
                                    :options="pureDataStore.tableTypes"></a-select>
                            </div>
                            <div class="flex items flex-col gap-2">
                                <p>
                                    <strong>Instruction</strong>
                                </p>
                                <a-textarea v-model:value="add_table_info.instruction" :rows="10" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2">
                        <a-button class="mr-2" @click="table_open = false">Cancel</a-button>
                        <a-button type="primary" @click.prevent="confirm_add_table"> Submit</a-button>
                    </div>
                </div>
            </a-modal>


            <a-modal v-model:open="delOpenStatus" :mask-closable="false" :closable="false" :confirm-loading="deLoading">
                <p class="del_Title">
                    <HopeIconify icon="mingcute:information-line" class=" text-base  text-orange-500" />
                    Do you want to DELETE?
                </p>
                <p class="del_pdf">This action takes effect immediately</p>
                <template #footer>
                    <a-button key="back" @click.prevent="closeDel" :disabled="deLoading">
                        Cancel
                    </a-button>
                    <a-button key="submit" type="primary" danger :loading="deLoading" @click.prevent="delOk">
                        Delete
                    </a-button>
                </template>
            </a-modal>

            <a-modal v-model:open="nctIdOpen" title="Study" centered @ok="handleStudyUploadOk" :destroyOnClose="true"
                :maskClosable="false" :closable="false">
                <div class="modal_box">
                    <a-spin :spinning="nctSpinning">
                        <a-upload-dragger v-model:fileList="fileList" name="file" :Multiple="false" accept=".csv"
                            :before-upload="beforeUpload" @remove="handleRemove" @change="handleChange"
                            @drop="handleDrop" :max-count="1">
                            <p class="ant-upload-drag-icon">
                                <svg-icon iconName="hope-ai-InboxOutlined" color="var(--vt-c-primary)" size="48px" />
                            </p>
                            <p class="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p class="ant-upload-hint">
                                Upload a single .CSV file to extract the required data
                            </p>
                        </a-upload-dragger>
                    </a-spin>
                </div>

                <template #footer>
                    <div class="footer_study">
                        <div class="flex justify-end items-center gap-1">
                            <a-button key="back" @click="handleNctCancel">Cancel</a-button>
                            <a-button key="submit" type="primary" :loading="loading" @click="handleStudyUploadOk"
                                :disabled="fileList.length === 0">Submit</a-button>
                        </div>
                    </div>
                </template>
            </a-modal>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, getCurrentInstance } from 'vue';
import LoadingSpin from '@/components/common/LoadingSpin.vue';
import { usePureDataStore } from "@/stores/setting/pure_dara";
import { VueDraggable } from 'vue-draggable-plus';
import { pureEvidenceAPI } from "@/api";
import { useBasicStore } from '@/stores/basic';
import type { UploadProps, UploadChangeParam } from "ant-design-vue";
import { message } from 'ant-design-vue';

const fileList = ref<any>([]);
const pureDataStore = usePureDataStore();
const basicStore = useBasicStore();
const loading = ref(false);
const instance = getCurrentInstance();
let { proxy }: any = instance;

const table_open = ref(false);
const nctIdOpen = ref(false);
const nctFileList = ref<any>([]);
const add_table_info = ref<any>({
    name: '',
    type: '',
    instruction: '',
    usage: '',
    description: ''
});
const add_table = () => {
    table_open.value = true;
    add_table_info.value = {
        name: '',
        type: '',
        instruction: '',
        usage: '',
        description: ''
    }
}

const confirm_add_table = () => {
    proxy.$loadingBar.start();
    if (isEdit.value && add_table_info.value.id) {
        //edit
        pureEvidenceAPI.updateTable(add_table_info.value.id, add_table_info.value).then((res: any) => {
            if (res) {
                getTableList();
                table_open.value = false;
            }
        }).finally(() => {
            proxy.$loadingBar.finish();
            table_open.value = false;
        });
    } else {
        pureEvidenceAPI.createTable(add_table_info.value, basicStore.currentIndicationLabel.id).then((res: any) => {
            if (res) {
                getTableList();
                table_open.value = false;
            }
        }).finally(() => {
            proxy.$loadingBar.finish();
            table_open.value = false;
        });
    }

    isEdit.value = false;

}

const subLoading = ref(false);
const createNewStatus = ref(false);
const canChangeColumns = ref<any>([]);
const openColumnsIndex = ref(0);
const addOneColumns = () => {
    canChangeColumns.value.push({
        name: '',
        key: '',
        summary_strategy: 'USE_LATEST',
        summary_prompt: '',
        usage: '',
        description: '',
        data_type: ''
    });
    openColumnsIndex.value = canChangeColumns.value.length - 1;
    isColumnsChanged.value = true;
}
const delOneColumns = () => {
    canChangeColumns.value.splice(openColumnsIndex.value, 1);
    openColumnsIndex.value = 0;
    isColumnsChanged.value = true;
}
const nctSpinning = ref(false);
const isLoading = ref(false);

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    fileList.value = [...(fileList.value || []), file];
    return false;
};
const handleDrop = (e: DragEvent) => {
    console.log("Dropped files", e);
};
const handleStudyUploadOk = async () => {
    if (fileList.value.length === 0) {
        proxy.$message.error('Please upload a file');
        return;
    }
    const table_id = pureDataStore.activeTableListKey.toString();
    const data = new FormData();
    data.append('file', fileList.value[0].originFileObj);
    data.append('table_id', table_id);

    nctSpinning.value = true;
    try {
        const response = await pureEvidenceAPI.loadDataFromCSV(data);
        if (response) {
            message.success('File uploaded successfully');
            nctIdOpen.value = false;
            fileList.value = [];
        }
    } catch (error) {
        message.error('Failed to upload file');
    } finally {
        nctSpinning.value = false;
    }


};

const handleRemove: UploadProps["onRemove"] = (file) => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};
const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status;
    if (status !== 'uploading') {

    }
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
};
const handleNctCancel = () => {
    nctIdOpen.value = false;
    nctFileList.value = [];
};

const isColumnsChanged = ref(false);

const validateColumns = () => {
    const invalidColumns = canChangeColumns.value.filter((column: any, idx: any) => {
        if (!column.name || !column.key || !column.usage || !column.data_type) {
            openColumnsIndex.value = idx;
            return true;
        }
        return false;
    });

    if (invalidColumns.length > 0) {
        proxy.$message.error('Please provide both Name and Key for all columns');
        return false;
    }
    return true;
}

const isChanges = () => {
    isColumnsChanged.value = true;
}

const saveAllColumns = () => {
    subLoading.value = true;

    // Use the extracted validation method
    if (!validateColumns()) {
        subLoading.value = false;
        return;
    }

    const newColumns = canChangeColumns.value.map((item: any, index: number) => {
        return {
            name: item.name,
            key: item.key,
            summary_strategy: item.summary_strategy,
            summary_prompt: item.summary_prompt,
            is_used: item.is_used,
            order: index + 1,
            usage: item.usage,
            description: item.description,
            data_type: item.data_type
        }
    });

    pureEvidenceAPI.updateTableColumnDefinitions(pureDataStore.activeTableListKey, newColumns).then((res: any) => {
        if (res) {
            getTableList();
            getTableColumnDefinitions(pureDataStore.activeTableListKey);
            createNewStatus.value = false;
        }
    }).finally(() => {
        subLoading.value = false;
        isColumnsChanged.value = false;
    });
}



const isEdit = ref(false);
const delOpenStatus = ref(false);
const deLoading = ref(false);
const delInfo = ref<any>({});
const changes = (type: string, info: any) => {
    if (type === 'edit') {

        isEdit.value = true;
        add_table_info.value = info
        table_open.value = true;
    } else if (type === 'load') {
        nctIdOpen.value = true;

    } else {

        delOpenStatus.value = true;
        delInfo.value = info;
    }

}



// getTableListAPI

const getTableList = async () => {
    proxy.$loadingBar.start();
    isLoading.value = true;
    const res: any = await pureEvidenceAPI.getTableList(basicStore.currentIndicationLabel.id);
    if (res && res.data && res.data.length > 0) {
        // Ensure data exists before setting it to avoid errors
        pureDataStore.setPureTableList(res.data);
        if (pureDataStore.activeTableListKey === -1) {
            pureDataStore.setActiveTableListKey(res.data[0].id);
            pureDataStore.setCurrentTableInfo(res.data[0]);
        }
    } else {

        pureDataStore.setPureTableList([]);
    }
    proxy.$loadingBar.finish();
    isLoading.value = false;
}

const handleName = (name: string) => {
    canChangeColumns.value[openColumnsIndex.value].key = name.toLowerCase().replace(/\s+/g, '_');
    isColumnsChanged.value = true;
}

const delOk = () => {
    deLoading.value = true;
    proxy.$loadingBar.start();
    pureEvidenceAPI.deleteTable(delInfo.value.id).then((res: any) => {
        if (res) {
            getTableList();
            delOpenStatus.value = false;
        }
    }).finally(() => {
        proxy.$loadingBar.finish();
        deLoading.value = false;
    });
}

const closeDel = () => {
    delOpenStatus.value = false;
}

// getTableColumnDefinitionsAPI

const getTableColumnDefinitions = async (id: number) => {
    const res: any = await pureEvidenceAPI.getTableColumnDefinitions(id);
    if (res && res.data && res.data.length > 0) {
        pureDataStore.setCurrentTableColumnDefinitions(res.data)
        canChangeColumns.value = res.data;
    } else {

        pureDataStore.setCurrentTableColumnDefinitions([])
        canChangeColumns.value = [];
    }
}

watch(() => basicStore.currentIndicationLabel, (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
        pureDataStore.setActiveTableListKey(-1);
        getTableList();
    }
}, { immediate: true })



watch(() => pureDataStore.activeTableListKey, (newVal) => {
    if (newVal) {

        getTableColumnDefinitions(newVal);
    }
})

onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
});
</script>
<style lang="scss">
.manage-form_pure {
    height: 56vh;
}

.pure_data_table {
    gap: 1px;

    .active {
        color: var(--vt-c-primary);
        font-weight: 500;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #a769df;
        }
    }
}

.columns-content {
    height: 80vh;
}
</style>