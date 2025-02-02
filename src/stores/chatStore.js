import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [{ text: 'Hello! How can I assist you?', sender: 'bot' }],
  }),

  actions: {
    async sendMessage(userInput) {
      this.messages.push({ text: userInput, sender: 'user' })

      try {
        const response = await fetch('http://localhost:1234/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-r1-distill-qwen-1.5b',
            messages: [
              { role: 'system', content: 'You are The Smartest Entity' },
              { role: 'user', content: userInput },
            ],
            temperature: 0.7,
            max_tokens: -1,
            stream: false,
          }),
        })

        const data = await response.json()

        let botMessage = data.choices[0]?.message?.content || 'No response from AI.'

        botMessage = botMessage.replace(/<think>[\s\S]*?<\/think>/, '').trim()

        this.messages.push({ text: botMessage, sender: 'bot' })
      } catch (error) {
        console.error('Error fetching AI response:', error)
        this.messages.push({ text: 'Oops! Error connecting to AI.', sender: 'bot' })
      }
    },
  },
})
