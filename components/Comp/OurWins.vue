<template>
  <div class="our-wins flex-col align-center">
    <h3 class="h1 section-title">Our Wins</h3>
    <div class="accordion-wrapper">
      <CompOurWinsAccordionItem
        v-for="item in newsItems"
        :key="item._id"
        :item="item"
      />
    </div>
    <div class="btn-container center">
      <button class="read-more plain flat">
        <nuxt-link to="/thelatest">Read more</nuxt-link>
      </button>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

const newsQuery = groq`*[_type == "newsItem" && article.featured == true ]| order(date desc)[0...5]{date,headline,"article": {"byline": article.byline,"link": article.link,"excerpt": article.excerpt}}`;

export default {
  async fetch() {
    this.newsItems = await this.$sanity.fetch(newsQuery);
  },
  fetchOnServer: false,
  data: () => ({ newsItems: "" }),
};
</script>


<style lang="scss">
$container-padding: 40px;
$mobile-left-container-padding: 10px;
$mobile-top-container-padding: 19px;

.our-wins {
  padding: $xl-spacer 0;
  @include mediumContainerPadding;
  .accordion-wrapper {
    margin-top: $lg-spacer;
    @media (max-width: $collapse-bp) {
      margin-top: $md-spacer;
    }
    .accordion-open {
      @media (max-width: $collapse-bp) {
        padding: $mobile-top-container-padding $mobile-left-container-padding;
      }
      .title {
        @include fontRobotoCondensed;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        letter-spacing: 0em;
        @media (max-width: $collapse-bp) {
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
    .accordion-collapse-area {
      background: $white;
      display: grid;
      border: 2px solid $indigo;
      grid-template-columns: 90% 10%;
      grid-auto-rows: 180px 180px auto;
      grid-template-areas:
        "t d"
        "e d"
        "b l";
      @media (max-width: $collapse-bp) {
        grid-template-columns: 80% 20%;
        grid-auto-rows: minmax(180px, max-content) minmax(180px, max-content)
          auto;
      }
      .title {
        grid-area: t;
        @include fontRobotoCondensed;
        font-size: 44px;
        font-weight: 700;
        line-height: 52px;
        letter-spacing: 0em;
        padding-top: $container-padding;
        padding-left: $container-padding;
        @media (max-width: $collapse-bp) {
          font-size: 28px;
          line-height: 32px;
          padding-top: $mobile-top-container-padding;
          padding-left: $mobile-left-container-padding;
        }
      }
      .excerpt {
        padding: 85px 0;
        max-width: 650px;
        padding-left: $container-padding;
        @media (max-width: $collapse-bp) {
          font-size: 20px;
          line-height: 28px;
          padding-left: $mobile-left-container-padding;
        }
      }
      .date {
        grid-area: d;
        border-left: 2px solid $mild-gray;
        padding-top: $container-padding;
        overflow: visible;
        width: 100%;
        margin-top: 0;
        @media (max-width: $collapse-bp) {
          padding-top: $mobile-top-container-padding;
        }
        span {
          display: block;
          overflow: visible;
          width: 100%;
        }
        .rotate {
          display: flex;
          white-space: nowrap;
          transform-origin: top center;
          transform: rotate(90deg) translateY(-12px) translateX(85px);
          //styleName: H5;
          @include fontMontserrat;
          text-transform: uppercase;
          font-size: 20px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: 0.08em;
          text-align: center;
        }
      }
      .byline {
        grid-area: b;
        padding-bottom: $container-padding;
        padding-left: $container-padding;
        @include fontRoboto;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        align-self: end;
        letter-spacing: 0em;
        @media (max-width: $collapse-bp) {
          font-size: 14px;
          line-height: 16px;
          padding-bottom: $mobile-top-container-padding;
          padding-left: $mobile-left-container-padding;
        }
      }
      .link {
        grid-area: l;
        background: $indigo;
        color: $white;
        padding: 23px;

        i {
          font-size: 23px;
        }
        @media (max-width: $collapse-bp) {
          padding: $mobile-left-container-padding;
        }
      }
    }
  }

  .read-more {
    text-transform: uppercase;
    padding: $lg-spacer 0;
    width: 100%;
  }
}
.accordion-item-expanded + .accordion-item-expanded {
  .accordion-collapse-area {
    border-top: 0;
  }
}
</style>