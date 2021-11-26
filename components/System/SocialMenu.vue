<template>
  <nav v-if="socials">
    <ul v-if="socials.socials">
      <li v-if="socials.socials.twitter">
        <a :href="socials.socials.twitter" target="_blank"
          ><span class="visually-hidden">Twitter</span
          ><a-icon type="twitter"></a-icon
        ></a>
      </li>
      <li v-if="socials.socials.instagram">
        <a :href="socials.socials.instagram" target="_blank"
          ><span class="visually-hidden">Instagram</span
          ><a-icon type="instagram"></a-icon
        ></a>
      </li>
      <li v-if="socials.socials.facebook">
        <a :href="socials.socials.facebook" target="_blank"
          ><span class="visually-hidden">Facebook</span
          ><a-icon type="facebook"></a-icon
        ></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "siteSettings"][0]{
  socials
}`;

export default {
  async fetch() {
    this.socials = await this.$sanity.fetch(query);
  },
  data: () => ({ socials: "" }),
};
</script>
