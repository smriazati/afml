<template>
  <div class="faqs">
    <h3 class="h1 section-title">FAQS</h3>
    <div class="accordion-wrapper">
      <CompFAQsAccordionItem
        v-for="item in items"
        :key="item._id"
        :item="item"
      />
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "faq"] | order(order asc){
  question, answer, _id
}`;

export default {
  async fetch() {
    this.items = await this.$sanity.fetch(query);
  },
  data: () => ({ items: "" }),
};
</script>

<style lang="scss">
.default-layout .faqs {
  margin-top: 33px;
  margin-bottom: 33px;
  background: $light-gray;
  padding: $xl-spacer 0;

  .accordion-item:last-child {
    .accordion-collapse-area {
      border-bottom: 2px solid $mild-gray !important;
    }
  }
  .accordion-collapse-area {
    padding: 30px;
    border: 2px solid $mild-gray;
    border-bottom: 0;

    .title {
      margin-bottom: 24px;
      color: $dark-cinnamon;
    }
    h4 i {
      color: $dark-cinnamon;
    }
  }
  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>


