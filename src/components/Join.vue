<template lang="html">
<div class="join">
  <form @submit.prevent="joinRoom">
    {{errorMessage}}
    <p></p>
    <label>
      Name
      <input type="text" v-model="name">
    </label>
    <label>
      Room
      <input type="text" v-model="room">
    </label>
    <button type="submit" name="button">Join</button>
  </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      room: '',
      errorMessage: null
    }
  },
  methods: {
    joinRoom() {
      this.$socket.emit('join', {name: this.name, room: this.room}, (err) => {
        if (err) {
          this.errorMessage = err
        } else {
          this.$store.commit('SET_USER', {name: this.name, room: this.room})
          window.localStorage.setItem("user", JSON.stringify({name: this.name, room: this.room}))
          this.$router.push('/chat')
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
