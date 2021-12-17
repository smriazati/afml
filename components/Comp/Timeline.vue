<template>
  <div class="timeline-wrapper">
    <CompTimelineItem
      v-for="(item, index) in tlItems"
      :key="item._id"
      :item="item"
      :index="index"
      :ref="`item${index}`"
      :isCollapsed="item.isCollapsed"
      @toggle-collapse="toggleCollapse"
    />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const tlQuery = groq`*[_type == "timeline"] | order(date asc){
  title,
  date,
  desc,
  "isCollapsed": true
}`;
export default {
  async fetch() {
    this.tlItems = await this.$sanity.fetch(tlQuery);
  },
  fetchOnServer: false,
  data: () => ({ tlItems: "" }),
  computed: {
    itemCount() {
      return this.tlItems.length;
    },
  },
  methods: {
    toggleCollapse(payload) {
      this.tlItems[payload.index].isCollapsed = payload.collapseState;
      this.tlItems.forEach((item, index) => {
        if (index !== payload.index && !item.isCollapsed) {
          item.isCollapsed = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>