import { createRouter, createWebHistory } from 'vue-router'
import ChatbotView from '../views/ChatbotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'Chatbot', component: ChatbotView }],
})

export default router
