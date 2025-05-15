<script setup lang="ts">
import HopeMenu from "@/components/common/HopeMenu.vue";

</script>
<template>
    <div class="flex justify-between w-full h-full overflow-hidden">

        <div class="flex-1 flex flex-col">
            <!-- <SetHeader /> -->
            <div class="w-full flex-1 overflow-hidden flex bg-gray-100 ">
                <HopeMenu />
                <router-view />
            </div>
        </div>
    </div>
</template>