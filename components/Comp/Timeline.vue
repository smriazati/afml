<template>
  <div class="timeline-wrapper">
    <CompTimelineItem
      v-for="(item, index) in items"
      :key="item._id"
      :item="item"
      :index="index"
      @on-open="closeOthers(i)"
    />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "timeline"] | order(date asc){
  title,
  date,
  desc
}`;

export default {
  async fetch() {
    this.items = await this.$sanity.fetch(query);
  },
  data: () => ({ items: "" }),
  methods: {
    closeOthers(i) {
      console.log(i);
    },
  },
};
</script>

<style lang="scss">
</style>