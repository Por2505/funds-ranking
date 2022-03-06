export const state = () => ({
  data: null,
  data_by_paginate: null,
  search: "",
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
    let data_limit = [];
    if (state.search === "") {
      data_limit = state.data;
    } else {
      data_limit = state.data.filter((funds) => {
        return funds.thailand_fund_code
          .toLowerCase()
          .includes(state.search.toLowerCase());
      });
    }
    let data_arr = data_limit.slice(
      (payload.currentPage - 1) * payload.limit,
      payload.currentPage * payload.limit
    );
    state.data_by_paginate = data_arr;
  },
  SEARCH_FUNDS(state, payload) {
    state.search = payload;
    state.pagination.currentPage = 1;
    state.pagination.limit = 20;
    let data = state.data.filter((funds) => {
      return funds.thailand_fund_code
        .toLowerCase()
        .includes(payload.toLowerCase());
    });
    let data_arr = data.slice(
      (state.pagination.currentPage - 1) * state.pagination.limit,
      state.pagination.currentPage * state.pagination.limit
    );
    state.data_by_paginate = data_arr;
    state.pagination.total_record = data.length;
  },
  CLEAR_FILTER(state) {
    state.pagination.currentPage = 1;
    state.pagination.limit = 20;
    state.search = "";
    state.pagination.total_record = state.data.length;
    let data_limit = state.data.slice(
      (state.pagination.currentPage - 1) * state.pagination.limit,
      state.pagination.currentPage * state.pagination.limit
    );
    state.data_by_paginate = data_limit;
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
  searchFunds(state, payload) {
    state.commit("SEARCH_FUNDS", payload);
  },
  clearFilter(state) {
    state.commit("CLEAR_FILTER");
  },
};

export const getters = {
  getterFunds: (state) => state.data_by_paginate,
  getterPagination: (state) => state.pagination,
};
