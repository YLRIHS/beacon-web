<template>
    <div class="h_chat_spin w-full h-full flex justify-center items-center relative">
        <a-spin size="large" />
    </div>
</template>


<style lang="scss">
.h_chat_spin {
    // background: rgba(0, 0, 0, 0.01);
    z-index: 100;
    backdrop-filter: blur(4px);
}

@media screen and (max-width:768px) {
    .h_chat_spin {
        padding-bottom: 120px;
    }
}
</style>