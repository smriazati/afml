<template>
  <div class="bill-of-rights-wrapper">
    <div class="bill-of-rights-content">
      <h2 class="headline">Bill of Rights</h2>
      <SanityContent :blocks="borItems.billofrights" />
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
const borQuery = groq`*[_type == "siteContent"][0]{billofrights}`;
export default {
  async fetch() {
    this.borItems = await this.$sanity.fetch(borQuery);
  },
  fetchOnServer: false,
  data: () => ({ borItems: "" }),
};
</script>

<style lang="scss">
.bill-of-rights-wrapper {
  background: $indigo;
  color: $white;
  max-width: 1142px;
  margin-left: auto;
  margin-right: auto;
  padding: $xl-spacer 0;

  @media (max-width: 1142px) {
    padding-left: 18px;
    padding-right: 18px;
  }
  .bill-of-rights-content {
    padding: 0 115px;
    > *:not(:last-child) {
      margin-bottom: $sm-spacer;
    }
    @media (max-width: $collapse-bp) {
      padding: 0 15px;
    }
    ul,
    ol {
      @include fontMontserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 0em;
      padding-left: 20px;
    }
  }
  .headline {
    @include fontRobotoCondensed;
    font-size: 72px;
    font-weight: 700;
    line-height: 76px;
    letter-spacing: 0em;
    text-align: left;
  }
}
</style>


