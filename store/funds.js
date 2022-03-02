export const state = () => ({
  data: null,
});

export const mutations = {
  GET_FUNDS(state, payload) {
    state.data = payload;
  },
};

export const actions = {
  async getFundsByRange(state, payload) {
    let res = await this.$axios.$get(
      "/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json"
    );
    state.commit("GET_FUNDS", res);
  },
};

export const getters = {
    getterFunds: (state) => state.data,
};
