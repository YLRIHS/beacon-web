<template>
    <div class="w-full h-full bg-white p-4">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <template v-if="columnDefinitionList.length > 0">
                <div class="flex flex-col gap-2 w-full h-full overflow-hidden">
                    <div class="flex justify-end gap-2">
                        <a-button type="primary" ghost @click.prevent="openTask">Create task</a-button>
                        <a-button type="primary" @click.prevent="openCreate">Create column</a-button>
                    </div>
                    <div class="flex-1 overflow-auto">
                        <a-list item-layout="horizontal" bordered :data-source="columnDefinitionList">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-list-item-meta description="">
                                        <template #title>
                                            <div class="flex flex-col gap-2">
                                                <p class="flex gap-2">
                                                    <strong class="w-[80px] text-right">Name:</strong>
                                                    <span>{{ item.name }}</span>
                                                </p>
                                                <p class="flex gap-2">
                                                    <strong class="w-[80px] text-right">Key:</strong>
                                                    <span>{{ item.key }}</span>
                                                </p>
                                                <p class="flex gap-2">
                                                    <strong class="w-[80px] text-right">Prompt:</strong>
                                                    <span>{{ item.prompt }}</span>
                                                </p>
                                            </div>
                                        </template>
                                    </a-list-item-meta>
                                    <template #actions>
                                        <a-dropdown>
                                            <div>
                                                <svg-icon icon-name="hope-ai-gengduo" color="var(--vt-c-primary)"
                                                    size="16px" />
                                            </div>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item key="2" @click.prevent="columnsChange(item, 'edit')">
                                                        <p class="pri_span">
                                                            <svg-icon icon-name="hope-ai-edit1"
                                                                color="var(--vt-c-primary)" />
                                                            Edit
                                                        </p>
                                                    </a-menu-item>
                                                    <a-menu-item key="1" @click.prevent="columnsChange(item, 'delete')">
                                                        <p class="re_gen">
                                                            <HopeIconify class="text-base"
                                                                icon="ic:baseline-delete-outline" />
                                                            Delete
                                                        </p>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </div>

            </template>
            <template v-else>
                <div class="w-full h-full flex flex-col justify-center items-center">
                    <a-empty description=""></a-empty>
                    <a-button type="primary" @click.prevent="openCreate">Create column</a-button>
                </div>
            </template>
        </template>

        <!-- createNewStatus -->
        <a-modal v-model:open="createStatus" title="Add/Edit Columns" width="calc(100vw - 200px)" centered
            @cancel="createStatus = false" :footer="null">
            <div class="columns-content flex flex-col gap-4 overflow-hidden">

                <div class="manage-form flex-1  flex flex-col  justify-between overflow-hidden  gap-4">

                    <div class="flex-1 flex  justify-between overflow-hidden   gap-4">
                        <div class="column_right_content flex-1 flex flex-col gap-4">
                            <div class="flex flex-col gap-4 flex-1">
                                <div class="column_item">
                                    <p>
                                        <strong>Name</strong>
                                        <HopeIconify icon="stash:asterisk-duotone"
                                            class=" text-base inline-block  text-red-700" />
                                    </p>
                                    <a-input v-model:value="createColumnInfo.name"></a-input>
                                </div>
                                <div class="column_item">
                                    <p>
                                        <strong>Key</strong>
                                        <HopeIconify icon="stash:asterisk-duotone"
                                            class=" text-base inline-block  text-red-700" />
                                    </p>
                                    <a-input v-model:value="createColumnInfo.key"></a-input>
                                </div>
                                <div class="column_item">
                                    <p class="pb-2.5">
                                        <strong>Variables</strong>
                                        <HopeIconify icon="stash:asterisk-duotone"
                                            class=" text-base inline-block  text-red-700" />
                                        <span class="text-sm text-gray-500">(variables you can use in prompt)</span>
                                    </p>
                                    <div>
                                        <selectedTags :tags="defaultVariables" @update="handleTagUpdate" />
                                    </div>
                                </div>
                                <div class="column_item">
                                    <p>
                                        <strong>Prompt</strong>
                                        <HopeIconify icon="stash:asterisk-duotone"
                                            class=" text-base inline-block  text-red-700" />
                                    </p>
                                    <a-textarea :rows="6" v-model:value="createColumnInfo.prompt"></a-textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 border-t border-gray-200 py-2">
                    <a-button class="mr-2" @click="createStatus = false">Cancel</a-button>
                    <a-button type="primary" @click.prevent="createColumnFun" :loading="confirmLoading">Submit
                    </a-button>
                </div>
            </div>
        </a-modal>

        <!-- taskStatus -->
        <a-modal v-model:open="taskStatus" title="Add/Edit Columns" width="calc(100vw - 200px)" centered
            @cancel="taskStatus = false" :footer="null">
            <div class="columns-content flex flex-col gap-4 overflow-hidden">

                <div class="manage-form flex-1  flex flex-col  justify-between overflow-hidden  gap-4">

                    <a-select v-model:value="taskList" class="flex-1" style="width: 200px"
                        :options="columnDefinitionList.map((item: any) => { return { label: item.name, value: item.id } })"
                        placeholder="column">
                    </a-select>
                </div>
                <div class="flex justify-end gap-2 border-t border-gray-200 py-2">
                    <a-button class="mr-2" @click="taskStatus = false">Cancel</a-button>
                    <a-button type="primary" @click.prevent="createTaskFun" :loading="confirmLoading">Submit
                    </a-button>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { columnSettingAPI } from "@/api";
