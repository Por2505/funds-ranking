<template>
  <div>
    <div class="mt-4 flex-1 flex justify-center px-2 lg:ml-6">
      <div class="max-w-lg w-full lg:max-w-xs">
        <label for="search" class="sr-only">ค้นหาชื่อกองทุน</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            data-testid="searchfunds"
            v-model="funds"
            id="search"
            name="search"
            class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-100 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-white focus:text-gray-900 sm:text-sm"
            placeholder="ค้นหาชื่อกองทุน"
            type="search"
          />
        </div>
      </div>
      <button
        class="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        @click="searchFunds()"
      >
        ค้นหา
      </button>
      <button
        class="hidden md:block inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        @click="clearFilter()"
      >
        รีเซ็ตการกรอง
      </button>
    </div>
    <div class="hidden md:grid md:grid-cols-5 my-4">
      <div></div>
      <div class="flex justify-center items-center">
        ผลตอบแทน:
      </div>
      <div>
        <button
          @click="getFundsByRange('1D')"
          :class="
            time_funds === '1D'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1D
        </button>
        <button
          @click="getFundsByRange('1W')"
          :class="
            time_funds === '1W'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1W
        </button>
        <button
          @click="getFundsByRange('1M')"
          :class="
            time_funds === '1M'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1M
        </button>
        <button
          @click="getFundsByRange('1Y')"
          :class="
            time_funds === '1Y'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1Y
        </button>
      </div>
    </div>
    <div class="md:hidden block py-4 flex justify-center grid grid-cols-3">
      <div class="flex justify-end items-center">
        ผลตอบแทน:
      </div>
      <div class="ml-2 col-span-2">
        <button
          @click="getFundsByRange('1D')"
          :class="
            time_funds === '1D'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1D
        </button>
        <button
          @click="getFundsByRange('1W')"
          :class="
            time_funds === '1W'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1W
        </button>
        <button
          @click="getFundsByRange('1M')"
          :class="
            time_funds === '1M'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1M
        </button>
        <button
          @click="getFundsByRange('1Y')"
          :class="
            time_funds === '1Y'
              ? 'bg-yellow-300 p-2 mr-2'
              : 'p-2 bg-yellow-100 mr-2'
          "
        >
          1Y
        </button>
      </div>
    </div>
    <TableData :data="data" />
    <Paginate :paginate="paginates" />
  </div>
</template>

<script>
import TableData from '../components/TableData.vue'
import Paginate from '../components/Paginate.vue'
export default {
  name: 'IndexPage',
  async created() {
    this.time_funds = '1D'
    await this.$store.dispatch('funds/getFundsByRange', '1D')
  },
  components: {
    TableData,
    Paginate,
  },
  data() {
    return {
      funds: '',
      time_funds: '',
    }
  },

  computed: {
    data() {
      return this.$store.getters['funds/getterFunds']
    },
    paginates() {
      return this.$store.getters['funds/getterPagination']
    },
  },
  methods: {
    async getFundsByRange(time) {
      this.time_funds = time
      let paginate = {
        limit: 20,
        currentPage: 1,
      }
      this.$store.dispatch('funds/setPagination', paginate)
      await this.$store.dispatch('funds/getFundsByRange', time)
    },

    searchFunds() {
      this.$store.dispatch('funds/searchFunds', this.funds)
    },
    clearFilter() {
      let paginate = {
        limit: 20,
        currentPage: 1,
      }
      this.$store.dispatch('funds/setPagination', paginate)
      this.funds = ''
      this.$store.dispatch('funds/clearFilter')
    },
  },
}
</script>
<style scoped>
.h-table {
  height: 60vh;
}
</style>
