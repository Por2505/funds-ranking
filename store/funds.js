export const state = () => ({
  data: null,
  data_by_paginate: null,
  pagination: {
    limit: 20,
    currentPage: 1,
    total_record: 1,
  },
});

export const mutations = {
  GET_FUNDS(state, payload) {
    let rank_num = 0;
    let funds_by_num = payload.map((thing) => {
      rank_num++;
      return {
        ...thing,
        rank: rank_num,
      };
    });
    state.pagination.total_record = funds_by_num.length;
    let data_limit = funds_by_num.slice(
      (state.pagination.currentPage - 1) * state.pagination.limit,
      state.pagination.currentPage * state.pagination.limit
    );
    state.data_by_paginate = data_limit;
    state.data = funds_by_num;
  },
  SET_PAGINATE(state, payload) {
    state.pagination.currentPage = payload.currentPage;
    state.pagination.limit = payload.limit;
    let data_limit = state.data;
    let data_arr = data_limit.slice(
      (payload.currentPage - 1) * payload.limit,
      payload.currentPage * payload.limit
    );
    state.data_by_paginate = data_arr;
  },
};

export const actions = {
  async getFundsByRange(state, payload) {
    let res = await this.$axios.$get(
      `/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-${payload}.json`
    );
    state.commit("GET_FUNDS", res.data);
  },
  setPagination(state, payload) {
    state.commit("SET_PAGINATE", payload);
  },
};

export const getters = {
  getterFunds: (state) => state.data_by_paginate,
  getterPagination: (state) => state.pagination,
};
