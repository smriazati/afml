<template>
  <div ref="mobileNav">
    <ul class="main-nav">
      <li><nuxt-link to="/theproblem">The Problem</nuxt-link></li>
      <li><nuxt-link to="/thelatest">The Latest</nuxt-link></li>
      <li><nuxt-link to="/about">Who We Are</nuxt-link></li>
      <li class="skip">
        <span>Get Involved</span>
        <ul class="secondary-nav">
          <li>
            <a
              href="https://www.bonfire.com/store/advocates-for-minor-leaguers/"
              target="_blank"
              >Shop</a
            >
          </li>
          <li><nuxt-link to="/donate">Give</nuxt-link></li>
          <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
        </ul>
      </li>
    </ul>
    <div class="social-menu">
      <SystemSocialMenu />
    </div>
  </div>
</template>
<script>
export default {
  // add event listeneres to emit close on-list-click
  mounted() {
    this.addListenersToLinks();
  },
  methods: {
    addListenersToLinks() {
      const parent = this.$refs.mobileNav;
      if (!parent) {
        return;
      }
      const links = Array.from(parent.querySelectorAll("li:not(.skip)"));
      if (!links) {
        return;
      }
      // console.log(links);
      links.forEach((link) => {
        link.addEventListener("click", this.emitCloseLink);
      });
    },
    emitCloseLink() {
      this.$emit("on-list-click");
    },
  },
};
</script>

