
<template>
  <div>
    <CompTheLatest />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    };
  },
  data() {
    return {
      title: "The Latest",
    };
  },
};
</script>
