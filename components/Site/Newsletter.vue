<template>
  <div class="newsletter-wrapper">
    <div :class="col ? 'col' : 'row'" class="newsletter">
      <div class="message">
        <p>Keep up with the lastest news.</p>
        <p>Sign up for our newsletter!</p>
      </div>
      <div class="flex-row">
        <label for="email" class="visually-hidden">Your email</label>
        <input type="text" name="email" placeholder="Enter email here!" />
        <button><a-icon type="arrow-right" /></button>
      </div>
    </div>
    <div :class="col ? 'center-text' : ''" class="disclaimer">
      <p class="caption">
        By providing your email address you consent to receive periodic updates
        from Advocates for Minor Leaguers.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    col: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.newsletter-wrapper {
  @media (max-width: $mobile-bp) {
    padding: 0 18px;
  }
  .newsletter {
    background: $dark-cinnamon;
    color: $light-sand;
    display: flex;
    padding: 35px 17px;
    .form-group {
      display: flex;
    }
    p {
      @include fontMontserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 0em;
      margin-top: 0 !important;
      @media (max-width: $collapse-bp) {
        font-size: 18px;
        line-height: 26px;
      }
    }
  }

  .message {
    p:first-child {
      @media (min-width: $mobile-bp) {
        margin-right: 1ch;
      }
    }
  }

  .newsletter.row {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    @media (max-width: $mobile-bp) {
      flex-direction: column;
    }
    .message {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      @media (max-width: $mobile-bp) {
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-bottom: 40px;
      }
      p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        @media (max-width: $mobile-bp) {
          justify-content: center;
        }
      }
    }
    .form-group {
      flex-direction: row;
      align-items: stretch;
    }
  }

  .newsletter.col {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    .form-group {
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }
  .disclaimer {
    margin-top: 10px;
    @media (max-width: $mobile-bp) {
      text-align: center;
    }
  }
}
</style>