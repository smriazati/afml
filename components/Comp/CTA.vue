<template>
  <div class="cta-wrapper">
    <div class="">
      <SystemBtnPrimary dest="/donate" msg="Donate" />
    </div>
    <div class="">
      <SystemBtnPrimary dest="/contact-us" msg="Contact Us" />
    </div>
  </div>
</template>

<style lang="scss">
.cta-wrapper {
  @include flexRow;
  @include containerWidth();
  > * {
    flex: 1;
    button {
      a {
        white-space: nowrap;
      }
    }
    &:first-child {
      padding-right: 40px;
      @media (max-width: $mobile-bp) {
        padding-right: 0;
        margin-bottom: 36px;
      }
    }
  }
}
</style>