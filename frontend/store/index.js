export const state = () => ({
  user: null,
  selectedCourse:null,
  selectedEpisode:null,
  courseProgress:null,
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
}

export const actions = {
  async setUser(state, x) { state.commit('setUser', x); },
  setSelectedCourse(state, x){ state.commit('setSelectedCourse', x); },
  setSelectedEpisode(state, x){ state.commit('setSelectedEpisode', x); },
  setCourseProgress(state, x){ state.commit('setCourseProgress', x); },
}
