<template>
  <div class="about page">
    <section class="intro">
      <h1 class="headline section-title">About</h1>
      <div v-if="about" class="text">
        <p>{{ about.about }}</p>
      </div>
    </section>

    <section class="roster">
      <CompRoster />
    </section>
    <section class="newsletter">
      <div class="circle-illustration"></div>
      <SiteNewsletter />
    </section>
    <section class="cta">
      <CompCTA />
    </section>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const query1 = groq`*[_type == "siteContent"]{about}`;
    const about = await $sanity.fetch(query1).then((res) => res[0]);

    const metaQuery = groq`*[_type == "metadata" && page == 'about'][0]{
    "pageDesc": pageMetadata.pageDesc,
    "ogImage": pageMetadata.ogImage.asset->url}`;
    const metadata = await $sanity
      .fetch(metaQuery)
      .then((res) => res.pageMetadata);
    return { about, metadata };
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
  data() {
    return {
      title: "Who We Are",
    };
  },
};
</script>


<style lang="scss">
.page.about {
  .intro {
    @include containerWidth;

    margin-top: $lg-spacer;
    margin-bottom: $xl-spacer;
    @media (max-width: $mobile-bp) {
      margin-top: $md-spacer;
      margin-bottom: $lg-spacer;
    }
    .section-title {
      padding-bottom: $md-spacer;
      @media (max-width: $mobile-bp) {
        padding-bottom: $sm-spacer;
      }
      border-bottom: 1px solid $mild-gray;
    }
    .text {
      margin-top: $md-spacer;
      @media (min-width: $mobile-bp) {
        width: 67%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: $sm-spacer;
      }
    }
  }
  .roster {
    @include containerWidth;
    background: $light-gray;
    padding-top: $lg-spacer;
    padding-bottom: $lg-spacer;

    @media (max-width: $mobile-bp) {
      padding-top: $lg-spacer;
      padding-bottom: $lg-spacer;
    }
  }

  section {
    &.newsletter {
      padding: $xxl-spacer 0;
      @media (max-width: $mobile-bp) {
        padding: $xl-spacer 0;
      }
      > * {
        max-width: 1142px;
        margin: 0 auto;
      }
    }
    &.cta {
      margin-bottom: $xxl-spacer;
      @media (max-width: $mobile-bp) {
        margin-bottom: $xl-spacer;
      }
    }
  }
}
</style>