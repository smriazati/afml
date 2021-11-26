export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {

        // console.log(to, from)
        // if (app.store.state.helpful.bodyBg !== app.store.state.helpful.baseBg) {
        //     app.store.commit('helpful/resetBodyBg');
        // }

        // if (store.state.auth.isAuthenticated) {
            
        // } else {
        //     next('/admin');
        // }

        next()
    })
}

