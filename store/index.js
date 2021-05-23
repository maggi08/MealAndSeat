export const state = () => ({
  query: {},
  order: {},
  meal: []
});
export const mutations = {
  setQuery(state, payload) {
    state.query = payload;
  },
  setOrder(state, payload) {
    state.order = payload;
  },
  setMeal(state, payload) {
    state.meal = payload;
  },
  addMeal(state, payload) {
    state.meal.push(payload);
  }
};
