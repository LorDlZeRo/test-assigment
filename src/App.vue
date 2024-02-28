<script>

export default {
  name: 'App',
};
</script>
<template>
  <section class="main">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </section>
</template>

<style scoped>
  .main {
    width: 100%;
    height: 100vh;
    background-color: rgb(203, 217, 217);
  }
</style>
