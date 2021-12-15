<template>
  <div class="timeline-wrapper">
    <CompTimelineItem
      v-for="(item, index) in tlItems"
      :key="item._id"
      :item="item"
      :index="index"
      :ref="`item-${index}`"
      @on-open="closeOthers(index)"
    />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const tlQuery = groq`*[_type == "timeline"] | order(date asc){
  title,
  date,
  desc
}`;
export default {
  async fetch() {
    this.tlItems = await this.$sanity.fetch(tlQuery);
  },
  fetchOnServer: false,
  data: () => ({ tlItems: "" }),
  methods: {
    closeOthers(i) {
      console.log(i);
      const items = this.tlItems;
      items.forEach(item);
    },
  },
};
</script>

<style lang="scss">
</style>