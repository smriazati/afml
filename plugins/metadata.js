import { groq } from "@nuxtjs/sanity";

export default ({ app, $sanity }, inject) => {

    inject('getPageMetadata', async (slug) => {
        const metaQuery = groq`*[_type == "metadata" && page == '${slug}'][0]{
            "description": pageMetadata.pageDesc,
            "socialImage": pageMetadata.ogImage.asset->url}`;
            const savedPagesMetadata = app.context.store.state.metadata?.savedPagesMetadata;
            let matchingPages;
            let metadata;
            let isNewPageMetadataFetched;

            if (savedPagesMetadata) {
              // check for about page
              matchingPages = savedPagesMetadata.filter(
                (metadata) => metadata.name === slug
              );
              if (matchingPages.length > 0) {
                // already has data, use it
                const match = matchingPages[0];
                metadata = {
                  slug: slug,
                  description: match?.description,
                  socialImage: match?.socialImage,
                };
              } else {
                // has no saved data, try api call for saved data
                const fetchedMetadata = await $sanity
                  .fetch(metaQuery)
                  .then((res) => res);
                if (fetchedMetadata) {
                  metadata = {
                    slug: slug,
                    description: fetchedMetadata?.description,
                    socialImage: fetchedMetadata?.socialImage,
                  };
                  isNewPageMetadataFetched = true;
                }
              }
            }
            if (isNewPageMetadataFetched) {
                app.context.store.commit("metadata/addPageMetadata", {
                    slug: "about",
                    description: metadata.description,
                    socialImage: metadata.socialImage,
                  });
            }
            console.log('returning page metadata', metadata)
        return metadata;
    }),
    inject('getSiteMetadata', async () => {

        const siteMetadataQuery = groq`*[_type == "siteSettings"][0]{
            "description": siteDesc,
            "socialImage": ogImg.asset->url}`;
            let isSiteMetadataFetched;
            let siteMetadata;
        if (!app.context.store.state.metadata.hasFetchedSiteSettings) {
            siteMetadata = await $sanity.fetch(siteMetadataQuery).then((res) => res);
            isSiteMetadataFetched = true;
        }

        if (isSiteMetadataFetched) {
            app.context.store.commit("metadata/setFetchedSiteSettings");
              if (siteMetadata?.description) {
                app.context.store.commit(
                  "metadata/addSiteDescription",
                  siteMetadata.description
                );
              }
              if (siteMetadata?.socialImage) {
                app.context.store.commit(
                  "metadata/addSiteSocialImage",
                  siteMetadata.socialImage
                );
              }
        }
        console.log('returning site metadata', siteMetadata)

        return siteMetadata;
    })
  }