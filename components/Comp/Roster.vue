<template>
  <div class="roster">
    <h2 class="h1 section-title">Roster</h2>
    <div v-if="rosterItems" class="accordion-wrapper">
      <CompRosterItem
        :item="item"
        v-for="(item, index) in rosterItems"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
const rosterQuery = groq`*[_type == "roster"] | order(order asc){
  name,
  role,
  bio,
 "img": img.image
    }`;
export default {
  async fetch() {
    this.rosterItems = await this.$sanity.fetch(rosterQuery);
  },
  fetchOnServer: false,
  data: () => ({ rosterItems: "" }),
};
</script>


<style lang="scss">
.roster {
  .accordion-wrapper {
    margin-top: $lg-spacer;
    @media (max-width: $mobile-bp) {
      margin-top: md-spacer;
    }
  }
}
</style>