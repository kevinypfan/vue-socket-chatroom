<template>
  <div class="chatRoom">
    <div class="message-text">
      <app-message
        v-for="m in messages"
        :message="m"
        ></app-message>
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
    connect() {
      console.log('user connect')
    },
    disconnect() {
      console.log('disconnected from server')
    },
    newMessage(message) {
      console.log(message)
      var timeStamp = this.$moment(message.createdAt).format('h:mm a')
      message.time = timeStamp;
      this.messages.push(message)
    },
    systemMessage(message) {
      var timeStamp = this.$moment(message.createdAt).format('h:mm a')
      message.time = timeStamp;
      this.system.push(message)
    }
  },
  components: {
    appMessage: Message
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

<style lang="scss">
.chatRoom {
  position: relative;
}
.message-text {
  width: 100%;
  height: 300px;
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
  background-color: #24f;
  input {
    margin-top: 8px;
    padding: 5px;
  }
}
</style>
