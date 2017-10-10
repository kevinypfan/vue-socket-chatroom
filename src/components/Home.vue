<template>
  <div class="chatRoom">
    <div class="userList">
      <app-user-list :users="getUsers"></app-user-list>
    </div>
    <div class="chatArea">
      <app-chat></app-chat>
    </div>
    <div class="system">
      <app-system></app-system>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from './chat/Chat.vue'
import UserList from './chat/UserList.vue'
import System from './chat/System.vue'

export default {
  components: {
    appChat: Chat,
    appUserList: UserList,
    appSystem: System
  },
  computed: {
    ...mapGetters([
      'getUsers'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .chatRoom {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;

    .userList {
      width: 20%;
      height: 80vh;
      position: fixed;
    }
    .chatArea {
      width: 50%;
      margin: 0 30% 0 20%;
    }
    .system {
      width: 30%;
      height: 80vh;
      position: fixed;
      right: 0;
      padding: 30px;
    }
  }
</style>