import LoadingSpin from "@/components/common/LoadingSpin.vue";
import { useBasicStore } from "@/stores/basic";
import selectedTags from "@/components/curation/common/selectedTags.vue";
import { watch, ref, getCurrentInstance, onMounted } from "vue";
const instance = getCurrentInstance();
let { proxy }: any = instance;
const basicStore = useBasicStore();
const isLoading = ref(true);
// getColumnDefinitionList
const columnDefinitionList = ref<any[]>([]);
const confirmLoading = ref(false);

const createStatus = ref(false);
const getColumnDefinitionListFun = async (id: string) => {
    proxy.$loadingBar.start();
    isLoading.value = true;
    const res: any = await columnSettingAPI.getColumnDefinitionList(id);
    if (res && res.data && res.data.length > 0) {
        columnDefinitionList.value = res.data;
    } else {
        columnDefinitionList.value = [];
    }
    proxy.$loadingBar.finish();
    isLoading.value = false;
};


const isEdit = ref(false);

const createColumnInfo = ref<any>({
    name: '',
    key: '',
    prompt: '',
    indication_id: basicStore.currentIndicationLabel.id,
});
const createColumnFun = () => {

    confirmLoading.value = true;
    proxy.$loadingBar.start();
    if (createColumnInfo.value.name === '' || createColumnInfo.value.key === '' || createColumnInfo.value.prompt === '') {
        proxy.$message.error("Please fill in all the fields");
        confirmLoading.value = false;
        return;
    }
    if (isEdit.value && createColumnInfo.value.id) {
        columnSettingAPI.updateColumn(createColumnInfo.value.id, createColumnInfo.value).then((res: any) => {

            if (res) {
                proxy.$message.success("Update column successfully");
                createStatus.value = false;
                getColumnDefinitionListFun(basicStore.currentIndicationLabel.id);
            } else {
                proxy.$message.error(res.msg);
            }
        }).catch((err: any) => {

            proxy.$message.error(err.msg);
        }).finally(() => {
            confirmLoading.value = false;
            proxy.$loadingBar.finish();
        });

    } else {
        columnSettingAPI.createColumn(createColumnInfo.value).then((res: any) => {

            if (res && res.data) {
                proxy.$message.success("Create column successfully");
                createStatus.value = false;
                getColumnDefinitionListFun(basicStore.currentIndicationLabel.id);
            } else {
                proxy.$message.error(res.msg);
            }
        }).catch((err: any) => {
            if (err.msg) {
                proxy.$message.error(err.msg);
            }

        }).finally(() => {
            confirmLoading.value = false;
            proxy.$loadingBar.finish();
        });
    }


}

const openCreate = () => {
    createStatus.value = true;
    createColumnInfo.value = {
        name: '',
        key: '',
        prompt: '',
        indication_id: basicStore.currentIndicationLabel.id,
    };
}

// getDefaultVariables

const defaultVariables = ref<any[]>([]);


const getDefaultVariables = async () => {
    proxy.$loadingBar.start();
    const res: any = await columnSettingAPI.getDefaultVariables();
    if (res && res.data && res.data.length > 0) {
        defaultVariables.value = res.data.map((item: any) => {
            return {
                name: item,
                title: item === "nct_number" ? 'NCT Number' : item.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
            }
        });
    } else {
        defaultVariables.value = [];
    }
    proxy.$loadingBar.finish();

}

const handleTagUpdate = (tags: any) => {


    const textarea = document.querySelector('textarea');
    const promptField = createColumnInfo.value.prompt;
    const titleStr = tags === "nct_number" ? 'NCT Number' : tags.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
    const tagText = promptField ? `\n${titleStr}:{{${tags}}}` : `${titleStr}:{{${tags}}}`;

    // If textarea is focused, insert at cursor position
    if (textarea && document.activeElement === textarea) {
        const cursorPos = textarea.selectionStart;
        const textBefore = promptField.substring(0, cursorPos);
        const textAfter = promptField.substring(cursorPos);

        createColumnInfo.value.prompt = textBefore + tagText + textAfter;

        // Set cursor position after the inserted tag
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = cursorPos + tagText.length;
            textarea.focus();
        }, 0);
    } else {
        // If not focused, append at the end with a space if needed
        const space = promptField && promptField.length > 0 && !promptField.endsWith(' ') ? ' ' : '';
        createColumnInfo.value.prompt = promptField + space + tagText;
    }
}

const columnsChange = (item: any, type: string) => {

    if (type === 'edit') {
        createStatus.value = true;
        isEdit.value = true;
        createColumnInfo.value = {
            id: item.id,
            name: item.name,
            key: item.key,
            prompt: item.prompt,
            indication_id: basicStore.currentIndicationLabel.id,
        };
    } else if (type === 'delete') {
        proxy.$confirm({
            title: 'Are you sure to delete this column?',
            onOk() {
                columnSettingAPI.deleteColumn(item.id).then((res: any) => {
                    if (res) {
                        proxy.$message.success("Delete column successfully");
                        getColumnDefinitionListFun(basicStore.currentIndicationLabel.id);
                    } else {
                        proxy.$message.error(res.msg);
                    }
                }).catch((err: any) => {
                    if (err.msg) {
                        proxy.$message.error(err.msg);
                    }
                });
            },
            onCancel() { },
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    }
}

const taskStatus = ref(false);
const openTask = () => {
    taskStatus.value = true;

}

const taskList = ref<any>([]);
const createTaskFun = () => {
    //
    console.log(taskList.value);
}
onMounted(() => {
    getDefaultVariables();
})

watch(() => basicStore.currentIndicationLabel, (newVal) => {
    if (newVal.id) {
        getColumnDefinitionListFun(newVal.id);

    }
}, { immediate: true, deep: true });

</script>