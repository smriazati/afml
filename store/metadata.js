export const state = () => ({
    hasFetchedSiteSettings: false, 
    siteDescription: null,
    siteSocialImage: null,
    savedPagesMetadata: [],
})

export const mutations = {
    addPageMetadata(state, payload) {
        // looking for payload.socialImage, payload.description, payload.slug
        let newPage = {
            slug: null,
            socialImage: null,
            description: null
        };
        if (payload?.slug) {
            newPage.slug  = String(payload.slug);
        }
        if (payload?.socialImage) {
            newPage.socialImage  = String(payload.socialImage);
        }
        if (payload?.description) {
            newPage.description = String(payload.description);
        }
        state.savedPagesMetadata.push(newPage);
    },
    setFetchedSiteSettings(state) {
        state.hasFetchedSiteSettings = true;
    },
    addSiteDescription(state, payload) {
        state.siteDescription = String(payload);
    },
    addSiteSocialImage(state, payload) {
        state.siteSocialImage = String(payload);
    }
}
