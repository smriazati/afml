
<template>
  <div>
    <CompFAQs />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    };
  },
  data() {
    return {
      title: "FAQs",
    };
  },
};
</script>
