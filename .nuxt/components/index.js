export { default as SanityContent } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-content.js'
export { default as SanityFile } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-file.js'
export { default as SanityImage } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-image.js'
export { default as CompBillOfRights } from '../../components/Comp/BillOfRights.vue'
export { default as CompCTA } from '../../components/Comp/CTA.vue'
export { default as CompCTASocial } from '../../components/Comp/CTASocial.vue'
export { default as CompContactForm } from '../../components/Comp/ContactForm.vue'
export { default as CompFAQs } from '../../components/Comp/FAQs.vue'
export { default as CompFAQsAccordionItem } from '../../components/Comp/FAQsAccordionItem.vue'
export { default as CompOurWins } from '../../components/Comp/OurWins.vue'
export { default as CompOurWinsAccordionItem } from '../../components/Comp/OurWinsAccordionItem.vue'
export { default as CompProblemCardItem } from '../../components/Comp/ProblemCardItem.vue'
export { default as CompProblemCards } from '../../components/Comp/ProblemCards.vue'
export { default as CompRoster } from '../../components/Comp/Roster.vue'
export { default as CompRosterItem } from '../../components/Comp/RosterItem.vue'
export { default as CompStripe } from '../../components/Comp/Stripe.vue'
export { default as CompTheLatest } from '../../components/Comp/TheLatest.vue'
export { default as CompTheLatestItem } from '../../components/Comp/TheLatestItem.vue'
export { default as CompTimeline } from '../../components/Comp/Timeline.vue'
export { default as CompTimelineItem } from '../../components/Comp/TimelineItem.vue'
export { default as HomeBanner } from '../../components/Home/Banner.vue'
export { default as HomeStats } from '../../components/Home/Stats.vue'
export { default as SiteDesktopNav } from '../../components/Site/DesktopNav.vue'
export { default as SiteFooter } from '../../components/Site/Footer.vue'
export { default as SiteHeader } from '../../components/Site/Header.vue'
export { default as SiteMobileNav } from '../../components/Site/MobileNav.vue'
export { default as SiteNewsletter } from '../../components/Site/Newsletter.vue'
export { default as SystemBtnArrow } from '../../components/System/BtnArrow.vue'
export { default as SystemBtnCircle } from '../../components/System/BtnCircle.vue'
export { default as SystemBtnPrimary } from '../../components/System/BtnPrimary.vue'
export { default as SystemLogo } from '../../components/System/Logo.vue'
export { default as SystemLogoCircle } from '../../components/System/LogoCircle.vue'
export { default as SystemLogoSecondary } from '../../components/System/LogoSecondary.vue'
export { default as SystemSocialMenu } from '../../components/System/SocialMenu.vue'
export { default as SystemTweet } from '../../components/System/Tweet.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
