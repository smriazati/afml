<template>
  <div class="container-404">
    <div class="basic page">
      <div class="text-wrapper">
        <h1 class="headline section-title" v-if="error.statusCode === 404">
          This page doesn't exist
        </h1>
        <h1 class="headline section-title" v-else>An error occurred</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "home",
  name: "Error",
  mounted() {
    console.log("ERROR", this.error);
  },
};
</script>
