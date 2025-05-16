<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { useBasicStore } from "@/stores/basic";

import { PURE_QUERIES } from "@/graphql/queries";
import { useQuery } from "@vue/apollo-composable";

import { useRouter } from "vue-router";

const router = useRouter();

const basicStore = useBasicStore();
const appStore = useAppStore();
const systemOpen = ref(false);


const { result, refetch } = useQuery<any>(PURE_QUERIES.INDICATION_LIST)


const goTemplate = (args: any) => {
    if (args.key === 'logout') {
        appStore.setUserInfo({});
        localStorage.removeItem("token");
        const url = import.meta.env.VITE_AUTH_HOPEAI + "/#/?" + "product_code=" + appStore.systemCode;
        const re_url = import.meta.env.VITE_CURRENT_HOPEAI + "/#/";
        const redirect = url + "&redirect=" + encodeURIComponent(re_url);
        window.location.href = redirect;
    } else if (args.key === 'header_setting') {
        router.push(`/set/prompt_setting`);
    }

    systemOpen.value = false;
};



const afterOpenChange = (e: any) => {
    console.log(e)
}

const cutIndication = (li: any) => {
    basicStore.setCurrentIndicationLabel(li);
    localStorage.setItem("currentIndicationLabel", JSON.stringify(li));
    systemOpen.value = false;
}
onMounted(() => {
    refetch();
})

watch(() => result.value, (val) => {
    if (val && val.IndicationList && val.IndicationList.length > 0) {
        basicStore.setIndicationList(val.IndicationList);
        const currentIndicationLabel = localStorage.getItem("currentIndicationLabel");
        if (currentIndicationLabel) {
            const parsedLabel = JSON.parse(currentIndicationLabel);
            const foundLabel = val.IndicationList.find((item: any) => item.id === parsedLabel.id);
            if (foundLabel) {
                basicStore.setCurrentIndicationLabel(foundLabel);
            } else {
                basicStore.setCurrentIndicationLabel(val.IndicationList[0]);
            }
        } else {
            basicStore.setCurrentIndicationLabel(val.IndicationList[0]);
        }
        // if (Object.keys(basicStore.currentIndicationLabel).length === 0) {
        //     basicStore.setCurrentIndicationLabel(val.IndicationList[0]);
        // }
    }
}, { immediate: true, deep: true })
</script>

<template>
    <div class="header_content bg-white">
        <div class="header px-5">
            <div class="logo flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
                <img class="logos" alt="Image" src="@/assets/img/header_logo.svg" />
                <span>PURE Evidence</span>
            </div>
            <div class="curation_menu flex-1 h-full flex items-center pl-2">
                <p class="menu_name" v-if="basicStore.indicationList.length > 0">
                    <a-dropdown :trigger="['click']">
                        <span class="ant-dropdown-link flex  items-center" @click.prevent>
                            {{ basicStore.currentIndicationLabel.name }}
                            <PureIcon icon="material-symbols:arrow-drop-down-rounded" class="text-2xl" />
                        </span>
                        <template #overlay>
                            <a-menu class="dropdown_menu">
                                <a-menu-item
                                    :class="['cursor-pointer', li.id === basicStore.currentIndicationLabel.id ? 'active' : '']"
                                    v-for="(li, index) of basicStore.indicationList" @click.prevent="cutIndication(li)"
                                    :key="index">
                                    {{ li.name }} </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </p>
                <p class="menu_name" v-else>
                    No Indication
                </p>
            </div>
            <div class="user" v-if="appStore.username.length > 0" @click="systemOpen = true">
                <a-avatar size="large" :style="{ verticalAlign: 'middle' }">
                    {{ appStore.username[0].toUpperCase() }}
                </a-avatar>
            </div>
        </div>
        <a-drawer v-model:open="systemOpen" class="Overlay_class" :closable="false" root-class-name="root-class-name"
            placement="right" @after-open-change="afterOpenChange" :width="320">
            <div class="Overlay">
                <div class="Overlay_header">
                    <div class="Overlay_titleWrap">
                        <a-avatar size="middle" :style="{ verticalAlign: 'middle' }">
                            {{ appStore.username[0].toUpperCase() }}
                        </a-avatar>
                        <span class="name">{{ appStore.username }}</span>
                    </div>
                    <div class="Overlay_close">
                        <PureIcon icon="material-symbols:close-rounded" class="text-xl" @click="systemOpen = false" />
                    </div>
                </div>
                <div class="Overlay_body">
                    <ul class="Overlay_ul">
                        <li v-for="manage of appStore.sysMenuList">
                            <template v-if="manage.key !== 'divider'">
                                <p class="template_manger" @click="goTemplate(manage)">
                                    <PureIcon :icon="manage.icon" class="text-base" />
                                    {{ manage.title }}
                                </p>
                            </template>
                            <template v-else>
                                <div class="man_divider"></div>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </a-drawer>



    </div>
