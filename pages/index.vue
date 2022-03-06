<template>
  <div>
    <p>funds ranking</p>
    <button @click="getFundsByRange('1D')" class="p-2 bg-yellow-100 mr-2">
      1D
    </button>
    <button @click="getFundsByRange('1W')" class="p-2 bg-yellow-100 mr-2">
      1W
    </button>
    <button @click="getFundsByRange('1M')" class="p-2 bg-yellow-100 mr-2">
      1M
    </button>
    <button @click="getFundsByRange('1Y')" class="p-2 bg-yellow-100 mr-2">
      1Y
    </button>
    <div class="flex flex-col mx-12">
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
      class="w-full flex justify-between items-center text-sm  bottom-0 bg-white px-6 py-5"
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
    await this.$store.dispatch('funds/getFundsByRange', '1Y')
  },
  data() {
    return {
      pagination: {
        limit: 20,
        currentPage: 1,
      },
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
      await this.$store.dispatch('funds/getFundsByRange', time)
    },
    formatDate(date) {
      return this.$moment(date).format('DD/MM/YYYY - HH:mm:ss')
    },
  },
}
</script>
