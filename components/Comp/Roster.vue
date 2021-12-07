<template>
  <div class="roster">
    <h2 class="h1 section-title">Roster</h2>
    <div v-if="items" class="accordion-wrapper">
      <CompRosterItem
        :item="item"
        v-for="(item, index) in items"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "roster"]{
  name,
  role,
  bio,
 "img": img.image
    }`;

export default {
  async fetch() {
    this.items = await this.$sanity.fetch(query);
  },
  data: () => ({ items: "" }),
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