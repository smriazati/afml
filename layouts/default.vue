<template>
  <div class="default-layout" :class="page">
    <SiteHeader />
    <nuxt class="wrapper" />
    <SiteFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.name,
    };
  },
};
</script>
<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .wrapper {
    flex: 1;
  }
}
</style>