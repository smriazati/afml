<template>
  <div class="page basic">
    <div v-if="page" class="grid">
      <h1 class="headline section-title">{{ page.title }}</h1>
      <div v-if="page.content" class="content">
        <SanityContent :blocks="page.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, redirect, $sanity }) {
    const query = groq`*[_type == "page"]{title, content, slug}`;
    const pages = await $sanity.fetch(query).then((res) => res);
    const filteredPage = pages.find(
      (pages) => pages.slug.current === params.id
    );
    if (filteredPage) {
      return {
        page: filteredPage,
      };
    } else {
      redirect("/");
    }

    const metaQuery = groq`*[_type == "metadata" && page == '${params.id}'][0]{
    "pageDesc": pageMetadata.pageDesc,
    "ogImage": pageMetadata.ogImage.asset->url}`;
    const metadata = await $sanity
      .fetch(metaQuery)
      .then((res) => res.pageMetadata);
    return { items, metadata };
  },
  head() {
    return {
      title: this.$route.params.id.replace(/(^\w|\s\w)/g, (m) =>
        m.toUpperCase()
      ),
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
      title: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss">
.page.basic {
  .grid {
    padding-top: $lg-spacer;
    padding-bottom: $lg-spacer;
    h1,
    .content {
      grid-column-start: 2;
      grid-column-end: 11;
    }
    h1 {
      border-bottom: 1px solid $mild-gray;
      margin-bottom: $md-spacer;
    }
    .content {
      h2,
      h3,
      h4 {
        font-size: 32px;
        line-height: 38px;
        margin-bottom: $sm-spacer;
      }
      ul,
      ol {
        padding-left: 30px;
      }

      p,
      ul,
      ol {
        & + h2,
        & + h2,
        & + h3 {
          margin-top: $md-spacer;
        }
      }
    }
  }
}
</style>