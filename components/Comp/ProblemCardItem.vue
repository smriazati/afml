<template>
  <div
    class="link-hover problem-card-item card-item"
    :class="facingFront ? 'facing-front' : 'facing-back'"
  >
    <div class="card-content" @click="flipCard()">
      <div class="card-front">
        <h2>{{ item.title }}</h2>
      </div>
      <div class="card-back">
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <button class="link-hover flat" @click="flipCard()">
      <a-icon type="sync"></a-icon>
      <span class="caption">Flip Card</span>
    </button>
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
      facingFront: true,
    };
  },
  methods: {
    flipCard() {
      this.facingFront = !this.facingFront;
    },
  },
};
</script>


<style lang="scss">
.problem-card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: $collapse-bp) {
    margin-bottom: $xs-spacer;
  }
  &.facing-back {
    .card-content {
      transform: rotateY(180deg);
    }
  }
  &.facing-front {
    .card-back {
      @media (max-width: $mobile-bp) {
        height: 0;
      }
    }
  }
  .card-content {
    flex: 2;
    box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: 1fr;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100%;
    > * {
      backface-visibility: hidden;
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
      border: 2px solid $indigo;
      height: 100%;
      position: relative;
      background: $light-gray;
    }
  }

  .card-front {
    padding: 40px;
    @media (max-width: $collapse-bp) {
      padding: 15px;
      h2 {
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
  .card-back {
    transform: rotateY(180deg);
    @media (min-width: $mobile-bp) {
      height: 465px;
      overflow-y: scroll;
    }
    h2 {
      background: $indigo;
      color: $white;
      padding: 40px;
      @media (max-width: $collapse-bp) {
        padding: 15px;
      }
      font-size: 32px;
      line-height: 37px;
      @media (max-width: $collapse-bp) {
        font-size: 24px;
        line-height: 30px;
      }
    }
    p {
      padding: 40px;
      @media (max-width: $collapse-bp) {
        padding: 15px;
      }
      padding-top: 26px;
      @include fontMontserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: 0em;
    }
  }
  button {
    margin-top: 12px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: $indigo;
    span,
    a {
      border-bottom: none;
      padding: 0;
      color: $indigo;
    }
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1ch;
      transition: 0.3s ease all;
    }
    &:hover {
      color: $dark-cinnamon;
      span,
      a {
        color: inherit;
        text-decoration: none;
        border-bottom: none;
      }
    }
  }
}
</style>