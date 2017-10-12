<template lang="html" v-if="false">
  <div class="message" align="right">
    <div class="name">
      <span class="timeStamp">{{message.time}}</span>
      : {{message.from}}
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
  float: right;
  .name {
    color: #F71E35;
    padding: 10px;

    .timeStamp {
      font-size: 10px;
      color: #999;
      margin-right: 10px;
    }
  }
  .context {
    color: #333;
    background-color: #F2BDD0;
    border-radius: 6px;
    padding: 4px 8px;
    word-break: break-all;
    max-width: 200px;
    text-align: left;
  }
}
</style>
