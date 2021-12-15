<template>
  <div
    class="accordion-item"
    ref="accordionItem"
    :class="isExpanded ? 'accordion-item-expanded' : ''"
  >
    <div
      v-if="!isExpanded"
      class="accordion-open link-hover"
      @click="openAccordion()"
    >
      <h4 class="title">{{ item.headline }}</h4>
    </div>
    <div v-else class="accordion-collapse-area">
      <h4 class="title link-hover" @click="closeAccordion()">
        {{ item.headline }}
      </h4>
      <p v-if="item.article.byline" class="byline">{{ item.article.byline }}</p>
      <p class="date">
        <span class="rotate">{{ convDate }}</span>
      </p>
      <p v-if="item.article.excerpt" class="p excerpt">{{ item.excerpt }}</p>
      <button class="link">
        <a :href="item.article.link" target="_blank"
          ><span class="visually-hidden">Go to article</span>
          <a-icon type="arrow-right"></a-icon
        ></a>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    convDate() {
      if (!this.item.date) {
        return null;
      }

      let date = new Date(this.item.date);
      let month = date.toLocaleString("default", { month: "long" });
      let day = date.getDay() + 1;
      let year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    },
  },
  methods: {
    openAccordion() {
      this.isExpanded = true;
      // set height
    },

    closeAccordion() {
      this.isExpanded = false;
    },
  },
};
</script>

