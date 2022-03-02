<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    await this.$store.dispatch('funds/getFundsByRange')
  },
  computed: {
    data() {
      return this.$store.getters['funds/getterFunds']
    },
  },
}
</script>
