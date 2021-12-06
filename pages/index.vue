<template>
  <div class="home page">
    <main>
      <section class="banner">
        <HomeBanner />
      </section>
      <section class="stats">
        <HomeStats />
      </section>
      <section class="news">
        <CompOurWins />
      </section>
      <section class="newsletter">
        <div class="circle-illustration"></div>
        <SiteNewsletter />
      </section>
      <section class="cta">
        <CompCTA />
      </section>
    </main>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  data() {
    return {
      title: "Home",
    };
  },
  async asyncData({ $sanity }) {
    const metaQuery = groq`*[_type == "metadata" && page == 'home'][0]{
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
.home {
  &.page {
    margin-top: 0;
  }
  main {
    section {
      position: relative;
      &.news {
        background: $light-gray;
      }
      &.newsletter {
        padding: $xxl-spacer 0;
        overflow: hidden;
        > * {
          max-width: 1142px;
          margin: 0 auto;
        }
      }
      &.cta {
        margin-bottom: $xxl-spacer;
        @media (max-width: $collapse-bp) {
          margin-bottom: $lg-spacer;
        }
      }
    }
  }

  .newsletter {
    position: relative;
    .circle-illustration {
      width: 669px;
      height: 669px;
      border: 1px solid $md-gray;
      border-radius: 50%;
      position: absolute;
      right: -334px;
      top: 0;
    }
  }
}
</style>
