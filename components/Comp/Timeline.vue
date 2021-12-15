<template>
  <div class="timeline-wrapper">
    <CompTimelineItem
      v-for="(item, index) in tlItems"
      :key="item._id"
      :item="item"
      :index="index"
      :ref="`item${index}`"
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
  computed: {
    itemCount() {
      return this.tlItems.length;
    },
  },
  methods: {
    closeOthers(i) {
      let btns = [];
      for (let loopI = 0; loopI < this.itemCount; loopI++) {
        if (loopI !== i) {
          btns.push(this.$refs[`item${loopI}`][0].$refs.toggleBtn);
        }
      }
      console.log(btns);
      // console.log("clicked on " + i + " out of " + this.itemCount);
      btns.forEach((btn) => {
        // btn.click();
      });
    },
  },
};
</script>

<style lang="scss">
</style>