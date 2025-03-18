import { ChatOpenAI } from "@langchain/openai"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import "dotenv/config"

const model = new ChatOpenAI({ model: "gpt-4o-mini" })

const messages = [
  new SystemMessage(
    "너는 사내 보안 교육 강사야. 직무별로 구체적인 사례를 1개씩 들고, 회사에 피해가 될 수 있는 행동을 유념할 수 있도록 설명해줘."
  ),
  new HumanMessage("LLM을 활용할 때 주의할 점을 알려줘"),
]

const answer = await model.invoke(messages)
// console.log(answer)
console.log(answer.content)
