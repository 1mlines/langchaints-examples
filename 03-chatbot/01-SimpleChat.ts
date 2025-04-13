import { ChatOpenAI } from "@langchain/openai"
import { AIMessage, HumanMessage } from "@langchain/core/messages"
import "dotenv/config"

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
})

// 대화 내용 유지 X
// console.log(
//   await llm.invoke([new HumanMessage("안녕하세요, 저는 배인진입니다")])
// )
// console.log(await llm.invoke([new HumanMessage("제 이름은 뭔가요?")]))

console.log(
  await llm.invoke([
    new HumanMessage("안녕하세요, 저는 배인진입니다"),
    new AIMessage("안녕하세요, 배인진님! 어떻게 도와드릴까요?"),
    new HumanMessage("제 이름은 뭔가요?"),
  ])
)
