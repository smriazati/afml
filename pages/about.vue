<template>
  <div class="about page">
    <section class="intro">
      <div class="line-animation" ref="lineAnim"></div>
      <div class="text-wrapper">
        <h1 class="headline section-title">About</h1>
        <div v-if="content" class="text">
          <p>{{ content.about }}</p>
        </div>
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
  async asyncData({ $sanity, store, app }) {
    const slug = "about";

    // get page content
    const query1 = groq`*[_type == "siteContent"]{${slug}}`;
    const content = await $sanity.fetch(query1).then((res) => res[0]);

    // not working as expected
    app.$getPageMetadata(slug);
    app.$getSiteMetadata();

    // console.log(pageMetadata, siteMetadata);
    return { content };
  },

  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.state.metadata.savedPagesMetadata?.description
            ? this.metadata.description
            : this.siteMetadata?.siteDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.metadata?.socialImage
            ? this.metadata.socialImage
            : this.$store.state.metadata.siteSocialImage,
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
    overflow: hidden;
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

@keyframes lineAnimateIn {
  from {
    height: 0%;
  }
  to {
    height: 300%;
  }
}
.page.about {
  .intro {
    position: relative;
    .line-animation {
      border-left: 1px dashed $md-gray;
      background: transparent;
      position: absolute;
      top: -30px;
      right: -30px;
      @media (max-width: $collapse-bp) {
        right: -60px;
      }
      width: 10px;
      // height: 300%;
      height: 0;
      animation: lineAnimateIn 3s ease-in forwards;
      transform-origin: top;
      transform: rotate(45deg);
      z-index: 5;
    }
    .text-wrapper {
      z-index: 6;
    }
  }
  .roster {
    position: relative;
    z-index: 6;
  }

  // override circle illustration position and color

  section.newsletter {
    position: relative;
    z-index: 11;

    > * {
      position: relative;
      z-index: 11;
    }

    > .circle-illustration {
      width: 719px;
      height: 719px;
      border: 1px dashed $dark-cinnamon;
      border-radius: 50%;
      position: absolute;
      left: -360px;
      right: unset;
      top: $xs-spacer;
      z-index: 10;
    }
  }

  section.newsletter + section.cta {
    position: relative;
    z-index: 11;
  }
}
</style>
