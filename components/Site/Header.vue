<template>
  <div class="header-wrapper">
    <header
      :class="mobileMenu.isExpanded ? 'expanded' : ''"
      class="site-header"
    >
      <div class="logo">
        <div v-if="!isMobile">
          <nuxt-link to="/"> <SystemLogo /> </nuxt-link>
        </div>
        <div v-else>
          <SystemLogoSecondary />
        </div>
      </div>
      <div v-if="!isMobile" class="cta">
        <button class="reset">
          <nuxt-link to="/">Call to action</nuxt-link>
        </button>
      </div>
      <nav class="nav">
        <div v-if="isMobile">
          <div class="menu-control">
            <button v-if="!mobileMenu.isExpanded" @click="toggleMobileMenu">
              <span>Menu</span>
            </button>
            <button v-else @click="toggleMobileMenu">
              <span class="visually-hidden">Close menu</span
              ><a-icon type="close"></a-icon>
            </button>
          </div>

          <div class="main-nav-wrapper" v-if="mobileMenu.isExpanded">
            <ul class="main-nav">
              <li><nuxt-link to="/theproblem">The Problem</nuxt-link></li>
              <li><nuxt-link to="/thelatest">The Latest</nuxt-link></li>
              <li><nuxt-link to="/about">Who We Are</nuxt-link></li>
              <li><nuxt-link to="/getinvolved">Get Involved</nuxt-link></li>
            </ul>
            <ul class="secondary-nav">
              <li>
                <a
                  href="https://www.bonfire.com/store/advocates-for-minor-leaguers/"
                  target="_blank"
                  >Shop</a
                >
              </li>
              <li><nuxt-link to="/give">Give</nuxt-link></li>
              <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
            </ul>
            <div class="social-menu">
              <SystemSocialMenu />
            </div>
          </div>
        </div>
        <div class="main-nav-wrapper" v-else>
          <ul class="main-nav" ref="mainNav">
            <li><nuxt-link to="/theproblem">The Problem</nuxt-link></li>
            <li><nuxt-link to="/thelatest">The Latest</nuxt-link></li>
            <li><nuxt-link to="/about">Who We Are</nuxt-link></li>
            <li ref="dropdownParent">
              <span class="link-hover block z-top" @click="toggleDropdown"
                >Get Involved</span
              >
              <span ref="dropdown" class="dropdown">
                <button @click="toggleDropdown">
                  <span class="visually-hidden">Open dropdown</span
                  ><span><a-icon type="down"></a-icon></span>
                </button>
                <ul
                  v-show="desktopMenu.isDropdownExpanded"
                  :style="`top: ${desktopMenu.menuHeight}px`"
                >
                  <li :style="`flex: 0 0 ${desktopMenu.menuHeight}px`">
                    <a
                      href="https://www.bonfire.com/store/advocates-for-minor-leaguers/"
                      target="_blank"
                      >Shop</a
                    >
                  </li>
                  <li :style="`flex: 0 0 ${desktopMenu.menuHeight}px`">
                    <nuxt-link to="/donate">Give</nuxt-link>
                  </li>
                  <li :style="`flex: 0 0 ${desktopMenu.menuHeight}px`">
                    <nuxt-link to="/contact">Contact Us</nuxt-link>
                  </li>
                </ul>
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <nav v-if="!mobileMenu.isExpanded" class="donate">
        <ul>
          <li class="featured"><nuxt-link to="/donate">Donate</nuxt-link></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenu: {
        isExpanded: false,
      },
      desktopMenu: {
        isDropdownExpanded: false,
        menuHeight: null,
      },
      windowWidth: null,
      windowHeight: null,
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    });
    this.$nextTick(() => {
      this.addListenerToDesktopNav();
    });
  },
  computed: {
    isMobile() {
      if (!process.client) {
        return;
      }
      if (this.windowWidth < 1080) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    addListenerToDesktopNav() {
      const desktopNav = this.$refs.mainNav;

      if (desktopNav) {
      }
    },
    closeDropdown() {
      this.desktopMenu.isDropdownExpanded = false;
    },
    toggleDropdown() {
      this.desktopMenu.isDropdownExpanded =
        !this.desktopMenu.isDropdownExpanded;

      if (this.desktopMenu.isDropdownExpanded) {
        this.desktopMenu.menuHeight = this.$refs.dropdownParent.offsetHeight;
      }
    },
    toggleMobileMenu() {
      this.mobileMenu.isExpanded = !this.mobileMenu.isExpanded;
    },
  },
};
</script>

