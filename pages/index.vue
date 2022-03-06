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
            v-model="funds"
            id="search"
            name="search"
            class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-yellow-100 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
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
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        @click="clearFilter()"
      >
        รีเซ็ตการกรอง
      </button>
    </div>
    <div class="grid grid-cols-5 my-4">
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
      <div>
        <button
          class="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          + เพิ่มตัวกรอง
        </button>
      </div>
    </div>

    <div class="flex flex-col mx-12 h-table">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ลำดับ
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ชื่อกองทุน
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ผลตอบแทน
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ราคา
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    เวลาที่ข้อมูลถูกอัพเดต
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(funds, idx) in data"
                  :key="idx"
                  :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ funds.rank }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ funds.thailand_fund_code }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ funds.nav_return }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ funds.nav }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(funds.nav_date) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-between items-center text-sm bottom-0 bg-white px-6 py-5"
    >
      <div class="flex">
        <p class="font-medium">แสดงรายการ</p>
        <ul class="text-yellow-500 ml-1">
          <li
            :class="`inline cursor-pointer ${
              pagination.limit === 20 ? 'font-bold' : ''
            }`"
            @click="pagination.limit = 20"
          >
            20
          </li>
          <li
            :class="`inline cursor-pointer ${
              pagination.limit === 50 ? 'font-bold' : ''
            }`"
            @click="pagination.limit = 50"
          >
            50
          </li>
          <li
            :class="`inline cursor-pointer ${
              pagination.limit === 100 ? 'font-bold' : ''
            }`"
            @click="pagination.limit = 100"
          >
            100
          </li>
          <li
            :class="`inline cursor-pointer ${
              pagination.limit === 150 ? 'font-bold' : ''
            }`"
            @click="pagination.limit = 150"
          >
            150
          </li>
        </ul>
      </div>

      <div>
        <t-pagination
          v-model="pagination.currentPage"
          :total-items="paginate.total_record"
          :limit="pagination.limit"
          :per-page="pagination.limit"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    this.time_funds = '1D'
    await this.$store.dispatch('funds/getFundsByRange', '1D')
  },
  data() {
    return {
      pagination: {
        limit: 20,
        currentPage: 1,
      },
      funds: '',
      time_funds: '',
    }
  },
  watch: {
    'pagination.limit'() {
      this.$store.dispatch('funds/setPagination', this.pagination)
    },
    'pagination.currentPage'() {
      this.$store.dispatch('funds/setPagination', this.pagination)
    },
  },
  computed: {
    data() {
      return this.$store.getters['funds/getterFunds']
    },
    paginate() {
      return this.$store.getters['funds/getterPagination']
    },
  },
  methods: {
    async getFundsByRange(time) {
      this.time_funds = time
      this.pagination.currentPage = 1
      this.pagination.limit = 20
      await this.$store.dispatch('funds/getFundsByRange', time)
    },
    formatDate(date) {
      return this.$moment(date).format('DD/MM/YYYY - HH:mm:ss')
    },
    searchFunds() {
      this.$store.dispatch('funds/searchFunds', this.funds)
    },
    clearFilter() {
      this.pagination.currentPage = 1
      this.pagination.limit = 20
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
