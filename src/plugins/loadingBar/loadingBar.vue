<template>
    <div
        :class="['n-loading-bar-container', is_show ? '' : 'hide', is_start ? 'fade-in-transition-enter fade-in-transition-enter-active' : '']">
        <div ref="loadingBar"
            :class="['n-loading-bar', startStatus ? 'n-loading-bar--starting' : '', errorStatus ? 'n-loading-bar--error' : '', finishStatus ? 'n-loading-bar--finishing' : '']">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const startStatus = ref(false);
const errorStatus = ref(false);
const finishStatus = ref(false);
const is_show = ref(true);
const is_start = ref(false);
const loadingBar = ref<any>(null);
const start = () => {
    startStatus.value = true;
    errorStatus.value = false;
    finishStatus.value = false;
    is_show.value = true;
    loadingBar.value.style.maxWidth = "80%";
}

const error = () => {
    startStatus.value = false;
    errorStatus.value = true;
    finishStatus.value = false;
    loadingBar.value.style.maxWidth = "100%";
    setTimeout(() => {
        is_show.value = false;
    }, 200);
    setTimeout(() => {
        is_show.value = true;
        loadingBar.value.style.maxWidth = "0%";
    }, 300);
}

const finish = () => {
    startStatus.value = false;
    errorStatus.value = false;
    finishStatus.value = true;
    loadingBar.value.style.maxWidth = "100%";
    setTimeout(() => {
        is_show.value = false;
    }, 200);
    setTimeout(() => {
        is_show.value = true;
        loadingBar.value.style.maxWidth = "0%";
    }, 300);


}

defineExpose({
    start,
    error,
    finish
});
</script>

<style scoped lang="scss">
.n-loading-bar-container {
    z-index: 5999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;

    .n-loading-bar {
        position: absolute;
        width: 100%;
        transition: max-width 4s linear;
        height: 2px;
        // opacity: 0;
        max-width: 0%;

        &.n-loading-bar--starting {
            background: #7A47B9;
            // opacity: 1;
        }

        &.n-loading-bar--error {
            background: #d03050;
            transition: max-width .2s linear;
        }

        &.n-loading-bar--finishing {
            background: #7A47B9;
            // max-width: 100%;
            transition: max-width .2s linear;
        }

    }



}

.hide {
    display: none;
}

@keyframes load {
    0% {
        left: -100%;
    }

    100% {
        left: 100%;
    }
}
</style>
