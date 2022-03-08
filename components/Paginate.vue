<template>
  <div
    class="w-full flex justify-between items-center text-sm bottom-0 bg-white px-6 py-5"
  >
    <div class="flex">
      <p class="font-medium">แสดงรายการ</p>
      <ul class="text-yellow-500 ml-1">
        <li
          :class="`inline cursor-pointer ${
            paginate.limit === 20 ? 'font-bold' : ''
          }`"
          @click="pagination.limit = 20"
        >
          20
        </li>
        <li
          :class="`inline cursor-pointer ${
            paginate.limit === 50 ? 'font-bold' : ''
          }`"
          @click="pagination.limit = 50"
        >
          50
        </li>
        <li
          :class="`inline cursor-pointer ${
            paginate.limit === 100 ? 'font-bold' : ''
          }`"
          @click="pagination.limit = 100"
        >
          100
        </li>
        <li
          :class="`inline cursor-pointer ${
            paginate.limit === 150 ? 'font-bold' : ''
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
</template>
<script>
export default {
  props: {
    paginate: {
      type: Object,
      default: {},
    },
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
    'paginate.currentPage'(value) {
      this.pagination.currentPage = value
    },
  },
}
</script>
