<template>
  <div class="default-layout" :class="thisRoute">
    <SiteHeader />
    <nuxt :key="$route.fullPath" class="wrapper" />
    <SiteFooter />
  </div>
</template>

<script>
export default {
  computed: {
    thisRoute() {
      return this.$route.name;
    },
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