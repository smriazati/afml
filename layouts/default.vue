<template>
  <div class="default-layout">
    <SiteHeader />
    <nuxt class="wrapper" />
    <SiteFooter />
  </div>
</template>

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