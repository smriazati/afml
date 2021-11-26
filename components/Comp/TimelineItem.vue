<template>
  <div class="timeline-item">
    <div class="timeline-icon link-hover" @click="toggleAccordion()">
      <div class="marker" :class="isExpanded ? 'active' : ''"></div>
      <div class="border"></div>
    </div>
    <div
      class="timeline-item-content"
      :class="isExpanded ? 'expanded' : 'collapsed'"
    >
      <div
        v-if="!isExpanded"
        class="accordion-open link-hover"
        @click="openAccordion()"
      >
        <h4 v-if="year" class="year">{{ year }}</h4>
        <h3 class="title" v-if="item.title">{{ item.title }}</h3>
      </div>
      <div v-else class="accordion-collapse-area">
        <h4 v-if="year" class="year">{{ year }}</h4>
        <h3 class="title" v-if="item.title">{{ item.title }}</h3>
        <div v-if="item.desc" class="description">
          <SanityContent :blocks="item.desc" />
        </div>
      </div>
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
    year() {
      if (!this.item.date) {
        return null;
      }

      let date = new Date(this.item.date);
      let year = date.getFullYear();
      return year;
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
    toggleAccordion() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss">
.timeline-item {
  display: flex;
}
.timeline-icon {
  position: relative;
  > .marker {
    position: relative;
    z-index: 9;
    width: 32px;
    height: 32px;
    transform: rotate(45deg);
    border: 2px solid $indigo;
    background: $light-gray;
    &.active {
      background: $dark-cinnamon;
    }
  }
  > .border {
    position: absolute;
    border-left: 2px solid $indigo;
    height: 100%;
    top: 0;
    left: 16px;
  }
}
.timeline-item-content {
  margin-bottom: $lg-spacer;
  margin-left: 76px;
  padding: $sm-spacer;
  &.expanded {
    border: 1px solid $mild-gray;
  }
  @media (max-width: 1142px) {
    max-width: 80%;
    margin-right: auto;
  }

  .title {
    font-size: 32px;
    line-height: 38px;
    margin-bottom: $sm-spacer;
  }
  .year {
    margin-bottom: $sm-spacer;
    @include fontMontserrat;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
  }
}
</style>
