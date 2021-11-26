<template>
  <button class="btn-circle">
    <a v-if="!icon" :href="dest">{{ msg }}</a>
    <a v-else :href="dest" target="_blank"><a-icon :type="msg"></a-icon></a>
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
    icon: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.btn-circle {
  @include resetBtn;
  @include btnTransition;
  border: 2px solid $indigo;
  border-radius: 50%;
  width: 98px;
  height: 98px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    transition: 0.3s ease all;
    @include fontMontserrat;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    overflow-wrap: break-word;
  }
  &:hover {
    border: 2px solid $dark-cinnamon;
    a {
      color: $dark-cinnamon;
    }
  }
}
</style>

