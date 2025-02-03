<script setup>
import { ref } from 'vue'
import { useChatStore } from '../stores/chatStore'

const message = ref('')
const chatStore = useChatStore()

const sendMessage = () => {
  if (message.value.trim()) {
    chatStore.sendMessage(message.value)
    message.value = ''
  }
}
</script>
<template>
  <div class="p-4 flex mx-64">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      class="flex-1 p-2 rounded-lg border-cyan-500 border-2 outline-none"
      placeholder="Type a message..."
    />
    <button @click="sendMessage" class="ml-2 bg-sky-500 p-2 rounded-lg hover:bg-sky-700">
      Send
    </button>
  </div>
</template>
