export const state = () => ({
    user: null,
    selectedCourse:null,
    selectedEpisode:null,
    courseProgress:null,
    loginPopup:false,
    authStateNonce:0,
})

export const getters = {
    // getCounter(state) {
    //   return state.counter
    // }
}

export const mutations = {
    setUser(state, x) { state.user = x; },
    setSelectedCourse(state, x){ state.selectedCourse = x; },
    setSelectedEpisode(state, x){ state.selectedEpisode = x; },
    setCourseProgress(state, x){ state.courseProgress = x; },
    setLoginPopup(state, x){ state.loginPopup = x; },
    incrementAuthStateNonce(state){ state.authStateNonce++; },
}

export const actions = {
    async setUser(state, x) { state.commit('setUser', x); },
    setSelectedCourse(state, x){ state.commit('setSelectedCourse', x); },
    setSelectedEpisode(state, x){ state.commit('setSelectedEpisode', x); },
    setCourseProgress(state, x){ state.commit('setCourseProgress', x); },
    setLoginPopup(state, x){ state.commit('setLoginPopup', x); },
    incrementAuthStateNonce(state){ state.commit('incrementAuthStateNonce'); },
}
