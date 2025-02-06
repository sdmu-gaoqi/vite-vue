<template>
  <a-layout>
    <a-layout-sider
      width="200"
      style="background: #fff"
      collapsible
      collapsedWidth="40"
    >
      <a-menu
        mode="inline"
        theme="dark"
        :style="{ height: '100%', borderRight: 0 }"
        @click="handleClickMenu"
        :selectedKeys="[tab]"
      >
        <img :src="Logo" class="w-[60%] mx-auto my-[10%] block" />
        <template v-for="item in currentMenus">
          <a-sub-menu
            v-if="item.children && item.children?.length > 0"
            :key="item.key"
          >
            <template #title>
              <span>
                <img
                  :src="item.icon"
                  v-if="item.icon"
                  class="h-[15px] mr-[5px]"
                />
                {{ renderName(item) }}
              </span>
            </template>
            <template v-for="children in item.children">
              <a-menu-item
                v-if="item.children && item.children.length > 0"
                :key="children.key"
                >{{ renderName(children) }}</a-menu-item
              >
            </template>
          </a-sub-menu>
          <template v-else-if="!item.children || item.children?.length === 0">
            <a-menu-item :key="item.key">
              <img
                :src="item.icon"
                v-if="item.icon"
                class="h-[15px] mr-[5px]"
              />
              {{ renderName(item) }}
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="flex header wa-admin-header">
        <div class="logo" />
        <div class="ml-auto min-w-[100px] flex">
          <a class="flex mr-[10px]" @click="changeFull">
            <img :src="fullImg" class="w-[20px]"
          /></a>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="(v) => changeLang(v.key)">
                <a-menu-item :key="i.value" v-for="i in langMap">
                  <a>{{ i.label }}</a>
                </a-menu-item>
              </a-menu>
            </template>
            <a class="flex items-center text-white"
              ><img :src="lanSvg" class="w-[20px] h-[20px] mr-[10px]" />{{
                langLabel
              }}</a
            >
          </a-dropdown>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="systemLogout">
                <a-menu-item key="1"> 退出登录 </a-menu-item>
              </a-menu>
            </template>
            <a class="flex items-center ml-[10px]"
              ><Avatar class="avatar ml-[10px]"></Avatar></a
          ></a-dropdown>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store'
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Avatar } from 'ant-design-vue'
import { systemLogout } from '@/utils'
import { useI18n } from 'vue-i18n'
import { changeLang } from '@/utils/lang'
import lanSvg from '@/assets/svg/lan.svg'
import { MenuItem } from '@/types'
import Logo from '@/assets/image/logo.png'
import { fullscreen } from 'wa-utils'
import fullImg from '@/assets/svg/full.svg'
import { langMap, getLangLable } from '@/constant'

const store = useStore()
const { locale, t } = useI18n()
const router = useRouter()
const routeData = useRoute()

const path = routeData.path
const tab = ref(path)

const langLabel = getLangLable(String(locale.value))

const renderName = (item: MenuItem) => {
  const name = item.title
  return t(name)
}

const currentMenus = computed(() => {
  return store.state.common.menus
})

const handleClickMenu = (item: MenuItem) => {
  tab.value = item.key
  router.push(item.key)
}

const changeFull = () => {
  // @ts-ignore
  const isFull = fullscreen?.status()
  if (isFull) {
    fullscreen.exit()
    return
  }
  fullscreen.to()
}
</script>
<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.wa-admin-header {
  background: #fff !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  @apply !shadow-coolGray-200 !shadow-md !mb-[10px];
}
</style>
