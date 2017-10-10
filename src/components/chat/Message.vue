<template lang="html">
  <div class="message">
    <div class="name">
      {{message.from}} :
      <span class="timeStamp">{{message.time}}</span>
    </div>
    <div class="context">
      <span>{{message.text}}</span>
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

<style lang="scss">
.message {
  .name {
    color: #1F6ED4;
    margin-top: 20px;
    .timeStamp {
      font-size: 10px;
      color: #999;
      margin-left: 10px;
    }
  }
  .context {
    margin: 6px;
    span {
      background-color: #B9EDF8;
      padding: 4px 8px;
      border-radius: 10px;
      color: #333;
    }
  }
}
</style>
