<template>
  <div class="header-wrapper">
    <client-only>
      <header
        :class="mobileMenu.isExpanded ? 'expanded' : ''"
        class="site-header"
      >
        <div class="logo">
          <div v-if="!isMobile">
            <nuxt-link to="/"> <SystemLogo /> </nuxt-link>
          </div>
          <div v-else>
            <nuxt-link to="/"> <SystemLogoSecondary /></nuxt-link>
          </div>
        </div>
        <div v-if="!isMobile" class="cta">
          <div v-if="items">
            <button
              v-if="items.headerCta.link && items.headerCta.text"
              class="reset"
            >
              <a v-if="!items.headerCta.newtab" :href="items.headerCta.link">{{
                items.headerCta.text
              }}</a>
              <a v-else :href="items.headerCta.link" target="_blank">{{
                items.headerCta.text
              }}</a>
            </button>
          </div>
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
            <SiteMobileNav
              class="main-nav-wrapper"
              v-if="mobileMenu.isExpanded"
              @on-list-click="toggleMobileMenu"
            />
          </div>

          <SiteDesktopNav :desktopMenu="desktopMenu" v-else />
        </nav>

        <nav v-if="!mobileMenu.isExpanded" class="donate">
          <ul>
            <li class="featured"><nuxt-link to="/donate">Donate</nuxt-link></li>
          </ul>
        </nav>
      </header>
    </client-only>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "siteSettings"][0]{
  headerCta
}`;

export default {
  async fetch() {
    this.items = await this.$sanity.fetch(query);
  },
  data() {
    return {
      items: null,
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
    if (this.isMobile) {
      this.addListenersToMobileNav();
    }
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
    addListenersToMobileNav() {
      const mobileNav = this.$refs.mobileMenu;
      if (!mobileNav) {
        return;
      }
      console.log("mobile nav", mobileNav);
    },

    toggleMobileMenu() {
      this.mobileMenu.isExpanded = !this.mobileMenu.isExpanded;
    },
  },
};
</script>

<style lang="scss">
.default-layout.index {
  .header-wrapper {
    background: $light-gray;
  }
}

header.site-header {
  // base
  position: relative;
  z-index: 11;
  @media (max-width: 1440px) and (min-width: $nav-bp) {
    padding: 0 32px;
  }
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
      button {
        background: transparent;
      }
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
        background: transparent;
        position: absolute;
        width: 100%;
        left: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 8px;
        // padding-top: 5px;
        color: $indigo;
        span.icon {
          padding: 0;
        }
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
      button {
        color: $indigo;
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
          @media (max-width: $collapse-bp) {
            padding: 0;
          }
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            @media (max-width: $collapse-bp) {
              font-size: 13px;
              color: $indigo;
            }
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
              @media (max-width: $nav-bp) {
                font-size: 35px;
              }
            }
          }
        }
      }
    }
  }
}
</style>