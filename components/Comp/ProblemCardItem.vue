<template>
  <div
    class="problem-card-item card-item"
    :class="facingFront ? 'facing-front' : 'facing-back'"
  >
    <div class="card-content">
      <div class="card-front">
        <h2>{{ item.title }}</h2>
      </div>
      <div class="card-back">
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <button class="link-hover" @click="flipCard()">
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
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
  }
  .card-back {
    transform: rotateY(180deg);
    h2 {
      background: $indigo;
      color: $white;
      padding: 40px;
      font-size: 32px;
      line-height: 37px;
    }
    p {
      padding: 40px;
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
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1ch;
    }
  }
}
</style>