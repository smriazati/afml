<template>
  <div class="home-stats">
    <div class="wrapper">
      <div class="fact-list">
        <div class="fact-list-item">
          <h3>${{ firstStat }}</h3>
          <p>how much a Single-A Player makes a game</p>
        </div>
        <div class="fact-list-item">
          <h3>${{ secondStat }}</h3>
          <p>the median salary for a MiLB player</p>
        </div>
        <div class="fact-list-item">
          <h3>${{ thirdStat }}</h3>
          <p>Federal Poverty Level for an Individual in the U.S.</p>
        </div>
        <div class="fact-list-item">
          <h3>
            <span class="force-line-break">${{ fourthStat }}</span
            >Billion
          </h3>
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
  data() {
    return {
      endStats: [41.43, 12000, 12800, 10.7],
      firstStat: 0,
      secondStat: 0,
      thirdStat: 0,
      fourthStat: 0,
      t1: setInterval(() => {
        this.startCounter1();
      }, 30),
      t2: setInterval(() => {
        this.startCounter2();
      }, 3),
      t3: setInterval(() => {
        this.startCounter3();
      }, 3),
      t4: setInterval(() => {
        this.startCounter4();
      }, 30),
    };
  },
  mounted() {
    this.startAllCounters();
  },
  methods: {
    startAllCounters() {
      this.startCounter1();
      this.startCounter2();
      this.startCounter3();
      this.startCounter4();
    },
    startCounter1() {
      if (this.firstStat > this.endStats[0]) {
        clearInterval(this.t1);
        this.firstStat = this.endStats[0];
      } else {
        this.firstStat = parseFloat((this.firstStat + 0.21).toFixed(2));
      }
    },
    startCounter2() {
      if (this.secondStat > this.endStats[1]) {
        clearInterval(this.t2);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        this.secondStat = dollarUSLocale.format(this.endStats[1]);
      } else {
        this.secondStat = parseInt(this.secondStat + 10);
      }
    },
    startCounter3() {
      if (this.thirdStat > this.endStats[2]) {
        clearInterval(this.t3);
        let dollarUSLocale = Intl.NumberFormat("en-US");
        this.thirdStat = dollarUSLocale.format(this.endStats[2]);
      } else {
        this.thirdStat = parseInt(this.thirdStat + 10);
      }
    },
    startCounter4() {
      if (this.fourthStat > this.endStats[3]) {
        clearInterval(this.t4);
        this.fourthStat = this.endStats[3];
      } else {
        this.fourthStat = parseFloat((this.fourthStat + 0.1).toFixed(1));
      }
    },
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
    margin-top: 36px;
    margin-bottom: 36px;
  }
  .fact-list-item {
    flex: 0 0 25%;
    padding-top: 90px;
    padding-bottom: 90px;
    @media (max-width: $collapse-bp) {
      padding-top: 45px;
      padding-bottom: 45px;
    }
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
    @media (max-width: $collapse-bp) {
      &:not(:first-child) {
        border-top: 0;
      }
      &:first-child {
        margin-top: $sm-spacer;
      }
      border-left: 2px solid $mild-gray;
    }
  }
  h3 {
    @include fontRobotoCondensed;
    font-size: 78px;
    line-height: 70px;
    letter-spacing: 0em;
    @media (max-width: $collapse-bp) {
      font-size: 60px;
      line-height: 55px;
    }
    .force-line-break {
      display: block;
      width: 100%;
    }
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