<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import { useMonitorTaskStore } from "@/stores/setting/monitor_task";
import LoadingSpin from "@/components/common/LoadingSpin.vue";
import { getProcessPercentage } from "@/utils/fun";
import { monitorTaskAPI } from "@/api";

import { useBasicStore } from "@/stores/basic";
import { message } from "ant-design-vue";

const basicStore = useBasicStore();

const monitorTaskStore = useMonitorTaskStore();

const isLoading = ref(true);
const taskModelStatus = ref(false);

const targetType = ref([
    {
        value: "PUBMED",
        label: "PubMed"
    },
    {
        value: "CTGOV",
        label: "ClinicalTrials.gov"
    }
])

const createInfo = ref<any>({
    task_target: "",
    target_url: "",
    indication: "",
    is_activated: false,
    params: {
        ["query.cond"]: "",
        ["query.term"]: "",
        ["query.intr"]: "",
        ["query.locn"]: ""
    }
})



// Initialize timer reference for cleanup
const monitorTimer = ref<number | null>(null);

// Function to check and update running tasks
const checkRunningTasks = async () => {
    if (!basicStore.currentIndicationLabel?.id) return;

    // Clear existing timer if any
    if (monitorTimer.value) {
        clearTimeout(monitorTimer.value);
        monitorTimer.value = null;
    }

    await getMonitorTaskList(basicStore.currentIndicationLabel.id);

    // Check if any task is still running

    const hasRunningTask = monitorTaskStore.monitorTaskList.some((task: any) => task.status === "running");
    if (hasRunningTask) {
        // Set timer to check again in 10 seconds
        monitorTimer.value = setTimeout(checkRunningTasks, 3000) as unknown as number;
    }
};

// Start monitoring when component is mounted
const startMonitoring = () => {
    checkRunningTasks();
};

// Clean up timer when component is unmounted
onUnmounted(() => {
    if (monitorTimer.value) {
        clearTimeout(monitorTimer.value);
        monitorTimer.value = null;
    }
});




const getMonitorTaskList = async (indication_id: any) => {
    await monitorTaskAPI.listByIndication(indication_id).then((res: any) => {
        if (res && res.data && res.data.length > 0) {
            monitorTaskStore.setMonitorTaskList(res.data);
        } else {
            monitorTaskStore.setMonitorTaskList([]);
        }
    }).catch(() => {

    }).finally(() => {
        isLoading.value = false;
    })
}

const openTaskModel = () => {
    taskModelStatus.value = true;
    createInfo.value = {
        task_target: "",
        target_url: "",
        indication: basicStore.currentIndicationLabel.id,
        is_activated: false,
        params: {
            ["query.cond"]: "",
            ["query.term"]: "",
            ["query.intr"]: "",
            ["query.locn"]: ""
        }
    }
}

const confirmLoading = ref(false);
const confirmHandler = () => {
    confirmLoading.value = true;

    const sendData = JSON.parse(JSON.stringify(createInfo.value));
    if (sendData.id) {
        monitorTaskAPI.update(sendData).then((res: any) => {
            if (res) {
                getMonitorTaskList(basicStore.currentIndicationLabel.id);
                taskModelStatus.value = false;
            }
        }).catch(() => {

        }).finally(() => {
            confirmLoading.value = false;
        })
    } else {
        monitorTaskAPI.create(sendData).then((res: any) => {
            if (res) {
                getMonitorTaskList(basicStore.currentIndicationLabel.id);
                taskModelStatus.value = false;
            }
        }).catch(() => {

        }).finally(() => {
            confirmLoading.value = false;
        })
    }



}

const getIndicationLabel = (id: number) => {
    const indication = basicStore.indicationList.find((item: any) => item.id === id);
    return indication ? indication.name : "";
}


const close = () => {
    taskModelStatus.value = false;
}

const delLabelStatus = ref(false);
const deleteInfo = ref<any>({});
const RunStatus = ref(false);
const runInfo = ref<any>({});
const stopTask = ref(false);
const stopInfo = ref<any>({});
const monitorTasks = (item: any, type: string = "cancel") => {
    if (type === "run") {
        RunStatus.value = true;
        runInfo.value = JSON.parse(JSON.stringify(item));

    } else if (type === "delete") {
        delLabelStatus.value = true;
        deleteInfo.value = JSON.parse(JSON.stringify(item));
    } else if (type === "edit") {
        createInfo.value = JSON.parse(JSON.stringify(item));
        taskModelStatus.value = true;
    } else if (type === "stop") {
        item.goTask = true;
        stopTask.value = true;
        stopInfo.value = JSON.parse(JSON.stringify(item));

    }
}

