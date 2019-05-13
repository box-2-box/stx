<template>
  <div v-if="!user">
    <h1>Home</h1>
  </div>
  <div v-else>  
    <h1>Dashboard</h1>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>

<style scoped>
</style>