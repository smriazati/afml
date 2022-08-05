<template>
  <div class="the-latest-item item">
    <div v-if="item" class="wrapper">
      <div class="file-wrapper" v-if="item.type === 'file'">
        <h3 v-if="item.headline">{{ item.headline }}</h3>
        <SystemBtnCircle
          v-if="item.file.url"
          :icon="true"
          msg="arrow-right"
          :dest="`${item.file.url}?dl=${item.file.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.':*?<>{}]/g, '')}.pdf`"
        />
      </div>
      <div v-if="item.type === 'tweet'">
        <div v-if="tweetId">
          <Tweet :id="tweetId"><div class="spinner"></div></Tweet>
        </div>
        <div v-else>
          <p class="small">Unable to load tweet.</p>
        </div>
      </div>
      <div class="article-wrapper" v-if="item.type === 'article'">
        <figure>
          <div v-if="item.article.img">
            <SanityImage
              :asset-id="item.article.img.asset._ref"
              auto="format"
              width="320"
            />
          </div>
        </figure>
        <h3 v-if="item.headline">{{ item.headline }}</h3>
        <p class="byline caption" v-if="item.article.byline">
          {{ item.article.byline }}
        </p>
        <SystemBtnCircle
          v-if="item.article.link"
          :icon="true"
          msg="arrow-right"
          :dest="item.article.link"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Tweet } from "vue-tweet-embed";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Tweet,
  },
  computed: {
    tweetId() {
      if (!this.item.type === "tweet") {
        return null;
      }
      if (!this.item.twitter) {
        return null;
      }

      const link = this.item.twitter;
      if (!link) {
        return null;
      }
      const id = link.split("/").pop();
      return id;
    },
  },
};
</script>


<style lang="scss">
.the-latest-item {
  .file-wrapper,
  .article-wrapper {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-auto-rows: auto;
    grid-template-areas:
      "img img"
      "headline btn"
      "byline byline";

    figure {
      grid-area: img;
      margin-bottom: 32px;
    }
    h3 {
      grid-area: headline;
      @include fontRobotoCondensed;
      font-size: 20px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      margin-bottom: 32px;
    }
    .byline {
      grid-area: byline;
    }
    button {
      grid-area: btn;
      font-size: 28px;
      height: 40px;
      width: 40px;
      justify-self: end;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>