<template>
  <div class="contact page">
    <section class="contact-form">
      <h1 class="headline section-title">Contact Us</h1>
      <div v-if="items" class="text intro">
        <div v-if="items.contactText">
          <div v-if="items.contactText.intro">
            <p>{{ items.contactText.intro }}</p>
          </div>
        </div>
      </div>
      <CompContactForm
        successRoute="/contact/success"
        :name="true"
        :email="true"
        :message="true"
      />
      <div v-if="items" class="text security-msg">
        <div v-if="items.contactText">
          <div v-if="items.contactText.securityMsg">
            <p class="caption uppercase">Confidentiality statment</p>
            <p class="caption">{{ items.contactText.securityMsg }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="contact-cta">
      <CompCTASocial />
    </section>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const query = groq`*[_type == "siteContent"]{
      "contactText": {
        "intro": contact_intro,
      "securityMsg": contact_secure
  }}`;
    const items = await $sanity.fetch(query).then((res) => res[0]);
    const metaQuery = groq`*[_type == "metadata" && page == 'contact'][0]{
    "pageDesc": pageMetadata.pageDesc,
    "ogImage": pageMetadata.ogImage.asset->url}`;
    const metadata = await $sanity
      .fetch(metaQuery)
      .then((res) => res.pageMetadata);
    return { items, metadata };
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
  data() {
    return {
      title: "Contact Us",
    };
  },
};
</script>


<style lang="scss">
.contact.page {
  section {
    &.contact-form {
      background: $indigo;
      color: $white;
      padding-top: 84px;
      padding-bottom: 76px;
      .section-title {
        margin-bottom: 41px;
      }
      .intro {
        @media (min-width: 1142px) {
          max-width: 50%;
          margin: 0 auto;
        }
        text-align: center;
      }
      .contact-form {
        max-width: 1142px;
        margin: 0 auto;
        margin-top: 42px;
        .form-group {
          border: 2px solid $indigo;
          &:not(:last-child) {
            border-bottom: none;
          }
        }

        input,
        textarea,
        button {
          width: 100%;
          padding: 40px 20px;
          &::placeholder {
            color: $indigo;
          }
        }

        textarea {
          flex: 0 0 300px;
        }
        button {
          @include input;
          color: $indigo;
          &:disabled {
            background: $mild-gray;
          }
        }
      }
      .security-msg {
        max-width: 1142px;
        margin: 0 auto;
        margin-top: 34px;
      }
    }
  }
}
</style>