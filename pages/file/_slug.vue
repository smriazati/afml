<template>
    <div>
        <div v-if="item" class="flex-col center file-container">
            <p class="h3">If the file does not open in your browser automatically, <a
                    :href="`${item.file.url}?dl=${item.slug.current}.${item.file.extension}`">click here to start the
                    download</a>.</p>
            <a :href="`${item.file.url}?dl=${item.slug.current}.${item.file.extension}`" class="btn btn-orange">
                <span>Download file</span>
            </a>
            <a :href="`${item.file.url}`" class="btn btn-orange">
                <span>Open file in browser</span>
            </a>
        </div>
    </div>
</template>



<script>

import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ params, error, $sanity }) {
        const query = groq`
        *[_type == "mediaGallery" && slug.current=='${params.slug}']{
            _id,
            "file": file.asset->,
            slug,
            title
        }[0]
    `;
        const item = await $sanity.fetch(query).then((res) => res);

        if (item) {
            const link = `${item.file.url}`;
            if (process.browser) {
                window.open(link, '_blank')
            }
            return {
                item: item
            }
        } else {
            error({ statusCode: 404 })
        }

    },
    head() {
        return {
            title: this.$route.params.slug
        };
    },
    layout: 'file'
};
</script>

<style lang="scss">
.file-container {
    max-width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-center;

    p a {
        color: inherit;
    }

    >*:not(:last-child) {
        margin-bottom: 32px;
    }
}
</style>