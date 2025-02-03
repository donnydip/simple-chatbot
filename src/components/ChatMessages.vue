<script setup>
import { useChatStore } from '../stores/chatStore'

const chatStore = useChatStore()
</script>

<template>
  <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 mx-64">
    <div v-for="(msg, index) in chatStore.messages" :key="index" class="flex items-start space-x-2">
      <div v-if="msg.role === 'assistant'" class="p-3 rounded-lg max-w-xs">
        <img src="@/assets/ocsmart.ico" alt="Octobot" class="w-8 h-8 inline-block mr-1" />
        {{ msg.content }}
      </div>
      <div v-else class="ml-auto bg-sky-200 p-3 rounded-lg max-w-xs">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>
