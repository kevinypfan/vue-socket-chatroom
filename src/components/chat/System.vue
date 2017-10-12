<template lang="html">
  <div>
    <h3>System hint</h3>
    <div class="hints-space">
      <p v-for="s in systemHit">{{ s.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemHit: []
    }
  },
  sockets: {
    systemMessage(message) {
      var timeStamp = this.$moment(message.createdAt).format('h:mm a')
      message.time = timeStamp;
      this.systemHit.push(message)
    }
  }
}
</script>

<style lang="scss">
  .hints-space {
    border: 1px solid #eee;
    height: 450px;
    width: 80%;
    overflow: scroll;
    padding: 5px 20px;
    color: #B50B1E;
  }
</style>
