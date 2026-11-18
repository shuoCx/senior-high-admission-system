<template>
  <router-view />
</template>

<script setup>
// 根组件：当前仅承载路由出口。
// 组员添加布局（侧边栏/顶栏）时，把 router-view 移入 layout 组件即可。
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei',
    'PingFang SC', Helvetica, Arial, sans-serif;
  background-color: #f5f7fa;
  color: #303133;
}
</style>