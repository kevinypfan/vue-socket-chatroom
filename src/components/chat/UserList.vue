<template lang="html">
  <div>
    <h3>UserList</h3>
    <ul>
      <li v-for="user in users">{{ user }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  }
}
</script>

<style lang="scss">
</style>
