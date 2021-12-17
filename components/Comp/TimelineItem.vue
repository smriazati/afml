<template>
  <div class="timeline-item">
    <div
      class="timeline-icon link-hover"
      ref="toggleBtn"
      @click="toggleAccordion()"
    >
      <div class="marker" :class="!isCollapsed ? 'active' : ''"></div>
      <div class="border"></div>
    </div>
    <div
      class="timeline-item-content"
      :class="isCollapsed ? 'collapsed' : 'expanded'"
    >
      <div
        v-if="isCollapsed"
        class="accordion-open link-hover"
        @click="toggleAccordion()"
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
    index: {
      type: Number,
      required: true,
    },
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    year() {
      if (!this.item.date) {
        return null;
      }

      let date = new Date(this.item.date);
      let year = date.getUTCFullYear();
      return year;
    },
  },
  data() {
    return {
      collapseState: true,
    };
  },
  methods: {
    toggleAccordion() {
      this.collapseState = !this.collapseState;
      const payload = {
        collapseState: this.collapseState,
        index: this.index,
      };
      this.$emit("toggle-collapse", payload);
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
    max-width: 100%;
    margin-right: auto;
  }
  @media (max-width: $collapse-bp) {
    margin-left: 0;
    margin-bottom: $md-spacer;
  }

  .title {
    font-size: 32px;
    line-height: 38px;
    margin-bottom: $sm-spacer;
    @media (max-width: $collapse-bp) {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: $xs-spacer;
    }
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
