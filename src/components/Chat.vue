<template>
  <div class="chat-cnt" v-if="chatOpen">
    <div class="clientChat-header" @click="changeChatState">
      <p style="margin: 0">SUPPORT CHAT</p>
    </div>
    <div class="clientChat-cnt">
      <div class="clientChatMessages-body">
        <div class="ClientchatMessages-cnt" ref="messageListWindow">
          <div
            class="clientChatMessage-item"
            :class="data.direction"
            v-for="(data, i) in messageList"
            :key="i"
          >
            <p
              class="clientMessageText"
              :class="data.direction === 'outgoing' ? 'clientMessage' : ''"
            >
              {{ data.message }}
            </p>
          </div>
        </div>
        <form class="clientChatMessageInput-cnt" @submit.prevent="sendMessage">
          <input v-model.trim="messageText" type="text" placeholder="Type here..." />
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  </div>
  <div class="chat-icon" v-else @click="changeChatState">
    <MessageOutlined />
  </div>
</template>

<script setup>
import { MessageOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import { io } from "socket.io-client";
import { AppUrl } from "@/plugins/AppData";
import { onUnmounted } from "vue";

let socket = null;

const authStore = useAuthStore();
const messageText = ref("");
const messageListWindow = ref(null);
const chatOpen = ref(false);
const messageList = ref([]);

const sendMessage = () => {
  if(messageText.value==="") return
  const data = {
    message: messageText.value,
    sentTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
    sender: authStore.user?.username || "User",
    user_id: authStore.user?.id,
    direction: "outgoing",
  };

  socket.emit("send_message", { ...data, id: socket.id });

  messageListWindow.value.scroll({
    top: 999,
    behavior: "smooth",
  });
  messageList.value.push(data);
  messageText.value = "";
};

const changeChatState = () => {
  if (socket === null) {
    socket = io.connect(AppUrl.Base);

    socket?.on("receive_message", (message) => {
      const data = {
        message,
        sentTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        direction: "incoming",
      };

      messageList.value.push(data);

      messageListWindow.value.scroll({
        top: 999,
        behavior: "smooth",
      });
    });
  }
  chatOpen.value = !chatOpen.value;
};

onUnmounted(() => {
  socket?.disconnect();
});
</script>

<style scoped>
.chat-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 5px;
  bottom: 0px;
  height: 450px;
  width: 350px;
  user-select: none;
}
.chat-icon {
  color: teal;
  position: fixed;
  right: 5px;
  bottom: 0px;
  font-size: 48px;
  cursor: pointer;
}
.clientChat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: rgb(92, 135, 195);
  color: white;
  cursor: pointer;
}
.clientChat-cnt {
  width: 100%;
  height: 100%;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
.clientChatMessages-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 2px 5px;
  height: 100%;
}
.ClientchatMessages-cnt {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: scroll;
  width: 100%;
}
.clientChatMessage-item {
  display: flex;
  align-items: center;
  width: 100%;
}
.clientMessageText {
  max-width: 80%;
  background-color: teal;
  color: white;
  padding-inline: 15px;
  padding-block: 5px;
  border-radius: 15px;
}
.clientMessage {
  background-color: gold;
  color: white;
}
.outgoing {
  justify-content: start;
}
.incoming {
  justify-content: end;
}
.clientChatMessageInput-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  background-color: white;
}
.clientChatMessageInput-cnt > input {
  width: 50%;
  height: 50px;
  border: 1px solid teal;
  border-radius: 40px;
  padding-inline: 15px;
  font-size: 16px;
}
.clientChatMessageInput-cnt button {
  border: 1px solid teal;
  padding: 10px;
  border-radius: 25px;
}
</style>
