<template>
  <div class="the-latest">
    <h3 class="h1 section-title">The Latest</h3>
    <div class="feed-wrapper">
      <vue-masonry-wall :items="newsItems" :options="options">
        <template v-slot:default="{ item }">
          <CompTheLatestItem :item="item" />
        </template>
      </vue-masonry-wall>
    </div>
    <div class="pagination">
      <button
        v-if="!loadedAllArticles"
        @click="getMoreNews"
        class="read-more plain"
      >
        <span>Read more</span>
      </button>
      <p v-else class="caption">End of The Latest</p>
    </div>
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
    // console.log(query);
    this.newsItems = await this.$sanity.fetch(query);
    if (this.newsItems.length < this.articleCount) {
      this.loadedAllArticles = true;
    }
    this.fetches = this.fetches + 1;
  },
  fetchOnServer: false,
  components: { VueMasonryWall },
  data: () => ({
    newsItems: [],
    articleCount: 10,
    fetches: 0,
    loadedAllArticles: false,
    options: {
      width: 320,
      padding: {
        2: 8,
        default: 32,
      },
    },
  }),
  methods: {
    append() {
      console.log("append api call here");
    },
    async getMoreNews() {
      if (!this.loadedAllArticles) {
        console.log(
          "querying articles",
          this.articleCount * this.fetches + 1,
          " through ",
          this.articleCount * this.fetches + this.articleCount
        );
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
        // console.log(query);

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
  @media (max-width: $collapse-bp) {
    padding: 0 15px;
  }
  .section-title {
    margin-top: $lg-spacer;
    margin-bottom: $md-spacer;
  }
  .feed-wrapper {
    border-top: 2px solid $mild-gray;
    padding-top: $md-spacer;
    max-width: 1375px;
    overflow: hidden;
    margin: 0 auto;
    // .masonry-item {
    //   background: $sand;
    // }
  }
  .pagination {
    display: flex;
    width: 100%;
    justify-self: center;
    align-items: center;
    text-align: center;
    button {
      margin-left: auto;
      margin-right: auto;
    }
    p {
      padding-top: 80px;
      display: block;
      width: 100%;
    }
  }
}
</style>