<template>
    <div class="bg-white w-full   px-4 py-2 rounded-md border border-[#e5e5e5]">
        <div v-if="criteriaList.length > 0" class="flex flex-col gap-2">
            <div v-if="!isEdit" class="flex justify-between">
                <div class="flex gap-2 items-center">
                    <div v-for="(item, index) in criteriaList" :key="index"
                        class="px-2 py-0.5   border border-gray-300 rounded-md cursor-pointer select-none"
                        :class="{ ' text-purple-700 border-purple-700 bg-purple-50': selectedCriteria.includes(item) }"
                        @click="toggleSelection(item)">
                        Criteria{{ item.id }}
                    </div>
                </div>
                <div>
                    <a-button type="primary" ghost @click.prevent="isEdit = true">Edit</a-button>
                </div>
            </div>
            <template v-else>
                <template v-for="(item, index) of criteriaList">
                    <div class="flex gap-2 items-center">
                        <p class=" whitespace-nowrap !font-semibold text-gray-500 ">
                            Criteria {{ item.id }}:
                        </p>
                        <a-input v-model:value="item.value" class="flex-1"></a-input>
                        <div>
                            <PureIcon icon="material-symbols:close-rounded" class="  text-lg cursor-pointer"
                                @click.prevent="criteriaList.splice(index, 1)" />
                        </div>
                    </div>
                </template>
                <div class="flex items-center  justify-between !mt-2 ">
                    <div>
                        <a-button type="primary" ghost @click.prevent="add"
                            v-if="criteriaList.length < 3">Add</a-button>
                    </div>
                    <a-button type="primary" @click.prevent="apply">Apply</a-button>
                </div>

            </template>
        </div>
        <template v-else>
            <div class="flex items-center  justify-between h-full">
                <p class="text-gray-500">No Additional Criteria</p>
                <a-button type="primary" ghost @click.prevent="add">Add</a-button>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isEdit = ref(false);
const criteriaList = ref<any>([
    {
        id: 1,
        value: '',
    }
]);


const add = () => {
    criteriaList.value.push({
        id: criteriaList.value.length + 1,
        value: '',
    });
};
const apply = () => {
    isEdit.value = false;
};
const selectedCriteria = ref<any>([]);
const toggleSelection = (number: any) => {
    if (selectedCriteria.value.includes(number)) {
        // Remove from selection
        selectedCriteria.value = selectedCriteria.value.filter((n: any) => n.id !== number.id);
    } else {
        // Add to selection
        selectedCriteria.value.push(number);
    }

};

</script>
<style scoped lang="scss">
.number-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
    max-width: 800px;
}
</style>