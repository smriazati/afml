<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="logo">
        <nuxt-link to="/">
          <SystemLogoCircle />
        </nuxt-link>
      </div>
      <div class="main-nav">
        <nav>
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/theproblem">The Problem</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/thelatest">The Latest</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">Who We Are</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="secondary-nav">
        <nav>
          <ul>
            <li>
              <nuxt-link to="/faqs">FAQs</nuxt-link>
            </li>
            <li>
              <a
                href="https://www.bonfire.com/store/advocates-for-minor-leaguers/"
                target="_blank"
                >Shop</a
              >
            </li>

            <li>
              <nuxt-link to="/donate">Donate</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/contact">Contact Us</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="social-menu">
        <SystemSocialMenu />
      </div>
      <div class="legal">
        <p class="caption">
          &copy; 2021 Advocates for Minor Leaguers. All rights reserved.
          Advocates for Minor Leaguers is a 501 (c)(3) non-profit recognized by
          the IRS (tax ID Number: x).
          <nuxt-link to="/page/privacy">Privacy Policy.</nuxt-link>
          <a href="https://www.otherlove.co" target="_blank"
            >Made with Otherlove.</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      mobileMenu: {
        isMobile: false,
      },
    };
  },
};
</script>

<style lang="scss">
footer.site-footer {
  color: $white;
  position: relative;
  margin-top: 102px;
  @media (max-width: $collapse-bp) {
    margin-top: 60px;
  }
  &::before {
    content: "";
    background: $indigo;

    padding-top: 102px;
    @media (max-width: $collapse-bp) {
      padding-top: 60px;
    }
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    clip-path: polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%);
  }
  .footer-container {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);

    // base
    a {
      color: inherit;
      text-decoration: none;
    }
    nav ul {
      list-style: none;
      flex-direction: column;
    }
    .logo {
      max-width: 204px;
      max-height: 204px;
      margin: 0 auto;
      figure {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          min-height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .social-menu nav ul {
      flex-direction: row;
      li:not(:last-child) {
        padding-right: 20px;
      }
      i {
        border-radius: 50%;
        background: $white;
        color: $indigo;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .legal {
      padding-bottom: 10px;
    }
    nav ul li {
      @include fontMontserrat;
      font-size: 18px;
      font-weight: 500;
      line-height: 33px;
      letter-spacing: 0em;
    }
    // desktop
    @media (min-width: $mobile-bp) {
      grid-template-rows: 1fr min-content;
      grid-row-gap: 60px;
      .logo {
        grid-column: 5 / span 2;
        grid-row: 1 / 2;
      }

      .main-nav {
        grid-column: 1 / span 2;
        grid-row: 1 / 2;
        align-self: end;
      }

      .secondary-nav {
        grid-column: 3 / span 2;
        grid-row: 1 / 2;
        align-self: end;
      }

      .social-menu {
        grid-column: span 2 / 11;
        grid-row: 1 / 2;
        place-self: end;
        i {
          padding: 10px;
          font-size: 30px;
        }
      }
      .legal {
        grid-column: span 10;
        grid-row: 2 / 3;
      }
    }

    // mobile
    @media (max-width: $mobile-bp) {
      grid-template-rows: 1fr min-content min-content;
      grid-row-gap: 5px;
      max-width: 90%;
      margin: 0 auto;
      .logo {
        grid-column: 4 / span 4;
        grid-row: 1 / 2;
        padding: 15px;
        place-self: center;
      }
      .main-nav,
      .secondary-nav {
        li {
          font-size: 12px;
          line-height: 14px;
          margin-bottom: 6px;
        }
      }

      .main-nav {
        grid-column: 1 / span 2;
        grid-row: 1 / 2;
      }

      .secondary-nav {
        grid-column: span 2 / 11;
        grid-row: 1 / 2;
        text-align: right;
      }

      .social-menu {
        grid-column: span 10;
        grid-row: 2 / 3;
        place-self: center;
        i {
          padding: 5px;
          font-size: 20px;
        }
      }
      .legal {
        padding-top: 10px;
        grid-column: span 10;
        grid-row: 3 / 4;
        text-align: center;
      }
    }
  }
}
</style>