<template>
  <div class="the-latest">
    <h3 class="h1 section-title">The Latest</h3>
    <div class="feed-wrapper">
      <vue-masonry-wall
        :items="newsItems"
        :options="{ width: 320, padding: 32 }"
        @append="append"
      >
        <template v-slot:default="{ item }">
          <CompTheLatestItem :item="item" />
        </template>
      </vue-masonry-wall>
    </div>
    <!-- <button @click="getMoreNews" class="read-more">
      <nuxt-link to="">Read more</nuxt-link>
    </button> -->
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
import VueMasonryWall from "vue-masonry-wall";

export default {
  async fetch() {
    const query = groq`*[_type == "newsItem"]| order(date desc)[0...10]{
      type,
      date,
      headline,
      "article": {
        "byline": article.byline,
      "link": article.link,
      "excerpt": article.excerpt,
      "img": article.img  
      },
      "twitter": twitter.link,
      _id
    }`;
    console.log(query);
    this.newsItems = await this.$sanity.fetch(query);
    if (this.newsItems.length < this.articleCount) {
      this.loadedAllArticles = true;
    }
    this.fetches = this.fetches + 1;
  },
  components: { VueMasonryWall },
  data: () => ({
    newsItems: [],
    articleCount: 10,
    fetches: 0,
    loadedAllArticles: false,
  }),
  methods: {
    append() {
      console.log("append");
      // for (let i = 0; i < 20; i++) {
      //   this.newsItems.push({
      //     title: `Item ${this.newsItems.length}`,
      //     content: "Content",
      //   });
      // }
    },
    async getMoreNews() {
      if (!this.loadedAllArticles) {
        const query = groq`*[_type == "newsItem"]| order(date desc)[${
          this.articleCount * this.fetches + 1
        } ... ${this.articleCount * this.fetches + this.articleCount}]{
          type,
          date,
          headline,
          "article": {
            "byline": article.byline,
          "link": article.link,
          "excerpt": article.excerpt,
          "img": article.img  
          },
          "twitter": twitter.link,
          _id
    }`;
        const newItems = await this.$sanity.fetch(query);
        console.log(query);

        if (newItems.length > 0) {
          for (const item of newItems) {
            this.newsItems.push(item);
          }
          this.fetches = this.fetches + 1;
        }
        if (newItems.length < this.articleCount || newItems.length === 0) {
          this.loadedAllArticles = true;
        }
      }
    },
  },
};
</script>


<style lang="scss">
.the-latest {
  .section-title {
    margin-top: $lg-spacer;
    margin-bottom: $md-spacer;
  }
  .feed-wrapper {
    border-top: 2px solid $mild-gray;
    padding-top: $md-spacer;
    max-width: 1375px;
    margin: 0 auto;
  }
}
</style>