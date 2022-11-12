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

  watchQuery: ["page"],
  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
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
    overflow: hidden;

    section {
      position: relative;

      &.news {
        background: $light-gray;
      }

      &.newsletter {
        padding: $xxl-spacer 0;

        // overflow-x: hidden;
        @media (max-width: $collapse-bp) {
          padding: $lg-spacer 0;
        }

        >* {
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
}
</style>