</template>

<style lang="scss">
.router_wrap {
    height: 40px;
    padding: 0 20px;

    .router_menu {
        height: 100%;

        .menu_ul {
            margin: 0;
            display: flex;
            height: 100%;
            align-items: center;
            list-style: none;
            gap: 20px;
            padding: 0;

            li {
                height: 100%;
                position: relative;

                &.active {
                    .menu_item {
                        font-weight: 700;
                        color: #7a47b9;
                    }

                    &::after {
                        position: absolute;
                        content: "";
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: 2px;
                        background: var(--vt-c-primary);
                    }
                }

            }

            .menu_item {
                margin: 0;
                line-height: 40px;
                cursor: pointer;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 14px;
            }
        }
    }
}

.header_content {
    border-block-end: 1px solid rgba(5, 5, 5, 0.06);
    // background-color: rgba(255, 255, 255, 0.6);
    // -webkit-backdrop-filter: blur(8px);
    // backdrop-filter: blur(8px);
}

.header {
    display: flex;
    align-items: center;
    height: 56px;
    justify-content: space-between;

    position: relative;
    width: 100%;
}



.logo {
    span {
        font-weight: bold;
    }
}

.header .menu {
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    padding-left: 12px;

    .antv_menu {
        align-items: flex-end;
        background: transparent;
        border-bottom: 0;
        width: 400px;

        .ant-menu-item-selected .ant-menu-title-content {
            font-weight: 600;
        }
    }
}

.header .logos {
    height: 36px;
    object-fit: cover;
    position: relative;
}


.header .user {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 14px;
    justify-content: flex-end;
    position: relative;

}

.user {
    .ant-badge {
        cursor: pointer;
    }

    .ant-avatar {
        color: rgb(122, 71, 185);
        background: rgba(122, 71, 185, 0.15);
        cursor: pointer;
    }
}



.mask-group {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.logout {
    margin: 0;
    text-align: left;
}



.curation_menu {

    gap: 20px;

    span {
        font-weight: bold;
        cursor: pointer;
    }

    .menu_box {
        height: 44px;
        display: flex;
        align-items: center;
    }

    .menu_item {
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;

        &.active {
            color: #7a47b9;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0px;
                left: 0;
                width: 100%;
                height: 3px;
                border-radius: 10px;
                background: #7a47b9;
            }
        }
    }
}

.header_menu {
    .ant-dropdown-menu-item {
        padding: 0 !important;
    }
}

.root-class-name {
    .ant-drawer-content-wrapper {
        box-shadow: none;
    }
}

.Overlay_class {
    border-radius: 10px 0 0 10px;

    .ant-drawer-body {
        padding: 0;
    }
}

.menu_class {
    border-radius: 0 10px 10px 0;

    .ant-drawer-body {
        padding: 0;
    }
}

.ant-drawer .ant-drawer-mask {
    background: rgba(0, 0, 0, 0.1);
}

.Overlay {
    display: flex;
    flex-direction: column;

    .Overlay_header,
    .menu_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        margin: 0 8px;
        padding: 8px;

        .Overlay_titleWrap {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;

            .image {
                width: 36px;
                height: 36px;
            }

            .name {
                font-weight: bold;
            }

            .ant-avatar {
                color: rgb(122, 71, 185);
                background: rgba(122, 71, 185, 0.15);
            }
        }

        .Overlay_close {
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;

            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }



    .Overlay_body {


        ul {
            list-style: none;
            padding: 0
        }

        .template_manger {
            margin: 0;
            text-align: left;
            white-space: nowrap;
            cursor: pointer;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            gap: 10px;
            align-items: center;
            padding: 8px;
            border-radius: 4px;
            color: #1f2328;

            &:hover {
                background: #f5f5f5;
            }
        }
    }

    .Overlay_body {
        padding: 4px 8px 0 8px;
    }
}



.dropdown_menu {
    .active {
        background: #f5f5f5;
    }
}


.man_divider {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 4px 0;

    span {
        display: inline-block;
        padding: 0 1em;
    }

    &::before,
    &::after {
        position: relative;
        content: "";

        border-block-start: 1px solid rgb(217, 217, 217) !important;
        border-block-start-color: rgb(217, 217, 217) !important;
    }

    &::before {
        width: 30px;
    }

    &::after {
        width: 100%;
    }
}

.task_box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;

    .loads {
        position: absolute;
        font-size: 30px;
        display: flex;
        color: #999;
    }
}

.task_list_box {
    height: 80vh;
    overflow: auto;
}

.process_list {
    margin: 0;
}
</style>