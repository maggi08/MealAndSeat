export const state = () => ({
  query: {},
  order: {}
});
export const mutations = {
  setQuery(state, payload) {
    state.query = payload;
  },
  setOrder(state, payload) {
    state.order = payload;
  }
};
