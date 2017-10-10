<template>
  <div class="chatRoom">
    <div class="userList">
      <app-user-list :users="getUsers"></app-user-list>
    </div>
    <div class="chatArea">
      <app-chat></app-chat>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from './chat/Chat.vue'
import UserList from './chat/UserList.vue'
export default {
  components: {
    appChat: Chat,
    appUserList: UserList
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
    }
    .chatArea {
      width: 80%;
    }
  }
</style>
