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
  <div class="p-4 bg-gray-800 flex">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      class="flex-1 p-2 bg-gray-700 rounded-lg outline-none"
      placeholder="Type a message..."
    />
    <button @click="sendMessage" class="ml-2 bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
      Send
    </button>
  </div>
</template>
