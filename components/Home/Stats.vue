<template>
  <div class="home-stats">
    <div class="wrapper">
      <div class="fact-list">
        <div class="fact-list-item">
          <h3>$41.43</h3>
          <p>how much a Single-A Player makes a game</p>
        </div>
        <div class="fact-list-item">
          <h3>$12,000</h3>
          <p>the median salary for a MiLB player</p>
        </div>
        <div class="fact-list-item">
          <h3>$12,800</h3>
          <p>Federal Poverty Level for an Individual in the U.S.</p>
        </div>
        <div class="fact-list-item">
          <h3>$10.7 Billion</h3>
          <p>is what the MLB’s Franchise made in 2019</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.drawCurve();
    });
  },
  methods: {
    drawCurve() {
      const ref = this.$refs.circleTrail;
      if (!ref) {
        return;
      }
      console.log(ref.offsetTop, ref.offsetLeft);
    },
  },
};
</script>


<style lang="scss">
.home-stats {
  .wrapper {
    @include containerWidth;
    @include mediumContainerPadding;
  }
  .fact-list {
    @include flexRow;
    margin-bottom: 31px;
  }
  .fact-list-item {
    flex: 0 0 25%;
    padding-top: 90px;
    padding-bottom: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-bottom: 2px solid $mild-gray;
    border-top: 2px solid $mild-gray;
    &:first-child {
      border-left: 2px solid $mild-gray;
    }
    &:last-child {
      border-right: 2px solid $mild-gray;
    }
    &:not(:last-child) {
      border-right: 2px solid $mild-gray;
    }
  }
  h3 {
    @include fontRobotoCondensed;
    font-size: 78px;
    line-height: 70px;
    line-height: 104px;
    letter-spacing: 0em;
  }
  p {
    color: $dark-gray;
    //styleName: Paragraph;
    @include fontEBGaramond;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    max-width: 25ch;
    margin: 0 auto;
  }
}
</style>