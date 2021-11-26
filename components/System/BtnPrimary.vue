<template>
  <button :class="small ? 'btn-primary-small' : ''" class="btn-primary">
    <a v-if="external" :href="dest" target="_blank">{{ msg }}</a>
    <nuxt-link v-else :to="dest">{{ msg }}</nuxt-link>
  </button>
</template>

<script>
export default {
  props: {
    dest: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      required: false,
    },
    external: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.btn-primary {
  @include resetBtn;
  @include btnTransition;
  @include fontMontserrat;
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0em;
  text-align: center;
  background: $white;
  border: 2px solid $indigo;
  color: $indigo;
  &:hover {
    border: 2px solid $dark-cinnamon;
    background: $dark-cinnamon;
    color: $white;
  }

  &:not(.btn-primary-small) {
    padding: 50px 0;
    width: 100%;
    font-size: 36px;
    line-height: 44px;
  }
  .btn-primary-small {
    padding: 43px 51px;
    font-size: 18px;
    line-height: 22px;
  }

  &.disabled {
    background: $mild-gray;
    color: $dark-gray;
    &:hover {
      background: $mild-gray;
      color: $dark-gray;
    }
  }
  @media (max-width: $mobile-bp) {
    &:not(.btn-primary-small) {
      padding: 27px 0;
      width: 100%;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
