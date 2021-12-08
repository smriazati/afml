<template>
  <div class="home-banner">
    <div class="circle-illustration"></div>
    <div
      class="circle-trail"
      ref="circleTrail"
      :style="`width: ${refRight * 2}px; height: ${
        refRight * 2
      }px; top: ${circleTop}px; right: 0; padding-bottom: ${refRight}px`"
    ></div>
    <div class="wrapper" ref="wrapper">
      <h2>
        We believe Minor Leaguers deserve <strong>fair pay</strong> and
        <strong>equitable treatment</strong>.
      </h2>
      <div class="button-wrapper" ref="btnWrapper">
        <SystemBtnCircle msg="Learn more" dest="/theproblem" />
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
    window.addEventListener("resize", () => {
      this.drawCurve();
    });
  },
  data() {
    return {
      refRight: null,
      refTop: null,
      circleTop: null,
    };
  },
  methods: {
    drawCurve() {
      const circleTrail = this.$refs.circleTrail;
      const btn = this.$refs.btnWrapper;

      if (!circleTrail || !btn) {
        return;
      }

      const windowWidth = window.innerWidth;
      const refWidth = btn.offsetWidth;
      const refLeft = btn.offsetLeft;
      const refRight = windowWidth - refWidth - refLeft;
      const refTop = btn.offsetTop;
      const refHeight = btn.offsetHeight;
      this.refRight = refRight;
      this.refTop = refTop;
      this.circleTop = refTop + refHeight / 2;
    },
  },
};
</script>


<style lang="scss">
$lineAnimDuration: 3s;

@keyframes fadeInBtn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes animateInCircle {
  from {
    clip-path: polygon(100% 301px, 100% 0px, 100% 100%, 50% 100%);
  }
  to {
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
  }
}

@keyframes animateInGrayCircle {
  from {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}
.home-banner {
  overflow: hidden;
  background: $light-gray;
  .wrapper {
    @include containerWidth;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  position: relative;
  padding: 300px 0;
  padding: 25vh 0;
  @media (max-width: $collapse-bp) {
    padding: 60px 0;
  }

  .circle-trail {
    position: absolute;
    border: 3px dashed $dark-cinnamon;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 301px, 100% 0px, 100% 100%, 50% 100%);
    animation: animateInCircle $lineAnimDuration ease-in-out forwards;
    // clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
  }
  h2 {
    position: relative;
    @include fontMontserrat;
    font-size: 56px;
    font-weight: 500;
    line-height: 80px;
    letter-spacing: 0em;
    @media (min-width: $mobile-bp) {
      max-width: 58%;
    }
    @media (max-width: $mobile-bp) {
      font-size: 32px;
      line-height: 42px;
      text-align: center;
    }

    strong {
      @include fontRobotoCondensed;
      font-size: 64px;
      font-weight: 700;
      line-height: 80px;
      letter-spacing: 0em;
      text-transform: uppercase;
      @media (min-width: $mobile-bp) {
        max-width: 58%;
      }
      @media (max-width: $mobile-bp) {
        font-size: 36px;
        line-height: 48px;
      }
    }
  }

  .button-wrapper {
    @media (min-width: $collapse-bp) {
      padding-left: 32px;
    }
    @media (max-width: $collapse-bp) {
      margin-top: 45px;
      padding-left: 10%;
    }
    position: relative;

    opacity: 0;
    animation: fadeInBtn 0.5s $lineAnimDuration ease-in-out forwards;
    button {
      background: $light-gray;
    }
  }
  .circle-illustration {
    position: absolute;
    width: 669px;
    height: 669px;
    right: -334px;
    top: 0;

    border: 1px solid $md-gray;
    border-radius: 50%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
    animation: animateInGrayCircle $lineAnimDuration ease-in-out forwards;
    @media (max-width: $collapse-bp) {
      width: 602px;
      height: 602px;
      right: -451px;
    }
  }
}
</style>