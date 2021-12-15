export const state = () => ({
    siteDescription: null,
    siteSocialImage: null,
    pageMetadata: [],
})

export const mutations = {
    addPageMetadata(state, payload) {
        state.pageMetadata = payload;
    },
    addSiteMetadata(state, payload) {
        if (payload.description) {
            state.siteDescription = payload.description;
        }
        if (payload.socialImage) {
            state.siteSocialImage = String(payload.socialImage);
        }
    }
}
