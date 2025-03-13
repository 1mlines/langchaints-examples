import "dotenv/config"
import OpenAI from "openai"

// const { OPENAI_API_KEY } = process.env
const openai = new OpenAI()

const completions = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "ChatGPT와 대화할 때 주의할 점을 100자 미만으로 알려줘",
    },
  ],
})

console.log(completions.choices[0].message)
