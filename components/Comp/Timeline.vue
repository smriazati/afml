<template>
  <div class="timeline-wrapper">
    <CompTimelineItem v-for="item in items" :key="item._id" :item="item" />
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
};
</script>

<style lang="scss">
</style>