const stopNow = () => {
    confirmLoading.value = true;
    monitorTaskAPI.cancel(stopInfo.value.id).then((res: any) => {
        if (res) {
            message.success("Task is stop");
            getMonitorTaskList(basicStore.currentIndicationLabel.id);
            stopTask.value = false;
            // 清除定时器
            if (monitorTimer.value) {
                clearTimeout(monitorTimer.value);
                monitorTimer.value = null;
            }
        }
    }).catch(() => {

    }).finally(() => {
        confirmLoading.value = false;
    })
}

const runNow = () => {
    confirmLoading.value = true;
    monitorTaskAPI.execute(runInfo.value.id).then((res: any) => {
        if (res) {
            message.success("Task is running");
            startMonitoring();

        }
    }).catch(() => {
    }).finally(() => {
        confirmLoading.value = false;
        RunStatus.value = false;
    })
}

const sureDel = () => {
    monitorTaskAPI.delete(deleteInfo.value.id).then((res: any) => {
        if (res) {
            getMonitorTaskList(basicStore.currentIndicationLabel.id);
            delLabelStatus.value = false;
        }
    }).catch(() => {

    }).finally(() => {
        confirmLoading.value = false;
    })
}


watch(() => basicStore.currentIndicationLabel, (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
        // getMonitorTaskList(newVal.id);
        // Start the monitoring process
        startMonitoring();

    }
}, {
    immediate: true
})

