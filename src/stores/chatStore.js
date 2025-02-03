import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
  }),

  actions: {
    async sendMessage(userInput) {

      this.messages.push({role: 'user',content: userInput})

      const validMessages = this.messages.filter(msg =>
        msg.content !== 'Oops! Error connecting to AI.'
      )

      const payload = {
        model: 'gpt-3.5-turbo',
        messages: validMessages,
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error Response:', errorText)
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid API key');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json()

        let botMessage = data.choices[0]?.message?.content || 'No response from AI.'

        botMessage = botMessage.replace(/<think>[\s\S]*?<\/think>/, '').trim()

        this.messages.push({ role: 'assistant', content: botMessage })
      } catch (error) {
        console.error('Error fetching AI response:', error)
        this.messages.push({ role: 'assistant', content: 'Oops! Error connecting to AI.' })
      }
    },
  },
})
