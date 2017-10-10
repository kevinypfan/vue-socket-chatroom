<template lang="html" v-if="false">
  <div class="message">
    <div class="name">
      {{message.from}} :
      <span class="timeStamp">{{message.time}}</span>
    </div>
    <div class="context">
      {{message.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  .name {
    color: #1F6ED4;
    padding: 10px;
    .timeStamp {
      font-size: 10px;
      color: #999;
      margin-left: 10px;
    }
  }
  .context {
    color: #333;
    background-color: #F2BDD0;
    border-radius: 6px;
    padding: 4px 8px;
    word-break: break-all;
    width: 300px
  }
}
</style>
