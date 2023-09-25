<template>
  <div class="supportChat-cnt">
    <div class="chatUsers-cnt">
      <div
        class="chatUser-item"
        v-for="entry in Object.entries(users)"
        :class="entry[1].active ? 'active' : 'notactive'"
        :key="entry[0]"
        @click="changeCurrUser(entry[0])"
        :style="
          entry[0] === currUser ? { backgroundColor: 'rgb(18, 204, 100)' } : ''
        "
      >
        <div v-if="entry[1]?.unread" class="readDot"></div>
        <p>{{ entry[1].name + " | id: " + entry[1].user_id }}</p>
      </div>
    </div>
    <div class="chatMessages-body">
      <div class="chatMessages-cnt">
        <div
          class="chatMessage-item"
          :class="data.direction"
          v-for="(data, i) in filteredMessages"
          :key="i"
        >
          <p
            class="messageText"
            :class="data.direction === 'outgoing' ? 'userMessage' : ''"
          >
            {{ data.message }}
          </p>
        </div>
      </div>
      <form class="chatMessageInput-cnt" @submit.prevent="sendMessage">
        <input
          v-model="messageText"
          type="text"
          placeholder="Type you message here"
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { AppUrl } from "@/plugins/AppData";
import { io } from "socket.io-client";
import { onMounted, onUnmounted, ref, computed } from "vue";

let socket = null;

const currUser = ref("");
const messageText = ref("");
const users = ref({});
const messageList = ref([]);
const filteredMessages = computed(() => {
  return messageList.value.filter((m) => m.id === currUser.value);
});

const sendMessage = () => {
  if (!socket) return;

  socket.emit("reply", {
    id: currUser.value,
    message: messageText.value,
  });

  messageList.value.push({
    id: currUser.value,
    message: messageText.value,
    sender: "admin",
  });
  messageText.value = "";
};
const changeCurrUser = (id) => {
  users.value[id].unread = false;
  currUser.value = id;
};
onMounted(() => {
  socket = io.connect(AppUrl.Base);
  socket?.emit("register");
  socket?.on("receive_message", (data) => {
    messageList.value.push(data);
    if (!users.value.hasOwnProperty(data.id)) {
      users.value[data.id] = {
        name: data.sender,
        user_id: data.user_id,
        unread: currUser.id !== data.id,
        active: true,
      };
    } else {
      users.value[data.id].unread = currUser.value.id !== data.id;
    }
  });
  socket.on("user_disconnected", (id) => {
    users.value[id].active = false;
  });
});
onUnmounted(() => {
  socket.disconnect();
});
</script>

<style>
.supportChat-cnt {
  width: 90%;
  height: 100%;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}
.chatUsers-cnt {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1;
  border: 1px solid black;
  overflow-y: scroll;
}
.chatUser-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid white;
  background-color: teal;
  cursor: pointer;
  color: white;
  gap: 15px;
}
.chatUser-item:hover {
  background-color: white;
  color: teal;
  transition: 0.5s;
}
.chatUser-item > p {
  font-size: large;
  font-weight: 600;
  color: inherit;
  margin: 0;
  user-select: contain;
}
.readDot {
  width: 10px;
  height: 10px;
  background-color: blue;
  border-radius: 50%;
}
.notactive {
  background-color: rgba(0, 128, 128, 0.3);
  color: rgba(0, 0, 0, 0.164);
}
.chatMessages-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 15px;
  height: 100%;
  flex: 4;
  border: 1px solid black;
}
.chatMessages-cnt {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  width: 100%;
}
.chatMessage-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
}
.messageText {
  max-width: 50%;
  background-color: teal;
  color: white;
  padding-inline: 15px;
  padding-block: 5px;
  border-radius: 15px;
}
.userMessage {
  background-color: gold;
  color: white;
}
.incoming {
  justify-content: start;
}
.outgoing {
  justify-content: end;
}
.chatMessageInput-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
}
.chatMessageInput-cnt > input {
  width: 50%;
  height: 50px;
  border: 1px solid teal;
  border-radius: 40px;
  padding-inline: 15px;
  font-size: 16px;
}
.chatMessageInput-cnt button {
  border: 1px solid teal;
  padding: 10px;
  border-radius: 25px;
}
</style>
