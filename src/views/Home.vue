<template>
    <div class="flex-1 h-full overflow-hidden px-4 py-4">
        <template v-if="loading">
            <div class="flex items-center justify-center h-full">
                <LoadingSpin />
            </div>
        </template>
        <template v-else>
            <template v-if="pureStore.projectList.length > 0">
                <div class="max-w-2xl !mx-auto mb-4 flex flex-col gap-4">
                    <div class="flex justify-end">
                        <a-button type="primary" @click="openCreate">Create Project</a-button>
                    </div>

                    <a-list class="flex-1 overflow-auto" item-layout="horizontal" bordered
                        :data-source="pureStore.projectList">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta description="">
                                    <template #title>
                                        <p class="flex items-center gap-2 cursor-pointer  w-full"
                                            @click="GoPure(item.id)">
                                            {{ item.name }}
                                            <a-tag>
                                                {{ getIndicationName(item.indication_id) }}
                                            </a-tag>
                                        </p>
                                    </template>
                                </a-list-item-meta>
                                <template #actions>
                                    <a-dropdown>
                                        <div>
                                            <PureIcon icon="material-symbols:more-vert"
                                                class="text-base cursor-pointer" />
                                        </div>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item key="2" @click.prevent="projectToolFun(item, 'edit')">
                                                    <p class="pri_span flex items-center gap-1 text-purple-800">
                                                        <PureIcon icon="material-symbols:edit-square-outline"
                                                            class="text-base" />
                                                        Edit
                                                    </p>
                                                </a-menu-item>
                                                <a-menu-item key="1" @click.prevent="projectToolFun(item, 'delete')">
                                                    <p class="re_gen flex items-center gap-1 text-red-600">
                                                        <PureIcon class="text-base"
                                                            icon="material-symbols:delete-outline-rounded" />
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

            </template>
            <template v-else>
                <div class="flex items-center justify-center h-full">
                    <div class="text-gray-500">No projects found</div>
                </div>
                <div class="top_add flex justify-center">
                    <a-button type="primary" @click="openCreate">Create Project</a-button>
                </div>
            </template>

            <a-modal v-model:open="createDialog" title="Create/Edit Project" width="600px" centered
                @cancel="createDialog = false" :footer="null">
                <div class="manage-content">
                    <div class="manage-form   py-5">
                        <div class="flex flex-col gap-4 h-full ">
                            <div class="flex items flex-col gap-2">
                                <p>
                                    <span class=" font-bold">Name</span>
                                    <PureIcon icon="stash:asterisk-duotone"
                                        class=" text-base inline-block  text-red-700" />
                                </p>
                                <a-input v-model:value="createProjectInfo.name" />
                            </div>
                            <div class="flex items flex-col gap-2">
                                <p>
                                    <span class=" font-bold">Indication</span>
                                    <PureIcon icon="stash:asterisk-duotone"
                                        class=" text-base inline-block  text-red-700" />
                                </p>
                                <a-select v-model:value="createProjectInfo.indication_id" style="width: 100%"
                                    :options="IndicationList.map((item: any) => { return { value: item.id, label: item.name } })"></a-select>
                            </div>


                        </div>
                    </div>
                    <div class="flex justify-end gap-2">
                        <a-button class="mr-2" @click="createDialog = false" :disabled="submitLoading">Cancel</a-button>
                        <a-button type="primary" @click.prevent="confirmNewProject" :loading="submitLoading">
                            Submit</a-button>
                    </div>
                </div>
            </a-modal>

            <a-modal v-model:open="delRequestOpen" :mask-closable="false" :closable="false"
                :confirm-loading="reQuestLoading">
                <p class="del_Title flex items-center gap-2 text-xl font-bold">
                    <PureIcon icon="mingcute:information-line" class=" text-xl  text-orange-500" />
                    Do you want to DELETE?
                </p>
                <p class="del_pdf">This action takes effect immediately</p>
                <template #footer>
                    <a-button key="back" @click.prevent="closeDel" :disabled="reQuestLoading">
                        Cancel
                    </a-button>
                    <a-button key="submit" type="primary" danger :loading="reQuestLoading"
                        @click.prevent="delRequestById">
                        Delete
                    </a-button>
                </template>
            </a-modal>

        </template>


    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useProjectService } from '@/services';
