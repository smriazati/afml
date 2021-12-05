<template>
  <div class="problem-cards-wrapper cards">
    <CompProblemCardItem v-for="item in items" :key="item._id" :item="item" />
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "problems"] | order(order asc)`;

export default {
  async fetch() {
    this.items = await this.$sanity.fetch(query);
  },
  data: () => ({ items: "" }),
};
</script>


<style lang="scss">
.problem-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 500px;
  grid-column-gap: 34px;
  grid-row-gap: $lg-spacer;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: $mobile-bp) {
    display: flex;
    flex-direction: column;
  }
  > * {
    width: 100%;
  }
}
</style>