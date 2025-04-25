import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { pull } from "langchain/hub"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { StringOutputParser } from "@langchain/core/output_parsers"
import "dotenv/config"

// 1. Indexing
// (1) Load
const loader = new TextLoader("05-vectorstore/data/langchain-intro.txt")
const docs = await loader.load()

// (2) Split
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
})
const splits = await textSplitter.splitDocuments(docs)

// (3) Store
const vectorStore = await MemoryVectorStore.fromDocuments(
  splits,
  new OpenAIEmbeddings()
)

// 2. Retrieval and generation
// (1) Retrieve
const query = "LangChain은 언제 활용해?"
const retriever = vectorStore.asRetriever()
const retrievedDocs = await retriever.invoke(query)

// (2) Generate
// langchain hub 프롬프트 확인
const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt")
const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 })
const ragChain = await createStuffDocumentsChain({
  llm,
  prompt,
  outputParser: new StringOutputParser(),
})

// langsmith trace 확인
const result = await ragChain.invoke({
  question: query,
  context: retrievedDocs,
})
console.log(result)
