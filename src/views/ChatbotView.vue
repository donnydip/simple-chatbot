<script setup>
import ChatHeader from '../components/ChatHeader.vue'
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'
</script>
<template>
  <div class="flex flex-col h-screen bg-sky-50 text-slate-800">
    <ChatHeader />
    <ChatMessages />
    <ChatInput />
  </div>
</template>
