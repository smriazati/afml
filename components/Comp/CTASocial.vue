<template>
  <div class="cta-social">
    <h2 class="headine section-title">Spread the word</h2>
    <div v-if="socials" class="socials-wrapper">
      <div v-if="socials.socials" class="row">
        <SystemBtnPrimary
          v-if="socials.socials.twitter"
          msg="Twitter"
          :dest="socials.socials.twitter"
          :external="true"
        />
        <SystemBtnPrimary
          v-if="socials.socials.instagram"
          msg="Instagram"
          :dest="socials.socials.instagram"
          :external="true"
        />
        <SystemBtnPrimary
          v-if="socials.socials.facebook"
          msg="Facebook"
          :dest="socials.socials.facebook"
          :external="true"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
    const query = groq`*[_type == "siteSettings"][0]{
  socials
}`;
    this.socials = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({ socials: "" }),
};
</script>

<style lang="scss">
.cta-social {
  @include containerWidth;
  padding: $xxl-spacer 0;
  @media (max-width: $mobile-bp) {
    padding: $xl-spacer 0;
  }
  .section-title {
    @media (min-width: $mobile-bp) {
      margin-bottom: $xl-spacer;
    }
    @media (max-width: $mobile-bp) {
      margin-bottom: $lg-spacer;
    }
    font-size: 72px;
    line-height: 76px;
  }
  .row {
    padding-left: 18px;
    padding-right: 18px;
    > *:not(:last-child) {
      @media (min-width: $mobile-bp) {
        margin-right: 40px;
      }
      @media (max-width: $mobile-bp) {
        margin-bottom: $xs-spacer;
      }
    }
  }
}
</style>


