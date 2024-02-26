<script>
export default {
  name: 'UserSurvey',
  data() {
    return {
      userInfo: null,
    };
  },
  computed: {
    usersInfo() {
      return this.$store.state.user;
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.userInfo = this.usersInfo.filter((elem) => elem.info.seed === id);
  },
};
</script>
<template>
  <div>
  <h1>sss</h1>
  <p>{{ userInfo }}</p>
  </div>
</template>

<style scoped>

</style>
