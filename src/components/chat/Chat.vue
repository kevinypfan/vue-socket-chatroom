<template>
  <div class="chatRoom">
    <div class="message-text">
      <div v-for="m in messages">
        <app-message
            :message="m"
            v-if="m.from !== $store.state.user.name"
          >
          </app-message>
          <app-me
            :message="m"
            v-if="m.from == $store.state.user.name"
          >
          </app-me>
      </div>
    </div>

    <div class="form-back">
      <form method="post" @submit.prevent="sendMessage">
        <input type="text" v-model="messageInput">
        <button type="submit" name="button">send</button>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
import Me from './Me.vue'
export default {
  data () {
    return {
      nameInput: "",
      messageInput: "",
      messages: [],
      system: []
    }
  },
  sockets: {
    newMessage(message) {
      console.log(message)
      var timeStamp = this.$moment(message.createdAt).format('h:mm a')
      message.time = timeStamp;
      this.messages.push(message)
    }
  },
  components: {
    appMessage: Message,
    appMe: Me
  },
  methods: {
    sendMessage() {
      this.$socket.emit('createMessage', {
        from: this.nameInput,
        text: this.messageInput
      }, (payload) => {
        console.log('Got it ', payload)
        this.nameInput = ''
        this.messageInput = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chatRoom {
  padding-bottom: 30px;
}
.message-text {
  width: 100%;
}
ol {
  list-style: none;
}
.form-back {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -ms-align-items: ceter;
  align-items: ceter;
  justify-content: center;
  background-color: #16335F;
  input {
    margin-top: 8px;
    padding: 5px;
    width: 500px;
  }
}
</style>
