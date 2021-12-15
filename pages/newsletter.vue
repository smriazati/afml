<template>
  <div class="newsletter page">
    <h1 class="section-title headline">Newsletter Signup</h1>
    <section class="newsletter">
      <SiteNewsletter />
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Newsletter Signup",
    };
  },

  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    };
  },
};
</script>


<style lang="scss">
.newsletter.page {
  @include containerWidth;
  > * {
    width: 100%;
  }
  .section-title {
    border-bottom: 1px solid $mild-gray;
    padding-bottom: $sm-spacer;
    margin-top: $md-spacer;
    margin-bottom: $xxl-spacer;
    @media (max-width: $collapse-bp) {
      margin-top: $sm-spacer;
      margin-bottom: $lg-spacer;
    }
  }
  section.newsletter {
    @media (min-width: $collapse-bp) {
      max-width: 83%;
    }
    margin-left: auto;
    margin-right: auto;
    margin-bottom: $xxl-spacer;
    @media (max-width: $collapse-bp) {
      margin-bottom: $lg-spacer;
    }
  }
}
</style>