</script>
<template>
    <div class="w-full h-full bg-white p-4">
        <template v-if="isLoading">
            <LoadingSpin />
        </template>
        <template v-else>
            <template v-if="monitorTaskStore.monitorTaskList.length > 0">
                <div class="monitor_task_list flex-1 overflow-hidden flex flex-col gap-4">
                    <div class="flex justify-end">
                        <a-button type="primary" @click.prevent="openTaskModel"> + Create Task</a-button>

                    </div>
                    <div class="flex-1 overflow-auto">
                        <a-list item-layout="horizontal" bordered :data-source="monitorTaskStore.monitorTaskList">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-list-item-meta description="">
                                        <template #title>
                                            <p class="flex items-center gap-2">
                                                <a-tag> {{ item.task_target }}</a-tag>
                                                <strong>{{ getIndicationLabel(item.indication) }}</strong>
                                                <span>
                                                    <span v-if="item.params['query.cond']">{{ item.params['query.cond']
                                                        }}</span>
                                                    <span v-if="item.params['query.term']">/ {{
                                                        item.params['query.term'] }}</span>
                                                    <span v-if="item.params['query.intr']">/ {{
                                                        item.params['query.intr'] }}</span>
                                                    <span v-if="item.params['query.locn']">/ {{
                                                        item.params['query.locn'] }}</span>
                                                </span>
                                                <span class="tpl_status flex flex-1">
                                                    <template v-if="item.status === 'running'">
                                                        <a-progress class="process_list"
                                                            :percent="getProcessPercentage(item.running_process)"
                                                            size="small" status="active" :stroke-color="{
                                                                '0%': '#7a47b9',
                                                                '100%': '#7a47b9',
                                                            }" />
                                                    </template>
                                                </span>
                                            </p>
                                        </template>
                                    </a-list-item-meta>
                                    <template #actions>
                                        <template v-if="item.status !== 'running'">
                                            <a-button type="primary" @click.prevent="monitorTasks(item, 'run')"
                                                :loading="item.goTask">Run
                                                now</a-button>
                                        </template>

                                        <template v-if="item.status === 'running'">
                                            <a-button type="primary" danger ghost
                                                @click.prevent="monitorTasks(item, 'stop')">Stop task</a-button>
                                        </template>
                                        <a-dropdown>
                                            <div>
                                                <svg-icon icon-name="hope-ai-gengduo" color="var(--vt-c-primary)"
                                                    size="16px" />
                                            </div>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item key="2" @click.prevent="monitorTasks(item, 'edit')">
                                                        <p class="pri_span">
                                                            <svg-icon icon-name="hope-ai-edit1"
                                                                color="var(--vt-c-primary)" />
                                                            Edit
                                                        </p>
                                                    </a-menu-item>
                                                    <a-menu-item key="1" @click.prevent="monitorTasks(item, 'delete')">
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
                    <p>
                        <a-button type="primary" @click.prevent="openTaskModel"> + Create Task</a-button>
                    </p>
                </div>
            </template>
        </template>
        <a-modal v-model:open="taskModelStatus" width="calc(60vw)" centered @cancel="close" title="Create/Edit Task">
            <div class="task_full_content   w-full overflow-y-auto flex  flex-col gap-5">
                <div class="w-full">
                    <p class="task_title">Indication</p>
                    <a-select v-model:value="createInfo.indication" style="width: 100%" disabled>
                        <a-select-option v-for="(item, index) in basicStore.indicationList" :key="index"
                            :value="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="w-full">
                    <p class="task_title">Task Target</p>
                    <a-select v-model:value="createInfo.task_target" style="width: 100%"
                        :options="targetType"></a-select>
                </div>
                <template v-if="createInfo.task_target === 'PUBMED' || createInfo.task_target === 'PMC'">
                    <div class="w-full">
                        <p class="task_title">Target URL</p>
                        <a-input v-model:value="createInfo.target_url" style="width: 100%"></a-input>
                    </div>

                </template>
                <template v-else-if="createInfo.task_target === 'CTGOV'">
                    <div class="w-full">
                        <p class="sea_title">Condition/disease </p>
                        <a-input v-model:value="createInfo.params['query.cond']" />
                    </div>
                    <div class="w-full">
                        <p class="sea_title">Other terms</p>
                        <a-input v-model:value="createInfo.params['query.term']" />
                    </div>

                    <div class="w-full">
                        <p class="sea_title">Intervention/treatment </p>
                        <a-input v-model:value="createInfo.params['query.intr']" />
                    </div>
                    <div class="w-full">
                        <p class="sea_title">Location</p>
                        <a-input v-model:value="createInfo.params['query.locn']" />
                    </div>
                </template>
            </div>
            <template #footer>
                <div class=" flex justify-end gap-4">
                    <div class="flex items-center gap-2">
                        <p>Is Activated</p>
                        <a-switch v-model:checked="createInfo.is_activated" />
                    </div>
                    <a-button @click.prevent="taskModelStatus = false"> Cancel</a-button>
                    <a-button type="primary" @click.prevent="confirmHandler" :loading="confirmLoading">
                        Confirm</a-button>
                </div>
            </template>
        </a-modal>


        <a-modal v-model:open="delLabelStatus" :mask-closable="false" :closable="false"
            :confirm-loading="confirmLoading">
            <p class="del_Title flex items-center gap-2">
                <HopeIconify icon="mingcute:information-line" class=" text-base  text-orange-500" />
                Do you want to DELETE?
            </p>
            <p class="del_pdf">This action takes effect immediately</p>
            <template #footer>
                <a-button key="back" @click="() => (delLabelStatus = false)" :disabled="confirmLoading">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" danger :loading="confirmLoading" @click="sureDel">
                    Delete
                </a-button>
            </template>
        </a-modal>

        <!-- RunStatus -->
        <a-modal v-model:open="RunStatus" :mask-closable="false" :closable="false" :confirm-loading="confirmLoading">
            <p class="del_Title flex items-center gap-2">
                <HopeIconify icon="mingcute:information-line" class=" text-base  text-orange-500" />
                Do you want to Run task?
            </p>
            <p class="del_pdf">This action takes effect immediately</p>
            <template #footer>
                <a-button key="back" @click="() => (RunStatus = false)" :disabled="confirmLoading">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="runNow">
                    Confirm
                </a-button>
            </template>
        </a-modal>

        <!-- stopTask
          -->
        <a-modal v-model:open="stopTask" :mask-closable="false" :closable="false" :confirm-loading="confirmLoading">
            <p class="del_Title flex items-center gap-2">
                <HopeIconify icon="mingcute:information-line" class=" text-base  text-orange-500" />
                Do you want to Stop task?
            </p>
            <p class="del_pdf">This action takes effect immediately</p>
            <template #footer>
                <a-button key="back" @click="() => (stopTask = false)" :disabled="confirmLoading">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="stopNow">
                    Confirm
                </a-button>
            </template>
        </a-modal>

    </div>
</template>

<style lang="scss">
.task_full_content {
    height: 65vh;
    padding-top: 14px;

    .task_title,
    .sea_title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    }
}
</style>