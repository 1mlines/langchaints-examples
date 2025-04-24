import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { OpenAIEmbeddings } from "@langchain/openai"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import "dotenv/config"

const loader = new TextLoader("05-vectorstore/data/langchain-intro.txt")
const docs = await loader.load()

// chunkSize 100, 200, 500 결과 보여주기
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
})
const splits = await textSplitter.splitDocuments(docs)

const vectorStore = await MemoryVectorStore.fromDocuments(
  splits,
  new OpenAIEmbeddings()
)
// const result = await vectorStore.similaritySearch("LangChain은 언제 활용해?", 3)
const result = await vectorStore.similaritySearchWithScore(
  "LangChain은 언제 활용해?",
  3
)
console.log(result)
