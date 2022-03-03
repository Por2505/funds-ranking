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
    <div class="flex flex-col">
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
                  <!-- <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th> -->
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
                    {{ funds.thailand_fund_code }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ funds.nav_return }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ funds.nav }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ funds.nav_date }}
                  </td>
                  <!-- <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    await this.$store.dispatch('funds/getFundsByRange', '1D')
  },
  computed: {
    data() {
      return this.$store.getters['funds/getterFunds']
    },
  },
  methods: {
    async getFundsByRange(time) {
      await this.$store.dispatch('funds/getFundsByRange', time)
    },
  },
}
</script>
