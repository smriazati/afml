<template>
  <div class="page donate">
    <section class="intro">
      <div class="wrapper">
        <h1 class="section-title">Donate</h1>
        <div class="grid">
          <div class="col">
            <div class="text">
              <p>
                Advocates for Minor Leaguers is a 501(c)(3) Nonprofit. Your
                donations help us grow our network of supporters as we continue
                pushing for better MiLB working conditions. As a member, you’ll
                be the first to know about any updates, events, and promotions
                of ours. All donations are tax deductible.
              </p>
              <p>We appreciate your support!</p>
            </div>
            <div class="image">
              <figure>
                <img src="/images/FairBall_Wristband.png" alt="Wristband" />
              </figure>
            </div>
          </div>
          <div class="stripe">
            <CompStripe />
          </div>
        </div>
      </div>
    </section>
    <section class="donate-cta">
      <CompCTASocial />
    </section>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

export default {
  data() {
    return {
      title: "Donate",
    };
  },
  async asyncData({ $sanity }) {
    const metaQuery = groq`*[_type == "metadata" && page == 'donate'][0]{
    "pageDesc": pageMetadata.pageDesc,
    "ogImage": pageMetadata.ogImage.asset->url}`;
    const metadata = await $sanity
      .fetch(metaQuery)
      .then((res) => res.pageMetadata);
    return { metadata };
  },
  head() {
    return {
      title: this.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata
            ? this.pageMetadata.pageDesc
              ? this.pageMetadata.pageDesc
              : ""
              ? ""
              : ""
            : ""
            ? ""
            : "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.pageMetadata
            ? this.pageMetadata.ogImage.url
              ? this.pageMetadata.ogImage.url
              : ""
              ? ""
              : ""
            : ""
            ? ""
            : "",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.donate.page {
  .intro {
    background: $indigo;
    color: $light-sand;
    padding: $xl-spacer 0;
    h1 {
      @include fontEBGaramond;
      font-size: 72px;
      font-weight: 400;
      line-height: 94px;
      letter-spacing: 0em;
      text-align: center;
      margin-bottom: $lg-spacer;
      @media (max-width: $mobile-bp) {
        margin-bottom: $md-spacer;
      }
    }

    .grid {
      @media (min-width: $mobile-bp) {
        .col {
          grid-column-start: 2;
          grid-column-end: span 4;
          .image {
            margin-top: $md-spacer;

            img {
              max-width: 320px;
            }
          }
        }
        .stripe {
          grid-column-start: 9;
          grid-column-end: span 3;
        }
      }
      @media (max-width: $mobile-bp) {
        .col,
        .stripe {
          padding: 0 18px;
          grid-column-start: 1;
          grid-column-end: 13;
        }
        .image {
          text-align: center;
        }
        .col {
          margin-bottom: $md-spacer;
        }
      }
    }
  }
}
</style>
