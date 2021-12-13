<template>
  <div class="the-problem page">
    <section class="problem-cards">
      <h1 ref="headline" class="headline section-title centered">
        So what's the problem?
      </h1>
      <CompProblemCards />
      <button class="add-more plain flat no-border">
        <nuxt-link to="/contact"
          >ARE YOU A PLAYER? SUBMIT YOUR OWN “PROBLEM CARD” HERE.</nuxt-link
        >
      </button>
    </section>
    <section class="timeline">
      <h2 class="h1 section-title">How We Got Here</h2>
      <CompTimeline />
    </section>
    <section class="bor">
      <CompBillOfRights />
    </section>
    <section class="problem-cta">
      <h2 class="headine section-title">Ready to get involved?</h2>
      <div class="row">
        <SystemBtnPrimary msg="Join Our Newsletter" dest="/newsletter" />
        <SystemBtnPrimary msg="Donate Today" dest="/donate" />
      </div>
    </section>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  data() {
    return {
      title: "The Problem",
    };
  },
  async asyncData({ $sanity }) {
    const metaQuery = groq`*[_type == "metadata" && page == 'theproblem'][0]{
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
  // mounted() {
  //   this.$nextTick(() => {
  //     this.setTitleAnim();
  //   })
  // },
  // methods: {
  //   setTitleAnim() {
  //     headline
  //   }
  // }
};
</script>


<style lang="scss">
.the-problem.page {
  section {
    &.problem-cards {
      background: $light-gray;
      padding-top: $lg-spacer;
      padding-bottom: $xxl-spacer;
      @media (max-width: $mobile-bp) {
        padding-top: $md-spacer;
        padding-bottom: $xl-spacer;
      }
      > * {
        max-width: 1142px;
        margin: 0 auto;
        @media (max-width: 1142px) {
          padding-left: 18px;
          padding-right: 18px;
        }
      }
      @keyframes slideIn {
        from {
          transform: translateX(100vw);
        }
        to {
          transform: translateX(0vw);
        }
      }
      .section-title {
        transform: translateX(100vw);
        animation: slideIn 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        @include fontRobotoCondensed;
        font-size: 89px;
        font-weight: 700;

        line-height: 104px;
        letter-spacing: 0em;
        color: $dark-cinnamon;
        text-align: center;

        padding-bottom: $lg-spacer;
        @media (max-width: $collapse-bp) {
          font-size: 50px;
          line-height: 56px;
          padding-bottom: $md-spacer;
        }
      }
      .add-more {
        display: block;
        margin-top: $lg-spacer;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        @include fontMontserrat;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: center;
        color: $dark-gray;
      }
    }
  }

  section.timeline {
    max-width: 1142px;
    margin-left: auto;
    margin-right: auto;
    padding-top: $xxl-spacer;

    @media (max-width: 1142px) {
      padding-left: 18px;
      padding-right: 18px;
    }

    @media (max-width: $collapse-bp) {
      padding-top: $lg-spacer;
    }

    .section-title {
      padding-bottom: $md-spacer;
      border-bottom: 1px solid $mild-gray;
    }
    .timeline-wrapper {
      padding-top: $md-spacer;
    }
  }

  section.problem-cta {
    @include containerWidth;
    padding: $xxl-spacer 0;
    @media (max-width: $collapse-bp) {
      padding: $lg-spacer 15px;
    }
    .section-title {
      margin-bottom: $lg-spacer;
      font-size: 72px;
      line-height: 76px;
      @media (max-width: $collapse-bp) {
        font-size: 50px;
        line-height: 56px;
        margin-bottom: $md-spacer;
      }
    }
    .row {
      > *:not(:last-child) {
        @media (min-width: $mobile-bp) {
          margin-right: 40px;
        }
        @media (max-width: $mobile-bp) {
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>