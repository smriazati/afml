<template>
  <div class="newsletter page">
    <h1 class="section-title headline">Newsletter Signup</h1>
    <section class="newsletter">
      <SiteNewsletter />
    </section>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

export default {
  data() {
    return {
      title: "Newsletter Signup",
    };
  },
  async asyncData({ $sanity }) {
    const metaQuery = groq`*[_type == "metadata" && page == 'newsletter'][0]{
    "pageDesc": pageMetadata.pageDesc,
    "ogImage": pageMetadata.ogImage.asset->url}`;
    const metadata = await $sanity
      .fetch(metaQuery)
      .then((res) => res.pageMetadata);
    return { metadata };
  },
  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata
            ? this.pageMetadata.pageDesc
              ? this.pageMetadata.pageDesc
              : ""
              ? ""
              : ""
            : ""
            ? ""
            : "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.pageMetadata
            ? this.pageMetadata.ogImage.url
              ? this.pageMetadata.ogImage.url
              : ""
              ? ""
              : ""
            : ""
            ? ""
            : "",
        },
      ],
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
  }
  section.newsletter {
    max-width: 83%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: $xxl-spacer;
  }
}
</style>