<style lang="scss">
$nav-bp: 1080px;

header.site-header {
  // base
  position: relative;
  z-index: 11;
  .z-top {
    z-index: 99;
  }
  ul {
    display: flex;
    list-style: none;
  }
  li,
  button {
    @include fontMontserrat;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    transition: 0.3s ease all;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .donate {
    a {
      background: $dark-cinnamon;
      color: $white;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease all;
      &:hover {
        background: $indigo;
      }
    }
  }
  // desktop
  @media (min-width: $nav-bp) {
    display: grid;
    max-width: 1440px;
    margin: 0 auto;
    margin-top: 33px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: min-content min-content;
    grid-template-areas:
      "logo cta cta cta cta cta"
      "logo nav nav nav nav donate";
    text-align: center;

    .nav {
      grid-area: nav;
      display: flex;
      border-bottom: 2px solid $indigo;
      > div {
        width: 100%;
        > ul {
          width: 100%;
          height: 100%;
        }
      }
      ul.main-nav > li {
        border-right: 2px solid $indigo;
        padding: 0 30px;
        > span {
          flex: 2;
        }
        > a {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          align-items: center;
        }
      }
    }
    .logo {
      grid-area: logo;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 5px;
    }
    .cta {
      grid-area: cta;
      border-top: 2px solid $indigo;
      border-bottom: 2px solid $indigo;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        @include fontRoboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-transform: uppercase;
      }
    }
    .donate {
      grid-area: donate;
      border-bottom: 2px solid $indigo;
      display: flex;
    }

    ul {
      flex: 1;

      li {
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        a {
          position: relative;
          flex: 1;
        }
      }
    }
    .dropdown {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      button {
        position: absolute;
        width: 100%;
        left: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        padding-top: 5px;
      }
      ul {
        position: absolute;
        // display: none;
        width: 100%;
        flex: 1;
        flex-direction: column;
        border-left: 2px solid $indigo;
        border-right: 2px solid $indigo;
        li {
          &:first-child {
            border-top: 2px solid $indigo;
          }
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: white;
          border-bottom: 2px solid $indigo;
        }
      }
    }
  }

  // mobile
  @media (max-width: $nav-bp) {
    // base

    .logo {
      background: $indigo;
      figure img {
        width: 60px;
        height: 60px;
        overflow: hidden;
      }
    }
    // collapsed
    &:not(.expanded) {
      display: flex;
      .logo {
        flex: 0 0 60px;
      }
      .nav,
      .donate {
        flex: 50%;
        border-right: 2px solid $indigo;
        border-bottom: 2px solid $indigo;
        border-top: 2px solid $indigo;
        display: flex;
        div,
        ul,
        li,
        a,
        button {
          display: flex;
          flex: 1;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      }
      .main-nav-wrapper,
      .cta,
      .social-menu,
      .main-nav,
      .secondary-nav {
        display: none;
        opacity: 0;
      }
    }
    &.expanded {
      width: 100vw;
      height: 100vh;
      background: white;
      position: fixed;
      overflow: hidden;
      margin-top: 0;

      .logo {
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .menu-control {
        position: absolute;
        top: 40px;
        right: 40px;
        button {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          border: 2px solid $indigo;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .main-nav-wrapper {
        position: absolute;
        top: 100px;
        width: 100%;
        height: 100%;
        ul {
          padding: 10px;

          flex-direction: column;
        }
        .main-nav {
          li {
            @include fontRobotoCondensed;
            font-size: 36px;
            font-weight: 700;
            line-height: 52px;
            letter-spacing: 0em;
          }
          border-bottom: 2px solid $indigo;
        }
        .secondary-nav {
          li {
            @include fontMontserrat;
            font-size: 18px;
            font-weight: 500;
            line-height: 33px;
            letter-spacing: 0em;
          }
        }
        .social-menu {
          ul {
            flex-direction: row;
            flex-wrap: wrap;
            li {
              padding-right: 27px;
              font-size: 54px;
            }
          }
        }
      }
    }
  }
}
</style>