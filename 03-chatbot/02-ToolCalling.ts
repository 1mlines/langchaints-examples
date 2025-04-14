// 1. tool 생성
import { tool } from "@langchain/core/tools"
import { z } from "zod"

const multiply = tool(
  ({ a, b }: { a: number; b: number }): number => {
    return a * b
  },
  {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
)

// console.log(await multiply.invoke({ a: 2, b: 3 }))
// console.log(multiply.name)
// console.log(multiply.description)

// 2. tool binding
import { ChatOpenAI } from "@langchain/openai"
import "dotenv/config"
import { HumanMessage } from "@langchain/core/messages"

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
})
const modelWithTools = model.bindTools([multiply])

// 3. tool calling
// console.log(await modelWithTools.invoke("안녕하세요!"))
// console.log(await modelWithTools.invoke("5와 7을 곱한 값은 무엇인가요?"))

// 4. tool execution

// (1) ToolMessage 활용
// const aiMessage = await modelWithTools.invoke("5와 7을 곱한 값은 무엇인가요?")
// const toolCalls = aiMessage.tool_calls ?? []
// for (const toolCall of toolCalls) {
//   const toolMessage = await multiply.invoke(toolCall)
//   console.log(toolMessage)
// }

// (2) 여러 tool 고려해 구현 수정
const messages = [new HumanMessage("5와 7을 곱한 값은 무엇인가요?")]
const aiMessage = await modelWithTools.invoke(messages)
messages.push(aiMessage)

const toolCalls = aiMessage.tool_calls ?? []
const toolsByName = {
  multiply: multiply,
}
for (const toolCall of toolCalls) {
  const selectedTool = toolsByName[toolCall.name]
  const toolMessage = await selectedTool.invoke(toolCall)
  messages.push(toolMessage)
}
// console.log(messages)

const result = await modelWithTools.invoke(messages)
console.log(result)