import { usePureStore } from '@/stores/pure';
import LoadingSpin from '@/components/common/LoadingSpin.vue';

import { PROJECT_MUTATIONS } from "@/graphql/mutations"
import { useMutation } from '@vue/apollo-composable'

import { message } from 'ant-design-vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const projectService = useProjectService();
const pureStore = usePureStore();

const delRequestOpen = ref(false);
const reQuestLoading = ref(false);
const submitLoading = ref(false);
const closeDel = () => {
    delRequestOpen.value = false;
};

const { mutate: deleteProject } = useMutation(PROJECT_MUTATIONS.DELETE_PROJECT)
const delRequestById = async () => {
    reQuestLoading.value = true;
    try {
        const res = await deleteProject({
            id: delInfo.value.id.toString(),
        })
        if (res) {
            message.success('Project deleted successfully');
            projectRefetch();
        } else {
            message.error('Failed to delete project');
            return;
        }
    } catch (error) {
        message.error('Failed to delete project');
    } finally {
        reQuestLoading.value = false;
    }

    reQuestLoading.value = false;
    delRequestOpen.value = false;
};
const createDialog = ref(false);
const createProjectInfo = ref<any>({
    name: '',
    indication_id: '',
});

const { mutate: createProject } = useMutation(PROJECT_MUTATIONS.CREATE_PROJECT);
const { mutate: updateProject } = useMutation(PROJECT_MUTATIONS.UPDATE_PROJECT);
const confirmNewProject = async () => {
    if (!createProjectInfo.value.name || !createProjectInfo.value.indication_id) {
        message.error('Please fill in all required fields');
        return;
    }
    submitLoading.value = true;
    console.log('createProjectInfo.value', createProjectInfo.value);
    if (!createProjectInfo.value.id) {
        try {
            const res = await createProject({
                name: createProjectInfo.value.name,
                indication_id: createProjectInfo.value.indication_id,
            })
            if (res) {
                message.success('Project created successfully');
                projectRefetch();
            } else {
                message.error('Failed to create project');
                return;
            }
        } catch (error) {
            message.error('Failed to create project');
        } finally {
            submitLoading.value = false;
            createDialog.value = false;
        }
    } else {
        try {
            const res = await updateProject({
                id: createProjectInfo.value.id,
                name: createProjectInfo.value.name,
                indication_id: createProjectInfo.value.indication_id,
            })
            if (res) {
                message.success('Project updated successfully');
                projectRefetch();
            } else {
                message.error('Failed to update project');
                return;
            }
        } catch (error) {
            message.error('Failed to update project');
        } finally {
            submitLoading.value = false;
            createDialog.value = false;
        }
    }


};

const { projectList, loading, refetch: projectRefetch } = projectService.getProjectList();
const { IndicationList } = projectService.getIndicationList();

const delInfo = ref<any>({});

const projectToolFun = async (item: any, type: string) => {
    if (type === 'edit') {
        createProjectInfo.value = item;
        createDialog.value = true;
    } else if (type === 'delete') {
        delRequestOpen.value = true;
        delInfo.value = item;

    }
}

const openCreate = () => {
    createProjectInfo.value = {
        name: '',
        indication_id: '',
    };
    createDialog.value = true;
}

const getIndicationName = (id: string) => {
    const indication = IndicationList.value.find((item: any) => item.id === id);
    return indication ? indication.name : '';
}


const GoPure = (id: string) => {
    router.push({
        path: `/pure/${id}`,
        query: route.query,
        hash: route.hash,
        replace: true
    }).catch(() => { });
}
onMounted(() => {
    console.log('onMounted');
    projectRefetch();
})

watch(() => projectList, (newVal) => {
    pureStore.setProjectList(newVal);
}, { immediate: true });
</script>