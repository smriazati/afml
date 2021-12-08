<template>
  <div>
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
</template>

<script>
export default {
  props: {
    desktopMenu: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>