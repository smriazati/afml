<template>
  <div class="our-wins">
    <h3 class="h1 section-title">Our Wins</h3>
    <div class="accordion-wrapper">
      <CompOurWinsAccordionItem
        v-for="item in newsItems"
        :key="item._id"
        :item="item"
      />
    </div>
    <button class="read-more">
      <nuxt-link to="/thelatest">Read more</nuxt-link>
    </button>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "newsItem" && article.featured == true ]| order(date desc)[0...5]{
  date,
  headline,
  "article": {
    "byline": article.byline,
  "link": article.link,
  "excerpt": article.excerpt,
}}`;

export default {
  async fetch() {
    this.newsItems = await this.$sanity.fetch(query);
  },
  data: () => ({ newsItems: "" }),
};
</script>


<style lang="scss">
$container-padding: 40px;
.our-wins {
  padding: $xl-spacer 0;

  .accordion-wrapper {
    .accordion-open {
      .title {
        @include fontRobotoCondensed;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        letter-spacing: 0em;
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
      .title {
        grid-area: t;
        @include fontRobotoCondensed;
        font-size: 44px;
        font-weight: 700;
        line-height: 52px;
        letter-spacing: 0em;
        padding-top: $container-padding;
        padding-left: $container-padding;
      }
      .excerpt {
        padding: 85px 0;
        max-width: 650px;
        padding-left: $container-padding;
      }
      .date {
        grid-area: d;
        border-left: 2px solid $mild-gray;
        padding-top: $container-padding;
        overflow: visible;
        width: 100%;
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
      }
      .link {
        grid-area: l;
        background: $indigo;
        color: $white;
        padding: 23px;
        i {
          font-size: 23px;
        }
      }
    }
  }
}
</style>