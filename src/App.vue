<script setup lang="ts">
import { ref, nextTick, provide } from "vue";
import Header from "@/components/common/Header.vue";
const isRouterAlive = ref(true);


const reload = () => {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    })
}

provide('reload', reload);


</script>

<template>
    <a-config-provider :theme="{
        token: {
            colorPrimary: '#7A47B9',
        },
    }">
        <div class="hopeai flex justify-between">
            <div class="flex-1 flex flex-col overflow-hidden">
                <Header />
                <RouterView />
            </div>
        </div>

    </a-config-provider>
</template>

<style lang="scss">
.info_alert {
    position: fixed;
    left: 50%;
    top: 0;
    z-index: 9999;
    width: auto;
    max-width: 100%;
    padding: 0 20px;
    line-height: 34px;
    transform: translateX(-50%);
}

#app,
.hopeai {
    width: 100%;
    height: 100vh;
}

.ant-notification-notice-btn {
    margin-top: 0 !important;
    width: 100px;

    .ant-btn {
        width: 100px !important;
    }
}
</style>
