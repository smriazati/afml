<template>
  <div class="default-layout" :class="thisRoute">
    <SiteHeader />
    <nuxt :key="$route.fullPath" class="wrapper" />
    <SiteFooter />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const pageMetaQuery = groq`*[_type == "metadata"]{
"slug": page,
"description": pageMetadata.pageDesc,
"socialImage": pageMetadata.ogImage.asset->url}`;
const siteMetaQuery = groq`*[_type == "siteSettings"][0]{"description": siteDesc, "socialImage": ogImg.asset->url}`;
export default {
  async fetch() {
    const pageMetadata = await this.$sanity.fetch(pageMetaQuery);
    const siteMetadata = await this.$sanity.fetch(siteMetaQuery);
    this.$store.commit("metadata/addPageMetadata", pageMetadata);
    this.$store.commit("metadata/addSiteMetadata", siteMetadata);
  },
  fetchOnServer: false,
  computed: {
    thisRoute() {
      return this.$route.name;
    },
  },
  mounted() {
    this.getMetadata();
  },
  watch: {
    thisRoute() {
      this.getMetadata();
    },
  },
  data() {
    return {
      description: "",
      socialImage: "",
    };
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.socialImage,
        },
      ],
    };
  },
  methods: {
    getMetadata() {
      const allPageMetadata = this.$store.state.metadata.pageMetadata;
      const thisPageMetadata = allPageMetadata.filter(
        (page) => page.slug === this.$route.name
      )[0];
      thisPageMetadata?.description
        ? (this.description = thisPageMetadata.description)
        : (this.description = this.$store.state.metadata.siteDescription);
      thisPageMetadata?.socialImage
        ? (this.socialImage = thisPageMetadata.socialImage)
        : (this.socialImage = this.$store.state.metadata.siteSocialImage);
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