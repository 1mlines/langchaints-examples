///// Ex 1.
import { PromptTemplate } from "@langchain/core/prompts"

const template1 = PromptTemplate.fromTemplate("수학 문제 풀어줘 : {problem}")

const prompt1 = await template1.invoke({ problem: "10 * 11" })
console.log(prompt1)

///// Ex 2.

import { ChatPromptTemplate } from "@langchain/core/prompts"

const template2 = ChatPromptTemplate.fromMessages([
  ["system", "너는 초등학교 수학 선생님이야."],
  ["user", "수학 문제 풀어줘 : {problem}"],
])

const prompt2 = await template2.invoke({ problem: "10 * 11" })
console.log(prompt2)

///// Ex 3.

import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import { HumanMessagePromptTemplate } from "@langchain/core/prompts"

const systemMessage = new SystemMessage("너는 초등학교 수학 선생님이야.")

const template3 = HumanMessagePromptTemplate.fromTemplate([
  systemMessage,
  new HumanMessage("수학 공부를 왜 해야돼?"),
  new AIMessage("공부 하기 싫어?"),
  "{input}",
])
const prompt3 = await template3.formatMessages({ input: "응" })
console.log(prompt3)
