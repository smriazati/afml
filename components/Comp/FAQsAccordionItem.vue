<template>
  <div class="accordion-item" ref="accordionItem">
    <div
      v-if="!isExpanded"
      class="accordion-open link-hover"
      @click="openAccordion()"
    >
      <h4 class="title">
        {{ item.question }} <span><a-icon type="down"></a-icon></span>
      </h4>
    </div>
    <div v-else class="accordion-collapse-area">
      <h4 class="title link-hover" @click="closeAccordion()">
        {{ item.question }}
        <span><a-icon type="up"></a-icon></span>
      </h4>
      <p class="small">{{ item.answer }}</p>
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

