<template>
  <div class="accordion-item roster-item" ref="accordionItem">
    <div
      v-if="!isExpanded"
      class="accordion-open link-hover"
      @click="openAccordion()"
    >
      <h3 class="title">
        <span class="text">
          <span class="name">{{ item.name }}</span>
          <span v-if="item.role" class="role"> {{ item.role }}</span>
        </span>
        <span class="icon"><a-icon type="down"></a-icon></span>
      </h3>
    </div>
    <div v-else class="accordion-collapse-area">
      <h3 class="title link-hover" @click="closeAccordion()">
        <span class="text">
          <span class="name">{{ item.name }}</span>
          <span v-if="item.role" class="role"> {{ item.role }}</span>
        </span>
        <span class="icon"><a-icon type="down"></a-icon></span>
      </h3>
      <div v-if="item.img" class="row">
        <figure v-if="item.img.asset">
          <SanityImage
            :asset-id="item.img.asset._ref"
            auto="format"
            :alt="item.img.alt"
          />
        </figure>
        <div class="bio" v-if="item.bio">
          <p class="small">{{ item.bio }}</p>
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

<style lang="scss">
.roster-item {
  h3.title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > * {
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        @media (max-width: $collapse-bp) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
    .text {
      .name {
        @include fontRobotoCondensed;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        letter-spacing: 0em;
      }
      .role {
        @media (min-width: $mobile-bp) {
          flex: 1;
        }
        text-align: left;
        @media (min-width: $collapse-bp) {
          margin-left: 10px;
          margin-left: 1ch;
        }
        @include fontMontserrat;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
      }
    }

    .icon {
      flex: 2;
      i {
        margin-left: auto;
      }
    }
  }

  .accordion-collapse-area {
    padding: 30px;
    background: $white;
    border: 2px solid $mild-gray;
    border-bottom: none;
    h3.title {
      color: $dark-cinnamon;
    }
    .icon {
      @media (max-width: $mobile-bp) {
        display: none;
      }
    }
    .row {
      padding: 55px 0;
      figure {
        @media (min-width: $mobile-bp) {
          flex: 0 0 40%;
        }
        text-align: center;
        @media (max-width: $mobile-bp) {
          margin-bottom: 30px;
        }
        img {
          height: 100%;
          width: 100%;
          max-width: 291px;
          object-fit: contain;
          object-position: center center;
        }
      }
      .bio {
        @media (min-width: $mobile-bp) {
          flex: 0 0 50%;
        }
        @media (max-width: $mobile-bp) {
          p {
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
  }
  &:last-child {
    .accordion-collapse-area {
      border-bottom: 2px solid $mild-gray;
    }
  }
}
</style>
